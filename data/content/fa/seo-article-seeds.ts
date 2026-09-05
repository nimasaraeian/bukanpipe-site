import type { SeoArticleSeed } from "@/lib/content/seo-content-model";
import { seoLandingPaths } from "@/lib/content/seo-content-model";

export const faPe100TechnicalGuideSeed: SeoArticleSeed = {
  slug: "pe100-technical-guide",
  title: "راهنمای فنی PE100",
  seoTitle: "راهنمای فنی PE100 | MRS، SDR، PN و انتخاب لوله HDPE | بوکان پایپ",
  seoDescription:
    "راهنمای مهندسی PE100: MRS ۱۰ مگاپاسکال، SDR، درج PN، مقایسه PE80 و PE100 و ضریب دما.",
  description: "مرجع فنی گرید PE100، طراحی فشار و انتخاب لوله.",
  primaryKeyword: "راهنمای فنی PE100",
  secondaryKeywords: ["MRS PE100", "SDR لوله", "PN لوله پلی اتیلن"],
  definition:
    "PE100 گرید ترکیب پلی‌اتیلن با حداقل استحکام مورد نیاز (MRS) ۱۰ مگاپاسکال در ۲۰ °C برای ۵۰ سال است — مبنای ضخامت جداره و کلاس PN.",
  sections: [
    {
      type: "paragraph",
      text: "PE100 در همان SDR امکان جداره نازک‌تر یا فشار بالاتر را فراهم می‌کند. بوکان پایپ لوله PE100 را تا قطر ۶۳۰ میلی‌متر تولید می‌کند.",
    },
    { type: "heading", level: 2, text: "MRS و تنش مدور" },
    {
      type: "paragraph",
      text: "MRS استحکام هیدراستاتیک بلندمدت ماده است. PE100 (۱۰ MPa) نسبت به PE80 (۸ MPa) تنش طراحی بالاتری دارد.",
    },
    { type: "heading", level: 2, text: "SDR و PN" },
    {
      type: "paragraph",
      text: "SDR نسبت قطر خارجی به ضخامت جداره است. PN روی لوله آبرسانی در دمای مرجع ۲۰ °C درج می‌شود.",
    },
    {
      type: "spec-table",
      title: "پارامترهای کلیدی طراحی",
      rows: [
        { label: "MRS در PE100", value: "۱۰ مگاپاسکال" },
        { label: "MRS در PE80", value: "۸ مگاپاسکال" },
        { label: "دمای مرجع PN", value: "۲۰ °C" },
        { label: "حداکثر قطر (بوکان پایپ)", value: "۶۳۰ میلی‌متر تک‌جداره" },
      ],
    },
    { type: "heading", level: 2, text: "PE100 در مقابل PE80" },
    {
      type: "list",
      items: [
        "در یک SDR، PE100 معمولاً PN بالاتر یا جداره نازک‌تر دارد",
        "گرید ماده باید مطابق مشخصات پروژه باشد",
        "ضریب دما برای هر دو گرید اعمال می‌شود",
      ],
    },
  ],
  related: {
    products: ["pe100-pipe", "water-supply-pipe", "gas-pipe", "industrial-pipe"],
    articles: ["polyethylene-pipe-temperature-pressure", "hdpe-installation-guide"],
  },
  faqs: [
    {
      question: "آیا PE100 ضریب دما را حذف می‌کند؟",
      answer: "خیر. MOP همچنان باید ضریب fT را در دمای کاربرد لحاظ کند.",
    },
  ],
  curatedLinks: [
    { label: "لوله PE100", path: seoLandingPaths.pe100 },
    { label: "لوله HDPE آبرسانی", path: seoLandingPaths.water },
    { label: "راهنمای لوله پلی‌اتیلن", path: seoLandingPaths.pillar },
  ],
};

export const faHdpeInstallationGuideSeed: SeoArticleSeed = {
  slug: "hdpe-installation-guide",
  title: "راهنمای نصب HDPE",
  seoTitle: "راهنمای نصب لوله HDPE | ترanche، جوش، آزمون فشار | بوکان پایپ",
  seoDescription:
    "راهنمای اجرای میدانی لوله HDPE: آماده‌سازی ترanche، بستر، جوش butt fusion و الکتروفیوژن، آزمون فشار.",
  description: "مراحل نصب شبکه PE برای پروژه‌های آب، گاز و آبیاری.",
  primaryKeyword: "راهنمای نصب HDPE",
  secondaryKeywords: ["نصب لوله پلی اتیلن", "جوش لوله PE", "آزمون فشار HDPE"],
  definition:
    "نصب HDPE شامل حفاری، بستر، حمل و نگهداری، جوش، تجهیزات جانبی (شیر هوا) و آزمون فشار قبل از بهره‌برداری است.",
  sections: [
    {
      type: "paragraph",
      text: "اجرای صحیح، عملکرد طراحی‌شده شبکه HDPE را حفظ می‌کند. این راهنما مراحل رایج میدانی را خلاصه می‌کند — ITP پروژه و مشخصات مهندس مبناست.",
    },
    { type: "heading", level: 2, text: "ترanche و بستر" },
    {
      type: "list",
      items: [
        "حفاری مطابق نقشه و حفاظت از تاسیسات مجاور",
        "بستر پایدار بدون سنگ تیز",
        "تراکم کناری بدون بار نقطه‌ای روی لوله",
        "حفظ حداقل عمق پوشش مطابق بار ترافیک",
      ],
    },
    { type: "heading", level: 2, text: "جوش" },
    {
      type: "paragraph",
      text: "butt fusion در خطوط آب و آبیاری رایج است. الکتروفیوژن برای گازرسانی در ایران روش تأییدشده است.",
    },
    {
      type: "spec-table",
      title: "روش اتصال بر اساس کاربرد",
      rows: [
        { label: "آب / آبیاری", value: "butt fusion؛ الکتروفیوژن برای تعمیر" },
        { label: "گاز (ایران)", value: "الکتروفیوژن" },
        { label: "سوابق کیفیت", value: "PQR، صلاحیت جوشکار، لاگ پارامترها" },
      ],
    },
    { type: "heading", level: 2, text: "آزمون و بهره‌برداری" },
    {
      type: "list",
      items: [
        "آزمون هیدراستاتیک مطابق مشخصات پروژه",
        "شستشو و ضدعفونی خطوط آب شرب",
        "تحویل نقشه as-built و سوابق جوش",
      ],
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe"],
    articles: ["polyethylene-pipe-welding", "air-vent-valve"],
    laboratory: ["test-scope"],
  },
  references: ["https://bukanpipe.com/welding/"],
  faqs: [
    {
      question: "آیا قبل از آزمون فشار می‌توان backfill کرد؟",
      answer: "مطابق ITP پروژه عمل کنید — بسیاری از مشخصات آزمون قبل از backfill کامل را الزام می‌کنند.",
    },
  ],
  curatedLinks: [
    { label: "راهنمای جوش", path: seoLandingPaths.welding },
    { label: "لوله HDPE آبرسانی", path: seoLandingPaths.water },
    { label: "لوله HDPE گازرسانی", path: seoLandingPaths.gas },
  ],
};

export const faHdpePipeWhatIsSeed: SeoArticleSeed = {
  slug: "hdpe-pipe-what-is",
  title: "لوله HDPE چیست؟",
  seoTitle: "لوله HDPE چیست؟ | تفاوت PE و HDPE در شبکه لوله | بوکان پایپ",
  seoDescription:
    "لوله HDPE چیست و چه تفاوتی با سایر لوله‌ها دارد؟ راهنمای مفهومی برای مهندسان و خریداران صنعتی — بدون اغراق بازاری.",
  description: "تعریف لوله HDPE، ساختار، مزایا و کاربردهای رایج در ایران.",
  primaryKeyword: "لوله HDPE چیست",
  secondaryKeywords: ["لوله پلی اتیلن چیست", "HDPE pipe", "تفاوت HDPE و PVC"],
  definition:
    "HDPE مخفف High-Density Polyethylene است — پلی‌اتیلن با چگالی بالا که در قالب لوله فشار تک‌جداره برای آب، گاز، کشاورزی و صنعت اکستروژن می‌شود.",
  sections: [
    {
      type: "paragraph",
      text: "در بازار ایران معمولاً از واژه‌های «لوله پلی اتیلن»، «لوله PE» و «لوله HDPE» برای یک خانواده محصول استفاده می‌شود. تفاوت عملی در گرید ماده (PE80، PE100)، SDR، PN و استاندارد تولید برای هر کاربرد است — نه در نام تجاری.",
    },
    { type: "heading", level: 2, text: "چرا HDPE در شبکه لوله رایج است؟" },
    {
      type: "list",
      items: [
        "مقاومت در برابر خوردگی در خاک — عمر مفید طولانی در دفن",
        "انعطاف و تحمل جابه‌جایی خاک",
        "اتصال جوشی (butt fusion / electrofusion) با یکپارچگی بالا",
        "وزن کم نسبت به فولاد و چدن — نصب سریع‌تر",
      ],
    },
    { type: "heading", level: 2, text: "کاربردهای اصلی در تولید بوکان پایپ" },
    {
      type: "paragraph",
      text: "کارخانه بوکان پایپ لوله HDPE تک‌جداره را تا قطر ۶۳۰ میلی‌متر برای آبرسانی، گازرسانی، آبیاری کشاورزی، فاضلاب، زهکشی و خطوط صنعتی تولید می‌کند.",
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "pe100-pipe"],
    articles: ["pe80-vs-pe100", "polyethylene-pipe-specifications"],
  },
  faqs: [
    {
      question: "آیا HDPE همان PE100 است؟",
      answer:
        "خیر. HDPE نوع ماده است؛ PE100 یک گرید مشخص با MRS بالاتر است. لوله HDPE می‌تواند PE80 یا PE100 باشد.",
    },
    {
      question: "لوله HDPE برای آب شرب مناسب است؟",
      answer:
        "بله، در صورت تولید مطابق استاندارد آبرسانی پروژه (مثلاً INSO 14427-2) و تأیید مهندس ناظر.",
    },
  ],
  curatedLinks: [
    { label: "راهنمای جامع لوله پلی اتیلن", path: seoLandingPaths.pillar },
    { label: "لوله پلی اتیلن آبرسانی", path: seoLandingPaths.water },
    { label: "تفاوت PE80 و PE100", path: "/technical-center/pe80-vs-pe100" },
  ],
};

export const faPe80VsPe100Seed: SeoArticleSeed = {
  slug: "pe80-vs-pe100",
  title: "تفاوت PE80 و PE100",
  seoTitle: "تفاوت PE80 و PE100 | کدام گرید لوله پلی اتیلن؟ | بوکان پایپ",
  seoDescription:
    "تفاوت PE80 و PE100 در MRS، SDR، PN و انتخاب پروژه — راهنمای مهندسی برای خریداران صنعتی.",
  description: "مقایسه فنی PE80 و PE100 بدون توصیه کورکورانه به جایگزینی.",
  primaryKeyword: "تفاوت PE80 و PE100",
  secondaryKeywords: ["PE80 یا PE100", "MRS لوله پلی اتیلن", "لوله پلی اتیلن PE100"],
  definition:
    "PE80 و PE100 دو گرید ترکیب پلی‌اتیلن هستند که با MRS (حداقل استحکام مورد نیاز) ۸ و ۱۰ مگاپاسکال از هم متمایز می‌شوند.",
  sections: [
    {
      type: "spec-table",
      title: "مقایسه خلاصه PE80 و PE100",
      rows: [
        { label: "MRS در PE80", value: "۸ مگاپاسکال" },
        { label: "MRS در PE100", value: "۱۰ مگاپاسکال" },
        { label: "در یک SDR", value: "PE100: جداره نازک‌تر یا PN بالاتر" },
        { label: "انتخاب", value: "مطابق مشخصات مهندسی پروژه — نه جایگزینی خودکار" },
      ],
    },
    { type: "heading", level: 2, text: "چه زمانی PE100 توصیه می‌شود؟" },
    {
      type: "list",
      items: [
        "وقتی نقشه یا مشخصات پروژه صراحتاً PE100 درخواست کرده",
        "طراحی فشار بالاتر در همان قطر خارجی",
        "کاهش وزن خط با جداره نازک‌تر در SDR یکسان",
      ],
    },
    {
      type: "paragraph",
      text: "بوکان پایپ هر دو گرید را مطابق سفارش پروژه تولید می‌کند. صفحه محصول PE100 و راهنمای فنی PE100 مرجع بعدی هستند.",
    },
  ],
  related: {
    products: ["pe100-pipe", "water-supply-pipe", "gas-pipe"],
    articles: ["pe100-technical-guide", "polyethylene-pipe-specifications"],
  },
  faqs: [
    {
      question: "آیا PE100 همیشه گران‌تر از PE80 است؟",
      answer:
        "قیمت به قطر، SDR، PN و متراژ بستگی دارد. برای استعلام دقیق با واحد فروش تماس بگیرید.",
    },
  ],
  curatedLinks: [
    { label: "لوله پلی اتیلن PE100", path: seoLandingPaths.pe100 },
    { label: "راهنمای فنی PE100", path: seoLandingPaths.pe100Guide },
    { label: "مشخصات فنی لوله", path: "/technical-center/polyethylene-pipe-specifications" },
  ],
};

export const faPolyethylenePipeSpecificationsSeed: SeoArticleSeed = {
  slug: "polyethylene-pipe-specifications",
  title: "مشخصات فنی لوله پلی اتیلن",
  seoTitle: "مشخصات فنی لوله پلی اتیلن | SDR، PN، قطر | بوکان پایپ",
  seoDescription:
    "مشخصات فنی لوله پلی اتیلن: قطر خارجی، SDR، PN، گرید PE و جدول انتخاب — راهنمای خرید صنعتی.",
  description: "پارامترهای فنی کلیدی برای انتخاب و سفارش لوله PE.",
  primaryKeyword: "مشخصات فنی لوله پلی اتیلن",
  secondaryKeywords: ["SDR لوله پلی اتیلن", "PN لوله پلی اتیلن", "جدول قطر لوله PE"],
  definition:
    "مشخصات فنی لوله پلی اتیلن مجموعه پارامترهای طراحی و تولید است — قطر خارجی، ضخامت جداره (SDR)، کلاس فشار (PN)، گرید ماده و استاندارد — که انتخاب صحیح برای هر پروژه را ممکن می‌کند.",
  sections: [
    {
      type: "spec-table",
      title: "پارامترهای رایج در برگه مشخصات",
      rows: [
        { label: "قطر خارجی (OD)", value: "میلی‌متر یا اینچ — تا ۶۳۰ mm در بوکان پایپ" },
        { label: "SDR", value: "نسبت قطر خارجی به ضخامت جداره" },
        { label: "PN", value: "فشار اسمی درج‌شده — مرجع ۲۰ °C" },
        { label: "گرید ماده", value: "PE80 یا PE100" },
        { label: "وزن واحد طول", value: "کیلوگرم بر متر — وابسته به SDR و OD" },
      ],
      note: "جدول کامل قطر/SDR/PN/وزن برای هر پروژه از واحد فروش صادر می‌شود.",
    },
    { type: "heading", level: 2, text: "چگونه مشخصات را سفارش دهیم؟" },
    {
      type: "list",
      items: [
        "کاربرد (آب، گاز، آبیاری، صنعت)",
        "فشار طراحی و دمای کاربرد",
        "استاندارد پروژه (INSO، EN و …)",
        "متراژ و محل تحویل",
      ],
    },
  ],
  related: {
    products: ["water-supply-pipe", "pe100-pipe", "gas-pipe"],
    articles: ["pe100-technical-guide", "polyethylene-pipe-standards"],
    laboratory: ["test-scope"],
  },
  faqs: [
    {
      question: "آیا مشخصات فنی روی بدنه لوله درج می‌شود؟",
      answer: "PN و مشخصات شناسایی تولید معمولاً روی لوله آبرسانی درج می‌شود. جزئیات مطابق استاندارد پروژه است.",
    },
    {
      question: "چگونه پیش‌فاکتور با مشخصات فنی بگیریم؟",
      answer: "فرم استعلام قیمت را تکمیل کنید یا با واحد فروش تماس بگیرید.",
    },
  ],
  curatedLinks: [
    { label: "استعلام قیمت", path: "/request-quote" },
    { label: "لوله پلی اتیلن آبرسانی", path: seoLandingPaths.water },
    { label: "استاندارد لوله پلی اتیلن", path: "/technical-center/polyethylene-pipe-standards" },
  ],
};

export const faPolyethylenePipeStandardsSeed: SeoArticleSeed = {
  slug: "polyethylene-pipe-standards",
  title: "استاندارد لوله پلی اتیلن",
  seoTitle: "استاندارد لوله پلی اتیلن | INSO، EN و کاربرد | بوکان پایپ",
  seoDescription:
    "استاندارد لوله پلی اتیلن در ایران: INSO 14427-2 آبرسانی، INSO 11233 گاز، EN 1555 — راهنمای انطباق پروژه.",
  description: "مرور استانداردهای رایج تولید و پذیرش لوله PE در پروژه‌های داخلی.",
  primaryKeyword: "استاندارد لوله پلی اتیلن",
  secondaryKeywords: ["INSO 14427", "INSO 11233", "EN 1555", "IGS-M-PL-014-1"],
  definition:
    "استاندارد لوله پلی اتیلن چارچوب فنی تولید، آزمون و پذیرش لوله PE در پروژه است — هر کاربرد (آب، گاز، فاضلاب) استاندارد مخصوص خود را دارد.",
  sections: [
    {
      type: "spec-table",
      title: "استانداردهای متداول به تفکیک کاربرد",
      rows: [
        { label: "آبرسانی", value: "INSO 14427-2 (پروژه‌های واجد شرایط)" },
        { label: "گازرسانی", value: "INSO 11233، EN 1555، IGS-M-PL-014-1" },
        { label: "جوش", value: "INSO 18648 (butt fusion)" },
        { label: "فشار و دما", value: "INSO 14563-1، INSO 14427 (MOP و fT)" },
      ],
    },
    { type: "heading", level: 2, text: "انطباق در پروژه" },
    {
      type: "paragraph",
      text: "مهندس ناظر و کارفرما استاندارد مبنا را در مشخصات فنی (MTS) تعیین می‌کنند. تولیدکننده باید توانایی تولید مطابق آن استاندارد را برای سفارش مشخص اثبات کند — بوکان پایپ برای پروژه‌های واجد شرایط آبرسانی و گاز تولید می‌کند.",
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe"],
    articles: ["polyethylene-pipe-specifications", "polyethylene-pipe-welding"],
    laboratory: ["test-scope", "iso-17025"],
  },
  faqs: [
    {
      question: "آیا همه لوله‌های PE یک استاندارد دارند؟",
      answer: "خیر. استاندارد به کاربرد (آب، گاز، فاضلاب) و مشخصات پروژه وابسته است.",
    },
  ],
  curatedLinks: [
    { label: "لوله پلی اتیلن آبرسانی", path: seoLandingPaths.water },
    { label: "لوله پلی اتیلن گاز", path: seoLandingPaths.gas },
    { label: "آزمایشگاه و QC", path: "/laboratory/test-scope" },
  ],
};
