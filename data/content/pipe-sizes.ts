import type { ContentBlock, ContentDocument } from "@/content/models/content-document";
import {
  waterSupplyTable,
  gasSupplyTable,
  dripIrrigationTable,
  packagingTable,
} from "@/data/dimensions";
import type { Locale } from "@/lib/i18n/config";

/**
 * One page per catalogue diameter.
 *
 * Contractors do not search "لوله پلی اتیلن" when they are ready to order —
 * they search a size. Those queries carry high purchase intent and almost no
 * competition, because the factories that rank for them publish their
 * dimension tables as images, which a search engine cannot read.
 *
 * Every number on these pages comes from bukanpipe-dimension-tables.json, the
 * transcription of the factory catalogue. Nothing is computed or interpolated:
 * a diameter offers exactly the SDR classes the catalogue lists for it, and
 * the supply form comes from the catalogue's own packaging rules. A size with
 * no catalogue row gets no page rather than an empty one.
 */

const PATH_PREFIX = "/pipe-size";

export type PipeSizeFacts = {
  dn: number;
  /** SDR classes the catalogue offers at this diameter, with wall thickness. */
  /** pn is null where the catalogue lists no rating for that grade (SDR 6 has no PE100 figure). */
  classes: readonly { sdr: number; wallMm: number; pnPe80: number | null; pnPe100: number | null }[];
  /** Supply form from the catalogue packaging rules, keyed by SDR. */
  supply: readonly { sdr: string; pn: string; packageType: string; lengths: readonly string[] }[];
  gas?: { maxOuterMm: number; sdr11Mm?: number; sdr13_6Mm?: number; lengths: readonly string[] };
  irrigation: boolean;
};

export function pipeSizeFacts(dn: number): PipeSizeFacts | null {
  const row = waterSupplyTable.rows.find((r) => r.dnMm === dn);
  if (!row) return null;

  const classes = row.wallThicknessMm
    .map((wall, i) => {
      const col = waterSupplyTable.columns[i];
      if (wall === null || wall === undefined || !col) return null;
      return { sdr: col.sdr, wallMm: wall, pnPe80: col.pnPe80, pnPe100: col.pnPe100 };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  const supply = packagingTable.rows
    .filter((p) => dn >= p.sizeFromMm && dn <= p.sizeToMm)
    .map((p) => ({
      sdr: p.sdr,
      pn: p.nominalPressureAtm,
      packageType: p.packageType,
      lengths: p.packingLengthM,
    }));

  const gasRow = gasSupplyTable.rows.find((g) => g.nominalSizeMm === dn);
  const gas = gasRow
    ? {
        maxOuterMm: gasRow.maxExternalDiameterMm,
        sdr11Mm: gasRow.eMinSdr11Mm?.min,
        sdr13_6Mm: gasRow.eMinSdr13_6Mm?.min,
        lengths: gasRow.packingLengthM,
      }
    : undefined;

  return {
    dn,
    classes,
    supply,
    gas,
    irrigation: dripIrrigationTable.rows.some((r) => r.nominalSizeMm === dn),
  };
}

export const pipeSizes: readonly number[] = waterSupplyTable.rows.map((r) => r.dnMm);

/** Every PN the catalogue actually states at this diameter, across both grades. */
function statedPressures(f: PipeSizeFacts): number[] {
  return f.classes
    .flatMap((c) => [c.pnPe80, c.pnPe100])
    .filter((pn): pn is number => pn !== null && pn !== undefined);
}

function pnTextFa(c: { pnPe80: number | null; pnPe100: number | null }): string {
  if (c.pnPe80 !== null && c.pnPe100 !== null) {
    return `فشار اسمی ${c.pnPe80} بار با PE80 و ${c.pnPe100} بار با PE100`;
  }
  if (c.pnPe80 !== null) return `فشار اسمی ${c.pnPe80} بار با PE80 (کاتالوگ برای PE100 عددی نداده است)`;
  if (c.pnPe100 !== null) return `فشار اسمی ${c.pnPe100} بار با PE100`;
  return "فشار اسمی در کاتالوگ درج نشده است";
}

function pnTextEn(c: { pnPe80: number | null; pnPe100: number | null }): string {
  if (c.pnPe80 !== null && c.pnPe100 !== null) {
    return `nominal pressure ${c.pnPe80} bar in PE80, ${c.pnPe100} bar in PE100`;
  }
  if (c.pnPe80 !== null) return `nominal pressure ${c.pnPe80} bar in PE80 (the catalogue states no PE100 figure)`;
  if (c.pnPe100 !== null) return `nominal pressure ${c.pnPe100} bar in PE100`;
  return "no nominal pressure stated in the catalogue";
}

const COPY = {
  fa: {
    title: (dn: number) => `لوله پلی اتیلن ${dn}`,
    seoTitle: (dn: number) =>
      `لوله پلی اتیلن ${dn} | ضخامت جداره، SDR و فشار کاری | بوکان پایپ`,
    home: "خانه",
    crumb: "سایزها",
    classesHeading: "کلاس‌های فشار موجود در این قطر",
    supplyHeading: "شکل تحویل",
    gasHeading: "این قطر در شبکه گاز",
    irrigationHeading: "این قطر در آبیاری",
    orderHeading: "برای سفارش چه چیزی را بنویسید",
    tableTitle: (dn: number) => `قطر ${dn} میلی‌متر — ضخامت جداره بر حسب SDR`,
  },
  en: {
    title: (dn: number) => `${dn} mm HDPE Pipe`,
    seoTitle: (dn: number) =>
      `${dn} mm HDPE Pipe | Wall Thickness, SDR and Pressure Rating | Bukan Pipe`,
    home: "Home",
    crumb: "Sizes",
    classesHeading: "Pressure classes available at this diameter",
    supplyHeading: "Supply form",
    gasHeading: "This diameter in gas networks",
    irrigationHeading: "This diameter in irrigation",
    orderHeading: "What to state when ordering",
    tableTitle: (dn: number) => `${dn} mm outside diameter — wall thickness by SDR`,
  },
} as const;

function fa(dn: number, f: PipeSizeFacts): ContentBlock[] {
  const pressures = statedPressures(f);
  const minPn = Math.min(...pressures);
  const maxPn = Math.max(...pressures);
  const coil = f.supply.filter((s) => s.packageType === "coil");
  const branch = f.supply.filter((s) => s.packageType === "branch");

  const blocks: ContentBlock[] = [
    {
      type: "paragraph",
      text: `لوله پلی اتیلن ${dn} یعنی لوله‌ای با قطر خارجی ${dn} میلی‌متر. این عدد فقط قطر بیرونی است و به‌تنهایی سفارش را مشخص نمی‌کند — در همین قطر، کارخانه ${f.classes.length} کلاس فشار مختلف تولید می‌کند که ضخامت جداره و در نتیجه قطر داخلی، وزن و قیمتشان با هم فرق دارد. آنچه سفارش را کامل می‌کند، قطر به‌علاوه SDR و گرید ماده است.`,
    },
    {
      type: "paragraph",
      text: `در قطر ${dn}، ضخامت جداره از ${Math.min(...f.classes.map((c) => c.wallMm))} تا ${Math.max(...f.classes.map((c) => c.wallMm))} میلی‌متر تغییر می‌کند و فشار اسمی از ${minPn} تا ${maxPn} بار — بسته به SDR و اینکه ماده PE80 باشد یا PE100.`,
    },
    { type: "heading", level: 2, text: COPY.fa.classesHeading },
    {
      type: "spec-table",
      title: COPY.fa.tableTitle(dn),
      rows: f.classes.map((c) => ({
        label: `SDR ${c.sdr}`,
        value: `ضخامت جداره ${c.wallMm} میلی‌متر — ${pnTextFa(c)}`,
      })),
      note: `اعداد از کاتالوگ کارخانه (${waterSupplyTable.standard}). SDR پایین‌تر یعنی جداره ضخیم‌تر، فشار مجاز بیشتر و قطر داخلی کمتر.`,
    },
    {
      type: "paragraph",
      text: "عدد فشار اسمی برای دمای ۲۰ درجه سانتی‌گراد است. اگر خط گرم‌تر کار می‌کند، فشار مجاز واقعی کمتر است و باید با ضریب کاهش دما محاسبه شود.",
    },
  ];

  if (f.supply.length > 0) {
    blocks.push({ type: "heading", level: 2, text: COPY.fa.supplyHeading });
    const items: string[] = [];
    for (const s of coil) {
      items.push(
        `SDR ${s.sdr} (فشار ${s.pn} بار): کلاف ${s.lengths.join(" یا ")} متری`,
      );
    }
    for (const s of branch) {
      items.push(
        `SDR ${s.sdr} (فشار ${s.pn} بار): شاخه ${s.lengths.join(" یا ")} متری`,
      );
    }
    blocks.push({ type: "list", items });
    blocks.push({
      type: "paragraph",
      text:
        coil.length > 0 && branch.length > 0
          ? "در این قطر هر دو شکل تحویل وجود دارد و انتخاب به کلاس فشار بستگی دارد. کلاف، تعداد اتصال در مسیر را کم می‌کند؛ شاخه برای قطرهای بزرگ و جداره ضخیم ناگزیر است."
          : coil.length > 0
            ? "این قطر به‌صورت کلاف تحویل می‌شود، که تعداد اتصال در مسیر را کم می‌کند و سرعت اجرا را بالا می‌برد."
            : "این قطر به‌صورت شاخه تحویل می‌شود؛ در این ضخامت جداره، لوله قابل کلاف کردن نیست.",
    });
  }

  if (f.gas) {
    blocks.push({ type: "heading", level: 2, text: COPY.fa.gasHeading });
    const gasBits: string[] = [];
    if (f.gas.sdr11Mm) gasBits.push(`SDR 11 با حداقل ضخامت ${f.gas.sdr11Mm} میلی‌متر`);
    if (f.gas.sdr13_6Mm) gasBits.push(`SDR 13.6 با حداقل ضخامت ${f.gas.sdr13_6Mm} میلی‌متر`);
    blocks.push({
      type: "paragraph",
      text: `قطر ${dn} در جدول گاز کاتالوگ هم آمده است: ${gasBits.join(" و ")}، با تحویل ${f.gas.lengths.join(" یا ")} متری. توجه کنید که لوله گاز محصول جداگانه‌ای است — مطابق استاندارد ملی ۱۱۲۳۳-۲، با علامت‌گذاری و تأییدیه مخصوص خود، و اتصال الکتروفیوژن. لوله آبرسانی همین قطر را نمی‌توان در شبکه گاز به کار برد.`,
    });
  }

  if (f.irrigation) {
    blocks.push({ type: "heading", level: 2, text: COPY.fa.irrigationHeading });
    blocks.push({
      type: "paragraph",
      text: `قطر ${dn} در جدول آبیاری قطره‌ای کاتالوگ (${dripIrrigationTable.standard}) هم وجود دارد، با گرید PE32 و PE40 که کلاس‌های فشار پایین‌تری دارند. این محصول با لوله فشار آبرسانی یکی نیست.`,
    });
  }

  blocks.push(
    { type: "heading", level: 2, text: COPY.fa.orderHeading },
    {
      type: "list",
      items: [
        `قطر خارجی: ${dn} میلی‌متر`,
        "SDR یا فشار اسمی — بدون این، سفارش قابل قیمت‌گذاری نیست",
        "گرید ماده: PE80 یا PE100",
        "کاربرد: آبرسانی، گاز، آبیاری، فاضلاب یا صنعتی",
        "متراژ، شکل تحویل و مقصد بارگیری",
      ],
    },
    {
      type: "paragraph",
      text: `هنگام مقایسه قیمت، وزن هر متر را بسنجید نه قیمت هر متر. وزن از قطر، ضخامت جداره و چگالی ماده می‌آید؛ لوله ${dn} که در همان SDR سبک‌تر است، جداره نازک‌تری دارد.`,
    },
    {
      type: "internal-links",
      title: "مرتبط",
      links: [
        {
          label: "جدول کامل سایز، ضخامت و SDR",
          path: "/technical-center/polyethylene-pipe-dimensions-table",
          hint: "همه قطرها در یک جدول",
        },
        {
          label: "راهنمای کامل لوله پلی اتیلن",
          path: "/technical-center/polyethylene-pipe-complete-guide",
        },
        { label: "لوله پلی اتیلن آبرسانی", path: "/products/water-supply-pipe" },
        { label: "استعلام قیمت", path: "/request-quote", hint: "با همین مشخصات" },
      ],
    },
  );

  return blocks;
}

function en(dn: number, f: PipeSizeFacts): ContentBlock[] {
  const pressures = statedPressures(f);
  const minPn = Math.min(...pressures);
  const maxPn = Math.max(...pressures);
  const coil = f.supply.filter((s) => s.packageType === "coil");
  const branch = f.supply.filter((s) => s.packageType === "branch");

  const blocks: ContentBlock[] = [
    {
      type: "paragraph",
      text: `${dn} mm HDPE pipe means pipe with a ${dn} mm outside diameter. That figure alone does not define an order — at this diameter the factory produces ${f.classes.length} different pressure classes, which differ in wall thickness and therefore in bore, weight and price. What completes an order is the diameter plus the SDR and the material grade.`,
    },
    {
      type: "paragraph",
      text: `At ${dn} mm, wall thickness ranges from ${Math.min(...f.classes.map((c) => c.wallMm))} to ${Math.max(...f.classes.map((c) => c.wallMm))} mm and nominal pressure from ${minPn} to ${maxPn} bar, depending on the SDR and on whether the material is PE80 or PE100.`,
    },
    { type: "heading", level: 2, text: COPY.en.classesHeading },
    {
      type: "spec-table",
      title: COPY.en.tableTitle(dn),
      rows: f.classes.map((c) => ({
        label: `SDR ${c.sdr}`,
        value: `Wall thickness ${c.wallMm} mm — ${pnTextEn(c)}`,
      })),
      note: `Figures from the factory catalogue (${waterSupplyTable.standard}). A lower SDR means a thicker wall, a higher pressure rating and a smaller bore.`,
    },
    {
      type: "paragraph",
      text: "The nominal pressure figure applies at 20 °C. If the line runs warmer, the real allowable pressure is lower and has to be calculated with the temperature derating factor.",
    },
  ];

  if (f.supply.length > 0) {
    blocks.push({ type: "heading", level: 2, text: COPY.en.supplyHeading });
    const items: string[] = [];
    for (const s of coil) {
      items.push(`SDR ${s.sdr} (${s.pn} bar): coils of ${s.lengths.join(" or ")} m`);
    }
    for (const s of branch) {
      items.push(`SDR ${s.sdr} (${s.pn} bar): straight lengths of ${s.lengths.join(" or ")} m`);
    }
    blocks.push({ type: "list", items });
  }

  if (f.gas) {
    blocks.push({ type: "heading", level: 2, text: COPY.en.gasHeading });
    const gasBits: string[] = [];
    if (f.gas.sdr11Mm) gasBits.push(`SDR 11 at a minimum wall of ${f.gas.sdr11Mm} mm`);
    if (f.gas.sdr13_6Mm) gasBits.push(`SDR 13.6 at a minimum wall of ${f.gas.sdr13_6Mm} mm`);
    blocks.push({
      type: "paragraph",
      text: `${dn} mm also appears in the catalogue's gas table: ${gasBits.join(" and ")}, supplied in ${f.gas.lengths.join(" or ")} m. Note that gas pipe is a separate product — produced to INSO 11233-2, with its own marking and approval and electrofusion jointing. Water supply pipe of the same diameter cannot be used in a gas network.`,
    });
  }

  if (f.irrigation) {
    blocks.push({ type: "heading", level: 2, text: COPY.en.irrigationHeading });
    blocks.push({
      type: "paragraph",
      text: `${dn} mm also appears in the catalogue's drip irrigation table (${dripIrrigationTable.standard}), in PE32 and PE40 grades at lower pressure classes. That is not the same product as pressure water pipe.`,
    });
  }

  blocks.push(
    { type: "heading", level: 2, text: COPY.en.orderHeading },
    {
      type: "list",
      items: [
        `Outside diameter: ${dn} mm`,
        "SDR or nominal pressure — without it the enquiry cannot be priced",
        "Material grade: PE80 or PE100",
        "Application: water supply, gas, irrigation, sewerage or industrial",
        "Length, supply form and delivery destination",
      ],
    },
    {
      type: "internal-links",
      title: "Related",
      links: [
        {
          label: "Full dimensions chart",
          path: "/technical-center/hdpe-pipe-dimensions-chart",
          hint: "Every diameter in one table",
        },
        {
          label: "Complete polyethylene pipe guide",
          path: "/technical-center/polyethylene-pipe-complete-guide",
        },
        { label: "Water supply pipe", path: "/products/water-supply-pipe" },
        { label: "Request a quote", path: "/request-quote" },
      ],
    },
  );

  return blocks;
}

function faFaqs(dn: number, f: PipeSizeFacts): ContentDocument["faqs"] {
  const thinnest = f.classes[0];
  const thickest = f.classes[f.classes.length - 1];
  if (!thinnest || !thickest) return undefined;
  const pressures = statedPressures(f);
  return [
    {
      question: `لوله پلی اتیلن ${dn} چه ضخامتی دارد؟`,
      answer: `بستگی به کلاس فشار دارد. در قطر ${dn} میلی‌متر، کاتالوگ ${f.classes.length} کلاس ارائه می‌دهد: از SDR ${thinnest.sdr} با ضخامت ${thinnest.wallMm} میلی‌متر تا SDR ${thickest.sdr} با ضخامت ${thickest.wallMm} میلی‌متر. بدون مشخص کردن SDR، ضخامت معین نیست.`,
    },
    {
      question: `فشار کاری لوله ${dn} چقدر است؟`,
      answer: `از ${Math.min(...pressures)} تا ${Math.max(...pressures)} بار، بسته به SDR و گرید ماده. این اعداد برای دمای ۲۰ درجه‌اند؛ در دمای بالاتر باید با ضریب کاهش دما تصحیح شوند.`,
    },
    {
      question: `لوله ${dn} کلاف است یا شاخه؟`,
      answer:
        f.supply.some((s) => s.packageType === "coil") &&
        f.supply.some((s) => s.packageType === "branch")
          ? `هر دو، بسته به کلاس فشار. کلاس‌های سبک‌تر این قطر به‌صورت کلاف و کلاس‌های سنگین‌تر به‌صورت شاخه ۱۲ متری تحویل می‌شوند.`
          : f.supply.some((s) => s.packageType === "coil")
            ? "به‌صورت کلاف تحویل می‌شود."
            : "به‌صورت شاخه ۱۲ متری تحویل می‌شود؛ در این ضخامت جداره لوله قابل کلاف کردن نیست.",
    },
    {
      question: `قیمت لوله پلی اتیلن ${dn} چطور حساب می‌شود؟`,
      answer: `قیمت بر پایه وزن است، نه متر. وزن هر متر از قطر، ضخامت جداره و چگالی ماده می‌آید — به همین دلیل لوله ${dn} در SDR های مختلف قیمت‌های متفاوتی دارد. برای قیمت روز، قطر و SDR و متراژ را در استعلام بنویسید.`,
    },
  ];
}

function buildDoc(locale: Locale, dn: number, f: PipeSizeFacts): ContentDocument {
  const c = COPY[locale];
  const path = `${PATH_PREFIX}/${dn}`;
  return {
    id: `pipe-size-${dn}`,
    slug: String(dn),
    path,
    locale,
    kind: "article",
    title: c.title(dn),
    seoTitle: c.seoTitle(dn),
    seoDescription:
      locale === "fa"
        ? `لوله پلی اتیلن ${dn} میلی‌متر — ضخامت جداره و فشار اسمی در ${f.classes.length} کلاس SDR، شکل تحویل کلاف یا شاخه، و آنچه باید در سفارش بنویسید.`
        : `${dn} mm HDPE pipe — wall thickness and nominal pressure across ${f.classes.length} SDR classes, supply form, and what to state when ordering.`,
    description:
      locale === "fa"
        ? `مشخصات کاتالوگ لوله پلی اتیلن در قطر ${dn} میلی‌متر.`
        : `Catalogue specifications for ${dn} mm polyethylene pipe.`,
    primaryKeyword: locale === "fa" ? `لوله پلی اتیلن ${dn}` : `${dn} mm HDPE pipe`,
    secondaryKeywords:
      locale === "fa"
        ? [`لوله ${dn} پلی اتیلن`, `ضخامت لوله پلی اتیلن ${dn}`, `قیمت لوله پلی اتیلن ${dn}`]
        : [`${dn} mm polyethylene pipe`, `HDPE pipe ${dn} mm wall thickness`],
    status: "published",
    evidenceStatus: "verified",
    verificationStatus: "verified",
    lastReviewed: "2026-09-23",
    breadcrumbs: [
      { label: c.home, path: "/" },
      { label: c.crumb, path: PATH_PREFIX },
      { label: c.title(dn), path },
    ],
    sections: locale === "fa" ? fa(dn, f) : en(dn, f),
    faqs: locale === "fa" ? faFaqs(dn, f) : undefined,
    related: {
      products: ["water-supply-pipe", "pe100-pipe"],
      articles: ["polyethylene-pipe-complete-guide"],
    },
  };
}


function buildIndex(locale: Locale): ContentDocument {
  const sizes = pipeSizes;
  const coilable = sizes.filter((dn) => {
    const f = pipeSizeFacts(dn);
    return f?.supply.some((x) => x.packageType === "coil") ?? false;
  });

  const links = sizes.map((dn) => ({
    label: locale === "fa" ? `لوله پلی اتیلن ${dn}` : `${dn} mm`,
    path: `${PATH_PREFIX}/${dn}`,
  }));

  const faSections: ContentBlock[] = [
    {
      type: "paragraph",
      text: `کارخانه بوکان پایپ لوله پلی اتیلن را در ${sizes.length} قطر خارجی، از ${sizes[0]} تا ${sizes[sizes.length - 1]} میلی‌متر تولید می‌کند. برای هر قطر، صفحه‌ای جداگانه هست که ضخامت جداره و فشار اسمی را در همه کلاس‌های SDR موجود همان قطر می‌آورد — مستقیم از جدول کاتالوگ کارخانه.`,
    },
    {
      type: "paragraph",
      text: "قطر به‌تنهایی سفارش را مشخص نمی‌کند. در یک قطر، چند کلاس فشار وجود دارد که ضخامت جداره، قطر داخلی، وزن و قیمتشان متفاوت است. صفحه هر قطر نشان می‌دهد دقیقاً کدام کلاس‌ها در آن قطر موجودند.",
    },
    { type: "heading", level: 2, text: "همه قطرهای تولیدی" },
    { type: "internal-links", title: "انتخاب قطر", links },
    { type: "heading", level: 2, text: "کلاف یا شاخه" },
    {
      type: "paragraph",
      text: `قطرهای کوچک‌تر معمولاً به‌صورت کلاف تحویل می‌شوند و قطرهای بزرگ به‌صورت شاخه ۱۲ متری. در کاتالوگ، ${coilable.length} قطر دست‌کم در یکی از کلاس‌های فشارشان کلاف‌شدنی‌اند. شکل تحویل دقیق هر قطر در صفحه خودش آمده است، چون به کلاس فشار هم بستگی دارد.`,
    },
    {
      type: "internal-links",
      title: "مرتبط",
      links: [
        {
          label: "جدول کامل سایز، ضخامت و SDR",
          path: "/technical-center/polyethylene-pipe-dimensions-table",
          hint: "همه قطرها در یک جدول",
        },
        {
          label: "راهنمای کامل لوله پلی اتیلن",
          path: "/technical-center/polyethylene-pipe-complete-guide",
        },
        { label: "استعلام قیمت", path: "/request-quote" },
      ],
    },
  ];

  const enSections: ContentBlock[] = [
    {
      type: "paragraph",
      text: `Bukan Pipe produces polyethylene pipe in ${sizes.length} outside diameters, from ${sizes[0]} to ${sizes[sizes.length - 1]} mm. Each diameter has its own page giving wall thickness and nominal pressure across every SDR class the catalogue offers at that size.`,
    },
    {
      type: "paragraph",
      text: "Diameter alone does not define an order. At any one diameter there are several pressure classes, differing in wall thickness, bore, weight and price. Each size page shows exactly which classes exist at that diameter.",
    },
    { type: "heading", level: 2, text: "Every diameter produced" },
    { type: "internal-links", title: "Choose a diameter", links },
    {
      type: "internal-links",
      title: "Related",
      links: [
        {
          label: "Full dimensions chart",
          path: "/technical-center/hdpe-pipe-dimensions-chart",
          hint: "Every diameter in one table",
        },
        {
          label: "Complete polyethylene pipe guide",
          path: "/technical-center/polyethylene-pipe-complete-guide",
        },
        { label: "Request a quote", path: "/request-quote" },
      ],
    },
  ];

  return {
    id: "pipe-size-index",
    slug: "pipe-size",
    path: PATH_PREFIX,
    locale,
    kind: "hub",
    title: locale === "fa" ? "سایزهای لوله پلی اتیلن" : "HDPE Pipe Sizes",
    seoTitle:
      locale === "fa"
        ? "سایز لوله پلی اتیلن | همه قطرها از ۱۶ تا ۶۳۰ میلی‌متر | بوکان پایپ"
        : "HDPE Pipe Sizes | Every Diameter from 16 to 630 mm | Bukan Pipe",
    seoDescription:
      locale === "fa"
        ? `سایز لوله پلی اتیلن در ${sizes.length} قطر از ۱۶ تا ۶۳۰ میلی‌متر — ضخامت جداره و فشار اسمی هر قطر در کلاس‌های SDR کاتالوگ کارخانه.`
        : `HDPE pipe sizes in ${sizes.length} diameters from 16 to 630 mm — wall thickness and nominal pressure for each, from the factory catalogue.`,
    description:
      locale === "fa"
        ? "فهرست قطرهای تولیدی با مشخصات کاتالوگ."
        : "Every produced diameter with its catalogue specifications.",
    primaryKeyword: locale === "fa" ? "سایز لوله پلی اتیلن" : "HDPE pipe sizes",
    secondaryKeywords:
      locale === "fa"
        ? ["قطر لوله پلی اتیلن", "اندازه لوله پلی اتیلن"]
        : ["polyethylene pipe diameters", "PE pipe size chart"],
    status: "published",
    evidenceStatus: "verified",
    verificationStatus: "verified",
    lastReviewed: "2026-09-23",
    breadcrumbs: [
      { label: locale === "fa" ? "خانه" : "Home", path: "/" },
      { label: locale === "fa" ? "سایزها" : "Sizes", path: PATH_PREFIX },
    ],
    sections: locale === "fa" ? faSections : enSections,
    faqs:
      locale === "fa"
        ? [
            {
              question: "لوله پلی اتیلن در چه سایزهایی تولید می‌شود؟",
              answer: `بوکان پایپ ${sizes.length} قطر خارجی تولید می‌کند، از ${sizes[0]} تا ${sizes[sizes.length - 1]} میلی‌متر. در هر قطر، چند کلاس فشار با ضخامت جداره متفاوت موجود است.`,
            },
            {
              question: "سایز لوله را چطور انتخاب کنم؟",
              answer:
                "قطر از دبی طرح و سرعت مجاز جریان می‌آید، و کلاس فشار جداگانه از حداکثر فشار خط به‌علاوه سهم ضربه. این دو انتخاب مستقل‌اند؛ جابه‌جا کردنشان رایج‌ترین خطای سفارش است.",
            },
          ]
        : undefined,
    related: {
      products: ["water-supply-pipe", "pe100-pipe"],
      articles: ["polyethylene-pipe-complete-guide"],
    },
  };
}

export function pipeSizeDocuments(locale: Locale): readonly ContentDocument[] {
  return [
    buildIndex(locale),
    ...pipeSizes
      .map((dn) => {
        const facts = pipeSizeFacts(dn);
        return facts ? buildDoc(locale, dn, facts) : null;
      })
      .filter((d): d is ContentDocument => d !== null),
  ];
}
