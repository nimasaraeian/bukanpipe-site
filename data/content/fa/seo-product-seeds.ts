import type { SeoProductSeed } from "@/lib/content/seo-content-model";
import {
  baseProductSpecRows,
  seoLandingPaths,
  seoProductHeroImages,
} from "@/lib/content/seo-content-model";

export const faSeoProductSeeds: readonly SeoProductSeed[] = [
  {
    id: "product-water-supply-pipe",
    slug: "water-supply-pipe",
    title: "لوله پلی اتیلن آبرسانی",
    seoTitle: "لوله پلی اتیلن آبرسانی | تولید کارخانه تا ۶۳۰ میل | بوکان پایپ",
    seoDescription:
      "لوله پلی اتیلن آبرسانی و انتقال آب — تولید HDPE تک‌جداره تا قطر ۶۳۰ میلی‌متر. خرید مستقیم از کارخانه بوکان پایپ؛ INSO 14427-2.",
    description:
      "لوله پلی‌اتیلن برای شبکه آب شرب، انتقال آب شهری و روستایی — تولید کارخانه، مناسب جوش و بدون خوردگی.",
    primaryKeyword: "لوله پلی اتیلن آبرسانی",
    secondaryKeywords: [
      "لوله انتقال آب پلی اتیلن",
      "لوله HDPE آبرسانی",
      "تولید کننده لوله HDPE",
      "INSO 14427-2",
    ],
    definition:
      "لوله HDPE آبرسانی، لوله فشار پلی‌اتیلن با چگالی بالا (PE) تک‌جداره است که برای انتقال آب شرب، خام و تصفیه‌شده در شبکه‌های دفنی یا روی زمین به کار می‌رود.",
    overview:
      "بوکان پایپ لوله HDPE آبرسانی را تا قطر خارجی ۶۳۰ میلی‌متر (۲۵ اینچ) در کلاس‌های مختلف SDR و PN تولید می‌کند. برای پروژه‌های آبرسانی واجد شرایط، تولید مطابق INSO 14427-2 با درج PN روی بدنه لوله در دمای مرجع ۲۰ درجه انجام می‌شود.",
    specifications: baseProductSpecRows("fa", [
      { label: "گرید ماده", value: "PE100 / PE80 مطابق مشخصات پروژه" },
      { label: "درج فشار", value: "PN در ۲۰ °C (ضریب دما در محل اعمال شود)" },
      { label: "استاندارد متداول", value: "INSO 14427-2 برای تولید آبرسانی واجد شرایط" },
      { label: "اتصال", value: "جوش لب به لب و الکتروفیوژن (مطابق پروژه)" },
    ]),
    specNote: "جدول قطر، SDR، PN و وزن واحد طول برای هر پروژه صادر می‌شود.",
    advantages: [
      "عمر مفید بدون خوردگی در دفن",
      "سطح داخلی صاف برای طراحی هیدرولیک",
      "نصب سریع‌تر از لوله فلزی با butt fusion",
      "وزن کمتر برای پروژه‌های شهری و روستایی",
    ],
    applications: [
      "شبکه آب شرب شهری و روستایی",
      "خطوط اصلی آب خام، تصفیه‌شده و فشار قوی کشاورزی",
      "انتقال آب صنعتی و تغذیه فرآیند",
    ],
    standardsNote:
      "PN روی لوله برای ۲۰ °C است. در دمای بالاتر، ضریب دما (MOP) باید اعمال شود — مقاله MOP در مرکز فنی.",
    qualityNote: "کنترل مواد ورودی، ابعاد در خط تولید و آزمون‌های مکانیکی در آزمایشگاه.",
    relatedProducts: ["pe100-pipe", "irrigation-pipe", "industrial-pipe"],
    relatedApplications: ["water-transfer"],
    relatedArticles: [
      "pe100-technical-guide",
      "hdpe-installation-guide",
      "polyethylene-pipe-temperature-pressure",
      "air-vent-valve",
    ],
    curatedLinks: [
      { label: "راهنمای فنی PE100", path: seoLandingPaths.pe100Guide, hint: "MRS، SDR و PN" },
      { label: "راهنمای نصب HDPE", path: seoLandingPaths.installGuide },
      { label: "کاربرد انتقال آب", path: "/applications/water-transfer" },
      { label: "دمای کاربرد و MOP", path: seoLandingPaths.temperature },
    ],
    references: ["https://bukanpipe.com/about_us/", "https://bukanpipe.com/temp-cooficient/"],
    faqs: [
      {
        question: "آیا PN روی لوله همان فشار کار در محل است؟",
        answer:
          "خیر. PN در دمای مرجع ۲۰ °C تعریف شده است. حداکثر فشار کاری (MOP) باید با ضریب دما و ضرایب عملیاتی مهندس پروژه محاسبه شود.",
      },
      {
        question: "حداکثر قطر لوله آبرسانی از کارخانه بوکان پایپ چقدر است؟",
        answer: "لوله پلی اتیلن آبرسانی تک‌جداره تا قطر خارجی ۶۳۰ میلی‌متر (۲۵ اینچ) تولید می‌شود.",
      },
      {
        question: "چگونه لوله پلی اتیلن آبرسانی را مستقیم از کارخانه سفارش دهیم؟",
        answer:
          "از طریق فرم استعلام قیمت یا تماس با واحد فروش، قطر، SDR، PN و متراژ پروژه را اعلام کنید تا پیش‌فاکتور صادر شود.",
      },
    ],
    heroImage: {
      ...seoProductHeroImages.water,
      alt: "لوله پلی اتیلن آبرسانی BUKAN PIPE — تولید کارخانه HDPE",
      title: "لوله پلی اتیلن آبرسانی",
    },
  },
  {
    id: "product-gas-pipe",
    slug: "gas-pipe",
    title: "لوله پلی اتیلن گاز",
    seoTitle: "لوله پلی اتیلن گاز | تولید کارخانه گازرسانی | بوکان پایپ",
    seoDescription:
      "لوله پلی اتیلن گاز و گازرسانی برای شبکه شهری و روستایی. تولید HDPE مطابق INSO 11233 و EN 1555 — خرید از کارخانه.",
    description:
      "لوله پلی اتیلن گازرسانی برای انشعاب و توزیع — تولید کارخانه، مقاوم در برابر خوردگی و مناسب الکتروفیوژن.",
    primaryKeyword: "لوله پلی اتیلن گاز",
    secondaryKeywords: [
      "لوله گازرسانی پلی اتیلن",
      "لوله PE گاز",
      "تولید کننده لوله HDPE",
      "INSO 11233",
    ],
    definition:
      "لوله HDPE گازرسانی، لوله فشار پلی‌اتیلن برای توزیع گاز طبیعی فشار پایین و متوسط و انشعابات است که در ایران عمدتاً با الکتروفیوژن متصل می‌شود.",
    overview:
      "در شبکه گاز، خطوط اصلی انتقال معمولاً فولادی هستند؛ برای انشعاب شهری و روستایی از لوله HDPE استفاده می‌شود. بوکان پایپ لوله گازرسانی را مطابق EN 1555، INSO 11233 و IGS-M-PL-014-1 تولید می‌کند.",
    specifications: baseProductSpecRows("fa", [
      { label: "گرید ماده", value: "PE100 / PE80 مطابق مشخصات شرکت گاز" },
      { label: "استانداردهای متداول", value: "EN 1555، INSO 11233، IGS-M-PL-014-1" },
      { label: "اتصال تأییدشده (ایران)", value: "الکتروفیوژن برای شبکه توزیع گاز" },
    ]),
    advantages: [
      "اتصال جوشی با استحکام هم‌تراز بدنه لوله در اجرای صحیح",
      "انعطاف و کاهش تعداد اتصالات در مسیر",
      "مقاومت در برابر خوردگی و سایش در خاک",
      "تحمل بهتر جابه‌جایی خاک نسبت به لوله فلزی",
    ],
    applications: [
      "انشعاب و توزیع گاز شهری و روستایی",
      "شبکه‌های فشار پایین و متوسط",
      "خطوط با اتصال الکتروفیوژن",
    ],
    standardsNote: "کلاس فشار، SDR و نوع اتصال باید با نقشه مهندسی و الزامات شرکت گاز هماهنگ باشد.",
    qualityNote: "کنترل کیفیت تولید و آزمون‌های مرتبط در QC و آزمایشگاه.",
    relatedProducts: ["pe100-pipe", "water-supply-pipe"],
    relatedApplications: ["gas-distribution"],
    relatedArticles: ["hdpe-installation-guide", "polyethylene-pipe-welding", "polyethylene-pipe-temperature-pressure"],
    curatedLinks: [
      { label: "راهنمای نصب HDPE", path: seoLandingPaths.installGuide },
      { label: "راهنمای جوش لوله PE", path: seoLandingPaths.welding },
      { label: "کاربرد گازرسانی", path: "/applications/gas-distribution" },
      { label: "راهنمای فنی PE100", path: seoLandingPaths.pe100Guide },
    ],
    references: ["https://bukanpipe.com/gas-pipe/"],
    faqs: [
      {
        question: "برای شبکه گاز شهری از چه روش اتصالی استفاده می‌شود؟",
        answer: "جوش الکتروفیوژن روش مورد تأیید شرکت ملی گاز است.",
      },
      {
        question: "لوله گاز در سرمای شدید دچار شکنندگی می‌شود؟",
        answer: "پلی‌اتیلن در سرمای معمول منطقه حالت الاستیک حفظ می‌کند.",
      },
      {
        question: "لوله گازرسانی پلی اتیلن را از کجا بخریم؟",
        answer:
          "بوکان پایپ تولیدکننده لوله گازرسانی است. برای پروژه مشخص، مشخصات فنی و پیش‌فاکتور را از واحد فروش دریافت کنید.",
      },
    ],
    heroImage: {
      ...seoProductHeroImages.gas,
      alt: "لوله پلی اتیلن گاز — تولید کارخانه بوکان پایپ",
      title: "لوله پلی اتیلن گاز",
    },
  },
  {
    id: "product-irrigation-pipe",
    slug: "irrigation-pipe",
    title: "لوله آبیاری پلی اتیلن",
    seoTitle: "لوله آبیاری پلی اتیلن | لوله کشاورزی HDPE | بوکان پایپ",
    seoDescription:
      "لوله آبیاری پلی اتیلن و لوله پلی اتیلن کشاورزی برای خطوط اصلی فشار قوی — تولید کارخانه تا ۶۳۰ میلی‌متر.",
    description: "لوله پلی اتیلن کشاورزی برای خطوط اصلی آبیاری فشار قوی و شبکه مزرعه.",
    primaryKeyword: "لوله آبیاری پلی اتیلن",
    secondaryKeywords: [
      "لوله پلی اتیلن کشاورزی",
      "لوله HDPE آبیاری",
      "خط اصلی آبیاری",
    ],
    definition:
      "لوله HDPE آبیاری، لوله فشار پلی‌اتیلن برای خطوط اصلی بین منبع آب، پمپ و شبکه آبیاری میدان شامل قطره‌ای و بارانی است.",
    overview:
      "در کشاورزی، HDPE خطوط اصلی فشار قوی بین چاه، پمپ‌خانه و شبکه آبیاری را تشکیل می‌دهد. بوکان پایپ تا قطر ۶۳۰ میلی‌متر برای آبیاری فشار قوی تولید می‌کند.",
    specifications: baseProductSpecRows("fa", [
      { label: "کاربرد متداول", value: "خطوط اصلی آبیاری فشار قوی" },
      { label: "کلاس فشار", value: "PN مطابق طراحی هیدرولیک" },
      { label: "اتصال", value: "butt fusion برای خطوط اصلی" },
    ]),
    advantages: [
      "تحمل چرخه روشن/خاموش پمپ",
      "مسیریابی انعطاف‌پذیر در زمین کشاورزی",
      "تعمیر و توسعه سریع‌تر از لوله‌های سخت",
      "مقاومت در برابر خوردگی آب آبیاری",
    ],
    applications: [
      "خطوط اصلی آبیاری فشار قوی",
      "انتقال آب از چاه به مخزن و هدر میدان",
      "تغذیه شبکه قطره‌ای و بارانی",
    ],
    standardsNote: "برای آبیاری زیرسطحی، مقاله مرکز فنی و مهندس پروژه را ببینید.",
    qualityNote: "آزمون فشار و ابعاد در QC.",
    relatedProducts: ["water-supply-pipe"],
    relatedApplications: ["agriculture-irrigation"],
    relatedArticles: ["subsurface-drip-irrigation", "hdpe-installation-guide"],
    curatedLinks: [
      { label: "کاربرد کشاورزی و آبیاری", path: "/applications/agriculture-irrigation" },
      { label: "لوله HDPE آبرسانی", path: seoLandingPaths.water },
      { label: "راهنمای نصب HDPE", path: seoLandingPaths.installGuide },
    ],
    faqs: [
      {
        question: "آیا همان لوله برای آبیاری و آب شرب قابل استفاده است؟",
        answer: "استاندارد تولید مطابق مشخصات پروژه تعیین می‌شود — با واحد فروش هماهنگ کنید.",
      },
    ],
    heroImage: {
      ...seoProductHeroImages.irrigation,
      alt: "لوله HDPE آبیاری برای خطوط اصلی فشار قوی کشاورزی",
      title: "لوله HDPE آبیاری",
    },
  },
  {
    id: "product-industrial-pipe",
    slug: "industrial-pipe",
    title: "لوله پلی اتیلن صنعتی",
    seoTitle: "لوله پلی اتیلن صنعتی | لوله HDPE فرآیند | بوکان پایپ",
    seoDescription:
      "لوله پلی اتیلن صنعتی و HDPE برای انتقال آب فرآیند، دوغاب و سیالات سازگار — تولید کارخانه PE100.",
    description:
      "لوله HDPE صنعتی برای انتقال سیالات فرآیندی در کارخانه، معدن و تأسیسات.",
    primaryKeyword: "لوله پلی اتیلن صنعتی",
    secondaryKeywords: [
      "لوله HDPE صنعتی",
      "لوله فرآیند پلی اتیلن",
      "تولید کننده لوله PE100",
    ],
    definition:
      "لوله HDPE صنعتی، خط فشار یا ثقلی پلی‌اتیلن در کارخانه، معدن و تأسیسات برای انتقال آب فرآیند، خنک‌کننده، دوغاب و سیالات سازگار است.",
    overview:
      "HDPE در پروژه‌های صنعتی به‌دلیل مقاومت شیمیایی، یکپارچگی اتصال و دوام در خاک خورنده انتخاب می‌شود. بوکان پایپ لوله HDPE صنعتی را تا قطر ۶۳۰ میلی‌متر تولید می‌کند.",
    specifications: baseProductSpecRows("fa", [
      { label: "گرید ماده", value: "PE100 / PE80 مطابق مشخصات فرآیند" },
      { label: "سازگاری شیمیایی", value: "وابسته به پروژه — با مهندس فرآیند تأیید شود" },
      { label: "اتصال", value: "butt fusion؛ الکتروفیوژن در دسترسی محدود" },
    ]),
    advantages: [
      "مقاومت خوردگی در خاک و بسیاری از سیالات صنعتی",
      "اتصالات جوشی با نشتی کم",
      "مقاومت سایشی برای دوغاب",
      "وزن کمتر از فولاد در سایت‌های دورافتاده",
    ],
    applications: [
      "خطوط آب فرآیند و خنک‌کننده کارخانه",
      "انتقال دوغاب معدن",
      "شبکه پساب و سیالات سازگار",
    ],
    standardsNote: "سازگاری سیال، فشار و دما باید با مهندس فرآیند تأیید شود.",
    qualityNote: "QC ابعادی و مکانیکی مشابه سایر خانواده‌های PE.",
    relatedProducts: ["pe100-pipe", "water-supply-pipe"],
    relatedApplications: ["industrial"],
    relatedArticles: ["pe100-technical-guide", "hdpe-installation-guide", "polyethylene-pipe-temperature-pressure"],
    curatedLinks: [
      { label: "کاربرد صنعتی", path: "/applications/industrial" },
      { label: "راهنمای فنی PE100", path: seoLandingPaths.pe100Guide },
      { label: "لوله HDPE آبرسانی", path: seoLandingPaths.water },
      { label: "راهنمای نصب HDPE", path: seoLandingPaths.installGuide },
    ],
    faqs: [
      {
        question: "آیا HDPE برای همه مواد شیمیایی مناسب است؟",
        answer: "خیر. سازگاری به غلظت، دما و زمان تماس بستگی دارد.",
      },
    ],
    heroImage: {
      ...seoProductHeroImages.industrial,
      alt: "لوله HDPE صنعتی برای شبکه انتقال سیالات فرآیندی",
      title: "لوله HDPE صنعتی",
    },
  },
  {
    id: "product-pe100-pipe",
    slug: "pe100-pipe",
    title: "لوله پلی اتیلن PE100",
    seoTitle: "لوله پلی اتیلن PE100 | تولید کننده PE100 | بوکان پایپ",
    seoDescription:
      "لوله پلی اتیلن PE100 با MRS بالاتر — تولید کارخانه HDPE برای فشار بیشتر یا جداره نازک‌تر. استعلام قیمت پروژه.",
    description: "لوله PE100 تولید کارخانه برای طراحی فشار بالاتر در همان SDR.",
    primaryKeyword: "لوله پلی اتیلن PE100",
    secondaryKeywords: [
      "تولید کننده لوله PE100",
      "لوله HDPE PE100",
      "لوله فشار PE100",
    ],
    definition:
      "لوله PE100 از ترکیب پلی‌اتیلن با حداقل استحکام مورد نیاز (MRS) ۱۰ مگاپاسکال است — فشار یا جداره بهتری نسبت به PE80 در همان SDR.",
    overview:
      "PE100 گرید بالاتر از PE80 است: در همان SDR جداره نازک‌تر یا فشار بالاتر امکان‌پذیر است. بوکان پایپ لوله PE100 را برای آب، گاز و صنعت تولید می‌کند.",
    specifications: baseProductSpecRows("fa", [
      { label: "MRS", value: "۱۰ مگاپاسکال (گرید PE100)" },
      { label: "مزیت طراحی", value: "PN بالاتر یا جداره نازک‌تر نسبت به PE80" },
    ]),
    advantages: [
      "MRS بالاتر — قطر کمتر یا فشار بیشتر",
      "عملکرد بلندمدت در شبکه‌های دفنی",
      "INSO 14427-2 برای آبرسانی واجد شرایط",
    ],
    applications: [
      "قطعات آبرسانی فشار بالاتر",
      "انتقال صنعتی با مشخصات PE100",
      "گازرسانی با گرید PE100",
    ],
    standardsNote: "برای خلا و فشار منفی، شیر هوا و مهاربندی لازم است.",
    qualityNote: "آزمون‌های مکانیکی و حرارتی در آزمایشگاه.",
    relatedProducts: ["water-supply-pipe", "gas-pipe", "industrial-pipe"],
    relatedApplications: ["water-transfer", "industrial", "gas-distribution"],
    relatedArticles: ["pe100-technical-guide", "polyethylene-pipe-temperature-pressure", "air-vent-valve"],
    curatedLinks: [
      { label: "راهنمای فنی PE100", path: seoLandingPaths.pe100Guide },
      { label: "راهنمای لوله پلی‌اتیلن", path: seoLandingPaths.pillar },
      { label: "لوله HDPE آبرسانی", path: seoLandingPaths.water },
    ],
    faqs: [
      {
        question: "آیا PE100 همیشه جایگزین PE80 می‌شود؟",
        answer: "گرید ماده مطابق مشخصات پروژه و طراحی مهندس انتخاب می‌شود.",
      },
    ],
    heroImage: {
      ...seoProductHeroImages.pe100,
      alt: "لوله PE100 HDPE — گرید MRS بالاتر",
      title: "لوله PE100",
    },
  },
  {
    id: "product-sewage-pipe",
    slug: "sewage-pipe",
    title: "لوله فاضلاب HDPE",
    seoTitle: "لوله فاضلاب HDPE | لوله پلی اتیلن فاضلاب | بوکان پایپ",
    seoDescription: "لوله HDPE برای جمع‌آوری فاضلاب شهری و صنعتی.",
    description: "لوله پلی‌اتیلن برای شبکه فاضلاب شهری و صنعتی.",
    primaryKeyword: "لوله فاضلاب HDPE",
    secondaryKeywords: ["لوله فاضلاب پلی اتیلن", "لوله PE فاضلاب"],
    definition: "لوله فاضلاب HDPE برای جمع‌آوری فاضلاب بهداشتی در شبکه ثقلی یا فشار پایین.",
    overview: "HDPE به‌دلیل مقاومت شیمیایی و دوام در خاک مرطوب برای فاضلاب رایج است.",
    specifications: baseProductSpecRows("fa", [{ label: "کاربرد", value: "جمع‌آوری فاضلاب بهداشتی" }]),
    advantages: ["مقاومت در برابر فاضلاب", "اتصالات جوشی", "دوام در خاک مرطوب", "وزن کم"],
    applications: ["شبکه فاضلاب شهری", "فاضلاب صنعتی", "اتصال ساختمان"],
    standardsNote: "شیب و قطر مطابق طراحی فاضلاب.",
    qualityNote: "آزمون ابعادی و مکانیکی در QC.",
    relatedProducts: ["drainage-pipe"],
    relatedApplications: ["sewage"],
    relatedArticles: ["hdpe-installation-guide"],
    curatedLinks: [
      { label: "کاربرد فاضلاب", path: "/applications/sewage" },
      { label: "راهنمای نصب HDPE", path: seoLandingPaths.installGuide },
    ],
    faqs: [],
    heroImage: {
      ...seoProductHeroImages.sewer,
      alt: "لوله فاضلاب HDPE برای شبکه جمع‌آوری",
      title: "لوله فاضلاب HDPE",
    },
  },
  {
    id: "product-drainage-pipe",
    slug: "drainage-pipe",
    title: "لوله زهکشی HDPE",
    seoTitle: "لوله زهکشی HDPE | زهکشی سطحی پلی اتیلن | بوکان پایپ",
    seoDescription: "لوله HDPE برای آب باران و زهکشی سطحی — نه فاضلاب بهداشتی.",
    description: "لوله پلی‌اتیلن برای آب باران و زهکشی.",
    primaryKeyword: "لوله زهکشی HDPE",
    secondaryKeywords: ["لوله زهکشی پلی اتیلن", "آب باران PE"],
    definition: "لوله زهکشی HDPE برای آب باران و رواناب سطحی — متمایز از فاضلاب بهداشتی.",
    overview: "زهکشی برای رواناب سطحی است. HDPE ظرفیت هیدرولیک و انعطاف برای این شبکه‌ها دارد.",
    specifications: baseProductSpecRows("fa", [{ label: "کاربرد", value: "آب باران و زهکشی سطحی" }]),
    advantages: ["سطح صاف", "نصب سریع", "انعطاف در مسیر", "دوام در خاک"],
    applications: ["زهکشی راه و کارگاه", "آب باران مزرعه", "شبکه مکمل"],
    standardsNote: "قطر و شیب مطابق طراحی هیدرولیک.",
    qualityNote: "QC مشابه سایر لوله‌های PE.",
    relatedProducts: ["sewage-pipe"],
    relatedApplications: ["drainage"],
    relatedArticles: [],
    curatedLinks: [
      { label: "کاربرد زهکشی", path: "/applications/drainage" },
      { label: "لوله فاضلاب HDPE", path: "/products/sewage-pipe" },
    ],
    faqs: [],
    heroImage: {
      ...seoProductHeroImages.drainage,
      alt: "لوله زهکشی HDPE برای آب باران",
      title: "لوله زهکشی HDPE",
    },
  },
];
