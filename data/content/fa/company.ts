import type { ContentDocument } from "@/content/models/content-document";

export const faAbout: ContentDocument = {
  id: "about",
  slug: "about",
  path: "/about",
  locale: "fa",
  kind: "company",
  title: "کارخانه تولید لوله پلی اتیلن بوکان پایپ",
  seoTitle: "تولید کننده لوله پلی اتیلن | کارخانه HDPE و PE100 | بوکان پایپ",
  seoDescription:
    "بوکان پایپ — تولیدکننده و تأمین‌کننده لوله پلی اتیلن تک‌جداره HDPE و PE100 تا قطر ۶۳۰ میلی‌متر. خرید مستقیم از کارخانه در بوکان، آذربایجان غربی.",
  description: "کارخانه تولید لوله پلی اتیلن با سابقه از ۱۳۷۶ — آبرسانی، گاز، کشاورزی و صنعت.",
  primaryKeyword: "تولید کننده لوله پلی اتیلن",
  secondaryKeywords: [
    "کارخانه تولید لوله پلی اتیلن",
    "تولید کننده لوله HDPE",
    "تامین کننده لوله پلی اتیلن",
    "خرید لوله پلی اتیلن از کارخانه",
  ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-05",
  references: ["https://bukanpipe.com/about_us/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "درباره ما", path: "/about" },
  ],
  sections: [
    {
      type: "definition",
      term: "بوکان پایپ چه تولید می‌کند؟",
      text: "بوکان پایپ تولیدکننده لوله پلی اتیلن (HDPE) تک‌جداره است — از گرید PE80 و PE100 — برای شبکه‌های آبرسانی، گازرسانی، آبیاری کشاورزی، فاضلاب، زهکشی و خطوط صنعتی.",
    },
    {
      type: "paragraph",
      text: "از سال ۱۳۷۶ در بوکان، آذربایجان غربی، لوله‌های پلی اتیلن را تا قطر خارجی ۶۳۰ میلی‌متر (۲۵ اینچ) در ضخامت و کلاس‌های فشار متنوع تولید می‌کنیم. به‌عنوان تأمین‌کننده لوله پلی اتیلن، مستقیم از کارخانه به پیمانکاران، مهندسان مشاور و کارفرمایان پروژه‌های زیرساختی عرضه می‌شود.",
    },
    {
      type: "heading",
      level: 2,
      text: "ظرفیت و دامنه تولید",
    },
    {
      type: "list",
      items: [
        "اکستروژن تک‌جداره HDPE — حداکثر قطر خارجی ۶۳۰ میلی‌متر",
        "آبرسانی (INSO 14427-2 برای پروژه‌های واجد شرایط)",
        "گازرسانی (INSO 11233، EN 1555)",
        "آبیاری فشار قوی و خطوط کشاورزی",
        "فاضلاب، زهکشی و انتقال سیالات صنعتی",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "چرا خرید از کارخانه؟",
    },
    {
      type: "list",
      items: [
        "ردیابی batch و QC در خط تولید و آزمایشگاه",
        "مشخصات فنی شفاف — قطر، SDR، PN مطابق پروژه",
        "پشتیبانی فنی از مرکز فنی و واحد فروش",
        "تحویل پروژه‌ای در سراسر کشور",
      ],
    },
    {
      type: "internal-links",
      title: "مسیر خرید و محصولات",
      links: [
        { label: "محصولات لوله پلی اتیلن", path: "/products", hint: "آبرسانی، گاز، آبیاری، صنعت" },
        { label: "استعلام قیمت لوله", path: "/request-quote", hint: "پیش‌فاکتور پروژه" },
        { label: "لوله پلی اتیلن PE100", path: "/products/pe100-pipe" },
        { label: "مرکز فنی", path: "/technical-center", hint: "SDR، PN، جوش" },
        { label: "راهکارهای پروژه", path: "/solutions" },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "موقعیت کارخانه",
    },
    {
      type: "paragraph",
      text: "آذربایجان غربی — بوکان، کیلومتر ۱۰ جاده میاندواب. کدپستی: ۵۹۵۵۱۶۴۳۴۱.",
    },
  ],
  faqs: [
    {
      question: "آیا امکان خرید لوله پلی اتیلن مستقیم از کارخانه وجود دارد؟",
      answer:
        "بله. سفارش‌ها از طریق واحد فروش و فرم استعلام قیمت پذیرفته می‌شود. مشخصات پروژه (قطر، SDR، PN، متراژ) را اعلام کنید.",
    },
    {
      question: "بوکان پایپ چه نوع لوله HDPE تولید می‌کند؟",
      answer:
        "لوله پلی اتیلن تک‌جداره برای آبرسانی، گاز، آبیاری، فاضلاب، زهکشی و صنعت — تا قطر ۶۳۰ میلی‌متر.",
    },
    {
      question: "قیمت لوله پلی اتیلن چگونه محاسبه می‌شود؟",
      answer:
        "قیمت به قطر، SDR، PN، گرید ماده (PE80/PE100)، متراژ و شرایط تحویل بستگی دارد. برای قیمت روز، استعلام بگیرید.",
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe", "pe100-pipe"],
    articles: ["polyethylene-pipe-specifications", "pe100-technical-guide"],
    laboratory: ["services"],
  },
};

export const faQuality: ContentDocument = {
  id: "quality",
  slug: "quality",
  path: "/quality",
  locale: "fa",
  kind: "company",
  title: "کنترل کیفیت تولید لوله پلی اتیلن",
  seoTitle: "کنترل کیفیت لوله پلی اتیلن | QC کارخانه | بوکان پایپ",
  seoDescription: "فرآیند کنترل کیفیت تولید لوله HDPE در خط اکستروژن و آزمایشگاه بوکان پایپ.",
  description: "سیاست و فرآیند QC تولیدکننده لوله پلی اتیلن.",
  primaryKeyword: "کنترل کیفیت لوله پلی اتیلن",
  secondaryKeywords: ["QC لوله PE", "آزمون لوله HDPE", "تولید کننده لوله پلی اتیلن"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-05",
  references: ["https://bukanpipe.com/quality-policy/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "کیفیت", path: "/quality" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "کیفیت محصول در بوکان پایپ بر پایه کنترل مواد اولیه، پایش فرآیند اکستروژن، بازرسی ابعادی و آزمون‌های نهایی در واحد QC و آزمایشگاه استوار است — به‌عنوان تولیدکننده لوله پلی اتیلن، ردیابی batch برای پروژه‌های حساس امکان‌پذیر است.",
    },
    { type: "heading", level: 2, text: "مراحل کنترل" },
    {
      type: "list",
      items: [
        "کنترل مواد اولیه و ورودی تولید",
        "بازرسی در حین تولید (ابعاد، ظاهر، یکنواختی)",
        "آزمون‌های مکانیکی، حرارتی و فشار در آزمایشگاه",
        "ردیابی batch و مستندسازی نتایج",
      ],
    },
    {
      type: "internal-links",
      title: "منابع مرتبط",
      links: [
        { label: "آزمایشگاه", path: "/laboratory" },
        { label: "مشخصات فنی لوله", path: "/technical-center/polyethylene-pipe-specifications" },
        { label: "کارخانه تولید", path: "/about" },
      ],
    },
  ],
  related: { laboratory: ["services", "test-scope", "iso-17025"], products: ["pe100-pipe"] },
};

export const faCertifications: ContentDocument = {
  id: "certifications",
  slug: "certifications",
  path: "/certifications",
  locale: "fa",
  kind: "company",
  title: "گواهی‌ها و افتخارات",
  seoTitle: "گواهی‌ها و استاندارد لوله پلی اتیلن | بوکان پایپ",
  seoDescription: "گواهی‌ها و افتخارات کارخانه تولید لوله پلی اتیلن بوکان پایپ.",
  description: "گواهی‌ها و افتخارات.",
  primaryKeyword: "گواهی لوله پلی اتیلن",
  secondaryKeywords: ["استاندارد لوله پلی اتیلن", "واحد نمونه"],
  status: "published",
  evidenceStatus: "requires-verification",
  verificationStatus: "verify-before-production",
  lastReviewed: "2026-09-05",
  references: ["https://bukanpipe.com/about_us/", "https://bukanpipe.com/certificates/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "گواهی‌ها", path: "/certifications" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "در معرفی شرکت، بوکان پایپ به دریافت عنوان واحد نمونه از سازمان صنعت، معدن و تجارت و رتبه A در میان تولیدکنندگان لوله پلی‌اتیلن از سازمان جهاد کشاورزی اشاره کرده است. نسخه PDF هر گواهی پس از تأیید QC در این صفحه قرار می‌گیرد.",
    },
    {
      type: "internal-links",
      title: "استاندارد و انطباق",
      links: [
        { label: "استاندارد لوله پلی اتیلن", path: "/technical-center/polyethylene-pipe-standards" },
        { label: "ISO 17025", path: "/laboratory/iso-17025" },
      ],
    },
  ],
  related: { laboratory: ["iso-17025"], articles: ["polyethylene-pipe-standards"] },
};

export const faContact: ContentDocument = {
  id: "contact",
  slug: "contact",
  path: "/contact",
  locale: "fa",
  kind: "company",
  title: "تماس با کارخانه",
  seoTitle: "تماس با تولید کننده لوله پلی اتیلن | بوکان پایپ",
  seoDescription:
    "تماس با کارخانه تولید لوله پلی اتیلن بوکان پایپ — فروش، QC و آدرس بوکان.",
  description: "راه‌های تماس با کارخانه و واحد فروش.",
  primaryKeyword: "تماس بوکان پایپ",
  secondaryKeywords: ["آدرس کارخانه لوله پلی اتیلن", "خرید لوله پلی اتیلن"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-05",
  references: ["https://bukanpipe.com/about_us/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "تماس", path: "/contact" },
  ],
  sections: [
    { type: "heading", level: 2, text: "تلفن" },
    { type: "list", items: ["۰۴۴-۴۶۴۳۳۴۴۴ تا ۵", "۰۴۴-۴۱۵۰"] },
    { type: "heading", level: 2, text: "فروش — سفارش لوله پلی اتیلن" },
    { type: "list", items: ["۰۹۱۴۴۸۲۲۵۱۱", "۰۹۱۴۳۸۲۰۵۵۶", "info@bukanpipe.com"] },
    { type: "heading", level: 2, text: "کنترل کیفیت و آزمایشگاه" },
    { type: "list", items: ["۰۹۰۱۳۴۱۴۹۷۹", "lab@bukanpipe.com"] },
    {
      type: "internal-links",
      title: "استعلام قیمت",
      links: [
        { label: "فرم استعلام قیمت", path: "/request-quote" },
        { label: "محصولات", path: "/products" },
      ],
    },
  ],
  related: { products: ["water-supply-pipe", "gas-pipe"], articles: ["polyethylene-pipe-specifications"] },
};

export const faCompanyPages: readonly ContentDocument[] = [
  faAbout,
  faQuality,
  faCertifications,
  faContact,
];
