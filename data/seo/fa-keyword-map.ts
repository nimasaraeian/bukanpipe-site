/** Persian keyword map — URL → primary → secondary → search intent. FA SEO only. */
export type FaSearchIntent = "commercial" | "informational" | "transactional" | "navigational";

export type FaKeywordMapEntry = {
  path: string;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  intent: FaSearchIntent;
  cluster: "commercial" | "technical" | "application" | "brand";
};

/**
 * Every published FA page, not a hand-picked subset — it covered 24 of 45 and
 * drifted from the pages themselves, which is how six laboratory pages ended
 * up sharing one keyword without anything noticing.
 *
 * The content documents stay the source of truth for the keywords: they are
 * what `lib/content/metadata.ts` renders. This map adds the intent and cluster
 * a document does not carry, and `fa-keyword-map.test.ts` fails if the two
 * ever disagree or if a published page is missing here.
 */
export const faKeywordMap: readonly FaKeywordMapEntry[] = [
  {
    path: "/",
    primaryKeyword: "تولید کننده لوله پلی اتیلن",
    // "کارخانه لوله پلی اتیلن" moved to /about, which owns it outright.
    secondaryKeywords: ["بوکان پایپ", "تولید کننده لوله HDPE"],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/about",
    primaryKeyword: "کارخانه لوله پلی اتیلن",
    secondaryKeywords: [
      "کارخانه تولید لوله پلی اتیلن",
      "تولید کننده لوله HDPE",
      "تامین کننده لوله پلی اتیلن",
      "خرید لوله پلی اتیلن از کارخانه",
    ],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/applications",
    primaryKeyword: "کاربرد لوله پلی اتیلن",
    secondaryKeywords: [
      "لوله پلی اتیلن آبرسانی",
      "لوله پلی اتیلن کشاورزی",
      "لوله پلی اتیلن صنعتی",
    ],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/applications/agriculture-irrigation",
    primaryKeyword: "لوله پلی اتیلن کشاورزی",
    secondaryKeywords: ["لوله آبیاری پلی اتیلن", "خط اصلی آبیاری"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/applications/cable-protection",
    primaryKeyword: "لوله حفاظ کابل",
    secondaryKeywords: ["duct پلی اتیلن"],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/applications/drainage",
    primaryKeyword: "لوله زهکشی پلی اتیلن",
    secondaryKeywords: ["آب باران PE"],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/applications/gas-distribution",
    primaryKeyword: "لوله گازرسانی پلی اتیلن",
    secondaryKeywords: ["لوله پلی اتیلن گاز", "شبکه گاز PE"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/applications/industrial",
    primaryKeyword: "کاربرد صنعتی لوله پلی اتیلن",
    secondaryKeywords: ["لوله HDPE صنعتی", "انتقال سیالات PE", "لوله پلی اتیلن دوغاب"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/applications/sewage",
    primaryKeyword: "لوله فاضلاب پلی اتیلن",
    secondaryKeywords: ["شبکه فاضلاب HDPE"],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/applications/water-transfer",
    primaryKeyword: "لوله انتقال آب پلی اتیلن",
    secondaryKeywords: ["لوله پلی اتیلن آبرسانی", "شبکه آبرسانی PE"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/calculator",
    primaryKeyword: "ماشین حساب لوله پلی اتیلن",
    secondaryKeywords: ["محاسبه آنلاین قطر لوله", "محاسبه افت فشار لوله", "محاسبه توان پمپ"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/calculator/pipeline-design",
    primaryKeyword: "محاسبه قطر لوله",
    secondaryKeywords: ["افت فشار لوله پلی اتیلن", "سرعت جریان لوله"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/certifications",
    primaryKeyword: "گواهی لوله پلی اتیلن",
    secondaryKeywords: ["استاندارد لوله پلی اتیلن", "واحد نمونه"],
    intent: "navigational",
    cluster: "brand",
  },
  {
    path: "/contact",
    primaryKeyword: "تماس بوکان پایپ",
    secondaryKeywords: ["آدرس کارخانه لوله پلی اتیلن", "خرید لوله پلی اتیلن"],
    intent: "transactional",
    cluster: "brand",
  },
  {
    path: "/downloads",
    primaryKeyword: "دانلود کاتالوگ لوله پلی اتیلن",
    secondaryKeywords: [],
    intent: "navigational",
    cluster: "brand",
  },
  {
    path: "/laboratory",
    primaryKeyword: "آزمایشگاه لوله پلی اتیلن",
    secondaryKeywords: ["کنترل کیفیت لوله پلی اتیلن", "آزمایشگاه پلیمر", "تست لوله پلی اتیلن"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/laboratory/iso-17025",
    primaryKeyword: "ایزو ۱۷۰۲۵ آزمایشگاه",
    secondaryKeywords: ["ISO IEC 17025", "اعتباربخشی آزمایشگاه", "گواهی ISO 17025 آزمایشگاه"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/laboratory/services",
    primaryKeyword: "خدمات آزمون لوله پلی اتیلن",
    secondaryKeywords: ["آزمون لوله و اتصالات", "خدمات آزمایشگاه پلیمر", "تست نمونه لوله"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/laboratory/standards",
    primaryKeyword: "استاندارد آزمون لوله پلی اتیلن",
    secondaryKeywords: ["INSO آزمون لوله", "ISO آزمون پلی اتیلن", "روش آزمون لوله PE"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/laboratory/test-scope",
    primaryKeyword: "دامنه آزمون لوله پلی اتیلن",
    secondaryKeywords: [
      "فهرست آزمون لوله PE",
      "آزمون هیدرواستاتیک لوله",
      "دامنه اعتبار آزمایشگاه",
    ],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/laboratory/training",
    primaryKeyword: "آموزش فنی لوله پلی اتیلن",
    secondaryKeywords: ["دوره جوش پلی اتیلن", "آموزش کنترل کیفیت لوله", "آموزش جوشکار PE"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/polyethylene-pipe",
    primaryKeyword: "لوله پلی اتیلن چیست",
    secondaryKeywords: [
      "معرفی لوله پلی اتیلن",
      "کاربرد لوله پلی اتیلن",
      "مزایای لوله پلی اتیلن",
    ],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/products",
    primaryKeyword: "خرید لوله پلی اتیلن از کارخانه",
    secondaryKeywords: [
      "تامین کننده لوله پلی اتیلن",
      "تولید کننده لوله HDPE",
      "لوله پلی اتیلن PE100",
    ],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/products/drainage-pipe",
    primaryKeyword: "لوله زهکشی HDPE",
    secondaryKeywords: ["لوله زهکشی پلی اتیلن", "آب باران PE"],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/products/gas-pipe",
    primaryKeyword: "لوله پلی اتیلن گاز",
    secondaryKeywords: ["لوله گازرسانی پلی اتیلن", "لوله PE گاز", "لوله گاز پلی اتیلن"],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/products/industrial-pipe",
    primaryKeyword: "لوله پلی اتیلن صنعتی",
    secondaryKeywords: ["لوله HDPE صنعتی", "لوله فرآیند پلی اتیلن", "تولید کننده لوله PE100"],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/products/irrigation-pipe",
    primaryKeyword: "لوله پلی اتیلن آبیاری",
    secondaryKeywords: [
      "لوله آبیاری تحت فشار",
      "لوله آبیاری پلی اتیلن",
      "خط اصلی آبیاری HDPE",
    ],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/products/pe100-pipe",
    primaryKeyword: "لوله پلی اتیلن PE100",
    secondaryKeywords: ["لوله HDPE PE100", "لوله فشار PE100", "تأمین لوله PE100"],
    intent: "commercial",
    cluster: "technical",
  },
  {
    path: "/products/sewage-pipe",
    primaryKeyword: "لوله فاضلاب HDPE",
    secondaryKeywords: ["لوله فاضلاب پلی اتیلن", "لوله PE فاضلاب"],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/products/water-supply-pipe",
    primaryKeyword: "لوله پلی اتیلن آبرسانی",
    secondaryKeywords: ["لوله انتقال آب پلی اتیلن", "لوله HDPE آبرسانی", "لوله آب پلی اتیلن"],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/quality",
    primaryKeyword: "کنترل کیفیت لوله پلی اتیلن",
    secondaryKeywords: ["QC لوله PE", "آزمون لوله HDPE", "تولید کننده لوله پلی اتیلن"],
    intent: "navigational",
    cluster: "brand",
  },
  {
    path: "/request-quote",
    primaryKeyword: "قیمت لوله پلی اتیلن",
    secondaryKeywords: [
      "استعلام قیمت لوله پلی اتیلن",
      "درخواست قیمت لوله PE",
      "پیش‌فاکتور لوله پلی اتیلن",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/solutions",
    primaryKeyword: "تامین کننده لوله پلی اتیلن",
    secondaryKeywords: ["راهکار خط لوله HDPE", "تأمین پروژه‌ای لوله PE"],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/technical-center",
    primaryKeyword: "مرکز فنی لوله پلی اتیلن",
    secondaryKeywords: ["راهنمای مهندسی لوله PE", "جوش و نصب لوله پلی اتیلن"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/air-vent-valve",
    primaryKeyword: "شیر هوا لوله پلی اتیلن",
    secondaryKeywords: ["کتابی شدن لوله", "ضربه قوچ", "شیر تخلیه هوا"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/gas-polyethylene-pipe-guide",
    primaryKeyword: "لوله پلی اتیلن گازرسانی",
    secondaryKeywords: [
      "لوله گاز پلی اتیلن",
      "HDPE gas pipe",
      "استاندارد لوله گاز",
      "تولید کننده لوله گاز",
    ],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/hdpe-installation-guide",
    primaryKeyword: "راهنمای نصب HDPE",
    secondaryKeywords: ["نصب لوله پلی اتیلن", "ترانشه لوله پلی اتیلن", "آزمون فشار HDPE"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/hdpe-pipe-what-is",
    primaryKeyword: "لوله HDPE چیست",
    secondaryKeywords: ["تفاوت HDPE و PVC", "لوله HDPE یا فولادی", "معنی HDPE"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/pe100-technical-guide",
    primaryKeyword: "راهنمای فنی PE100",
    secondaryKeywords: ["MRS PE100", "محاسبه PN لوله", "انتخاب SDR لوله پلی اتیلن"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/pe80-vs-pe100",
    primaryKeyword: "تفاوت PE80 و PE100",
    secondaryKeywords: [
      "PE80 یا PE100",
      "MRS لوله پلی اتیلن",
      "انتخاب گرید لوله پلی اتیلن",
    ],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/polyethylene-pipe-complete-guide",
    primaryKeyword: "لوله پلی اتیلن",
    secondaryKeywords: [
      "لوله HDPE",
      "لوله PE100",
      "تولید کننده لوله پلی اتیلن",
      "کارخانه تولید لوله پلی اتیلن",
      "خرید لوله پلی اتیلن",
      "استاندارد لوله پلی اتیلن",
    ],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/polyethylene-pipe-dimensions-table",
    primaryKeyword: "جدول سایز لوله پلی اتیلن",
    secondaryKeywords: [
      "جدول ضخامت لوله پلی اتیلن",
      "SDR لوله پلی اتیلن",
      "جدول وزن لوله پلی اتیلن",
      "سایز لوله پلی اتیلن آبرسانی",
    ],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/polyethylene-pipe-specifications",
    primaryKeyword: "مشخصات فنی لوله پلی اتیلن",
    secondaryKeywords: [
      "SDR لوله پلی اتیلن",
      "PN لوله پلی اتیلن",
      "قطر لوله پلی اتیلن",
    ],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/polyethylene-pipe-standards",
    primaryKeyword: "استاندارد لوله پلی اتیلن",
    secondaryKeywords: [
      "INSO 14427",
      "استاندارد اجباری لوله پلی اتیلن",
      "علامت استاندارد لوله",
      "پروانه استاندارد لوله پلی اتیلن",
    ],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/polyethylene-pipe-temperature-pressure",
    primaryKeyword: "فشار کاری لوله پلی اتیلن",
    secondaryKeywords: ["MOP", "PN", "ضریب دما"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/polyethylene-pipe-welding",
    primaryKeyword: "جوش لوله پلی اتیلن",
    secondaryKeywords: ["بات فیوژن", "الکتروفیوژن", "INSO 18648"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/subsurface-drip-irrigation",
    primaryKeyword: "آبیاری زیرسطحی",
    secondaryKeywords: ["آبیاری قطره‌ای", "لوله کشاورزی"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/water-supply-polyethylene-pipe-guide",
    primaryKeyword: "راهنمای فنی لوله پلی اتیلن آبرسانی",
    secondaryKeywords: [
      "لوله آب پلی اتیلن",
      "PE100 water pipe",
      "لوله انتقال آب",
      "خرید لوله آبرسانی",
    ],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/pipe-size",
    primaryKeyword: "سایز لوله پلی اتیلن",
    secondaryKeywords: [
      "قطر لوله پلی اتیلن",
      "اندازه لوله پلی اتیلن",
    ],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/16",
    primaryKeyword: "لوله پلی اتیلن 16",
    secondaryKeywords: [
      "لوله 16 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 16",
      "قیمت لوله پلی اتیلن 16",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/20",
    primaryKeyword: "لوله پلی اتیلن 20",
    secondaryKeywords: [
      "لوله 20 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 20",
      "قیمت لوله پلی اتیلن 20",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/25",
    primaryKeyword: "لوله پلی اتیلن 25",
    secondaryKeywords: [
      "لوله 25 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 25",
      "قیمت لوله پلی اتیلن 25",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/32",
    primaryKeyword: "لوله پلی اتیلن 32",
    secondaryKeywords: [
      "لوله 32 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 32",
      "قیمت لوله پلی اتیلن 32",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/40",
    primaryKeyword: "لوله پلی اتیلن 40",
    secondaryKeywords: [
      "لوله 40 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 40",
      "قیمت لوله پلی اتیلن 40",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/50",
    primaryKeyword: "لوله پلی اتیلن 50",
    secondaryKeywords: [
      "لوله 50 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 50",
      "قیمت لوله پلی اتیلن 50",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/63",
    primaryKeyword: "لوله پلی اتیلن 63",
    secondaryKeywords: [
      "لوله 63 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 63",
      "قیمت لوله پلی اتیلن 63",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/75",
    primaryKeyword: "لوله پلی اتیلن 75",
    secondaryKeywords: [
      "لوله 75 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 75",
      "قیمت لوله پلی اتیلن 75",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/90",
    primaryKeyword: "لوله پلی اتیلن 90",
    secondaryKeywords: [
      "لوله 90 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 90",
      "قیمت لوله پلی اتیلن 90",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/110",
    primaryKeyword: "لوله پلی اتیلن 110",
    secondaryKeywords: [
      "لوله 110 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 110",
      "قیمت لوله پلی اتیلن 110",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/125",
    primaryKeyword: "لوله پلی اتیلن 125",
    secondaryKeywords: [
      "لوله 125 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 125",
      "قیمت لوله پلی اتیلن 125",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/140",
    primaryKeyword: "لوله پلی اتیلن 140",
    secondaryKeywords: [
      "لوله 140 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 140",
      "قیمت لوله پلی اتیلن 140",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/160",
    primaryKeyword: "لوله پلی اتیلن 160",
    secondaryKeywords: [
      "لوله 160 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 160",
      "قیمت لوله پلی اتیلن 160",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/180",
    primaryKeyword: "لوله پلی اتیلن 180",
    secondaryKeywords: [
      "لوله 180 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 180",
      "قیمت لوله پلی اتیلن 180",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/200",
    primaryKeyword: "لوله پلی اتیلن 200",
    secondaryKeywords: [
      "لوله 200 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 200",
      "قیمت لوله پلی اتیلن 200",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/225",
    primaryKeyword: "لوله پلی اتیلن 225",
    secondaryKeywords: [
      "لوله 225 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 225",
      "قیمت لوله پلی اتیلن 225",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/250",
    primaryKeyword: "لوله پلی اتیلن 250",
    secondaryKeywords: [
      "لوله 250 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 250",
      "قیمت لوله پلی اتیلن 250",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/280",
    primaryKeyword: "لوله پلی اتیلن 280",
    secondaryKeywords: [
      "لوله 280 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 280",
      "قیمت لوله پلی اتیلن 280",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/315",
    primaryKeyword: "لوله پلی اتیلن 315",
    secondaryKeywords: [
      "لوله 315 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 315",
      "قیمت لوله پلی اتیلن 315",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/355",
    primaryKeyword: "لوله پلی اتیلن 355",
    secondaryKeywords: [
      "لوله 355 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 355",
      "قیمت لوله پلی اتیلن 355",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/400",
    primaryKeyword: "لوله پلی اتیلن 400",
    secondaryKeywords: [
      "لوله 400 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 400",
      "قیمت لوله پلی اتیلن 400",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/450",
    primaryKeyword: "لوله پلی اتیلن 450",
    secondaryKeywords: [
      "لوله 450 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 450",
      "قیمت لوله پلی اتیلن 450",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/500",
    primaryKeyword: "لوله پلی اتیلن 500",
    secondaryKeywords: [
      "لوله 500 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 500",
      "قیمت لوله پلی اتیلن 500",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/560",
    primaryKeyword: "لوله پلی اتیلن 560",
    secondaryKeywords: [
      "لوله 560 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 560",
      "قیمت لوله پلی اتیلن 560",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/pipe-size/630",
    primaryKeyword: "لوله پلی اتیلن 630",
    secondaryKeywords: [
      "لوله 630 پلی اتیلن",
      "ضخامت لوله پلی اتیلن 630",
      "قیمت لوله پلی اتیلن 630",
    ],
    intent: "transactional",
    cluster: "commercial",
  },
];

export function getFaKeywordEntry(path: string): FaKeywordMapEntry | undefined {
  const normalized = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return faKeywordMap.find((entry) => entry.path === normalized);
}
