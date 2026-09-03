import type { ContentDocument } from "@/content/models/content-document";

export const faAbout: ContentDocument = {
  id: "about",
  slug: "about",
  path: "/about",
  locale: "fa",
  kind: "company",
  title: "درباره بوکان پایپ",
  seoTitle: "درباره شرکت لوله پلی اتیلن بوکان | بوکان پایپ",
  seoDescription:
    "بوکان پایپ — تولیدکننده لوله پلی‌اتیلن تک‌جداره تا قطر ۶۳۰ میلی‌متر برای آبرسانی، گاز، کشاورزی و صنعت.",
  description: "تاریخچه و توان تولید کارخانه لوله پلی‌اتیلن بوکان.",
  primaryKeyword: "شرکت لوله پلی اتیلن بوکان",
  secondaryKeywords: ["بوکان پایپ", "تولید کننده لوله پلی اتیلن", "کارخانه لوله پلی اتیلن"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/about_us/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "درباره ما", path: "/about" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "بوکان پایپ از سال ۱۳۷۶ در تولید لوله‌های پلی‌اتیلن تک‌جداره فعالیت دارد و در صنعت لوله PE کشور شناخته شده است. کارخانه انواع این لوله‌ها را تا قطر ۶۳۰ میلی‌متر (۲۵ اینچ) در ضخامت و فشارهای کاری متنوع تولید می‌کند.",
    },
    {
      type: "heading",
      level: 2,
      text: "کاربردهای اصلی",
    },
    {
      type: "list",
      items: [
        "آبرسانی شهری و روستایی، آبیاری فشار قوی و انتقال آب صنعتی",
        "شبکه گازرسانی (انشعاب و توزیع)",
        "فاضلاب، زهکشی و پوشش کابل",
        "انتقال سیالات در فرآیندهای صنعتی",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "چرا پلی‌اتیلن",
    },
    {
      type: "paragraph",
      text: "لوله پلی‌اتیلن به‌دلیل استحکام، سبکی، انعطاف و عمر طولانی، در بسیاری از پروژه‌ها جایگزین مناسبی برای لوله فلزی، GRP، PVC و چدن است.",
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
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe"],
    laboratory: ["services"],
  },
};

export const faQuality: ContentDocument = {
  id: "quality",
  slug: "quality",
  path: "/quality",
  locale: "fa",
  kind: "company",
  title: "سیاست کیفیت",
  seoTitle: "کنترل کیفیت تولید لوله پلی اتیلن | بوکان پایپ",
  seoDescription: "فرآیند کنترل کیفیت تولید، بازرسی و آزمون در خط تولید و آزمایشگاه.",
  description: "سیاست و فرآیند کنترل کیفیت.",
  primaryKeyword: "کنترل کیفیت لوله پلی اتیلن",
  secondaryKeywords: ["QC", "بازرسی لوله PE"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/quality-policy/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "کیفیت", path: "/quality" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "کیفیت محصول در بوکان پایپ بر پایه کنترل مواد اولیه، پایش فرآیند اکستروژن، بازرسی ابعادی و آزمون‌های نهایی در واحد QC و آزمایشگاه استوار است.",
    },
    {
      type: "heading",
      level: 2,
      text: "مراحل کنترل",
    },
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
      type: "paragraph",
      text: "برای پروژه‌های حساس، هماهنگی با دامنه آزمون آزمایشگاه و مدارک QC از طریق واحد فروش امکان‌پذیر است.",
    },
  ],
  related: { laboratory: ["services", "test-scope", "iso-17025"] },
};

export const faCertifications: ContentDocument = {
  id: "certifications",
  slug: "certifications",
  path: "/certifications",
  locale: "fa",
  kind: "company",
  title: "گواهی‌ها و افتخارات",
  seoTitle: "گواهی‌ها و افتخارات | بوکان پایپ",
  seoDescription: "افتخارات و گواهی‌های منتشرشده شرکت — جزئیات با مدارک به‌روز تکمیل می‌شود.",
  description: "گواهی‌ها و افتخارات.",
  primaryKeyword: "گواهی لوله پلی اتیلن",
  secondaryKeywords: ["واحد نمونه", "استاندارد INSO"],
  status: "published",
  evidenceStatus: "requires-verification",
  verificationStatus: "verify-before-production",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/about_us/", "https://bukanpipe.com/certificates/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "گواهی‌ها", path: "/certifications" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "در معرفی شرکت، بوکان پایپ به دریافت عنوان واحد نمونه از سازمان صنعت، معدن و تجارت در سال‌های فعالیت و رتبه A در میان تولیدکنندگان لوله پلی‌اتیلن از سازمان جهاد کشاورزی اشاره کرده است. نسخه PDF و تاریخ اعتبار هر گواهی پس از تأیید واحد کیفیت در این صفحه قرار می‌گیرد.",
    },
    {
      type: "paragraph",
      text: "برای دریافت کپی گواهی‌های مرتبط با پروژه خود، با واحد فروش یا QC تماس بگیرید.",
    },
  ],
  related: { laboratory: ["iso-17025"] },
};

export const faContact: ContentDocument = {
  id: "contact",
  slug: "contact",
  path: "/contact",
  locale: "fa",
  kind: "company",
  title: "تماس با ما",
  seoTitle: "تماس با بوکان پایپ | فروش و پشتیبانی",
  seoDescription:
    "آدرس کارخانه، تلفن فروش و ایمیل بوکان پایپ — آذربایجان غربی، بوکان.",
  description: "راه‌های تماس با کارخانه و واحد فروش.",
  primaryKeyword: "تماس بوکان پایپ",
  secondaryKeywords: ["آدرس کارخانه بوکان پایپ", "تلفن بوکان پایپ"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/about_us/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "تماس", path: "/contact" },
  ],
  sections: [
    {
      type: "heading",
      level: 2,
      text: "کارخانه",
    },
    {
      type: "paragraph",
      text: "آذربایجان غربی — بوکان، کیلومتر ۱۰ جاده میاندواب. کدپستی: ۵۹۵۵۱۶۴۳۴۱.",
    },
    {
      type: "heading",
      level: 2,
      text: "تلفن",
    },
    {
      type: "list",
      items: [
        "۰۴۴-۴۶۴۳۳۴۴۴ تا ۵",
        "۰۴۴-۴۱۵۰",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "فروش",
    },
    {
      type: "list",
      items: ["۰۹۱۴۴۸۲۲۵۱۱", "۰۹۱۴۳۸۲۰۵۵۶", "info@bukanpipe.com"],
    },
    {
      type: "heading",
      level: 2,
      text: "کنترل کیفیت و آزمایشگاه",
    },
    {
      type: "list",
      items: ["۰۹۰۱۳۴۱۴۹۷۹ (ایتا / تلگرام)", "lab@bukanpipe.com"],
    },
    {
      type: "paragraph",
      text: "ساعات پاسخگویی: شنبه تا پنج‌شنبه، ۸:۳۰ تا ۱۶:۰۰.",
    },
  ],
};

export const faCompanyPages: readonly ContentDocument[] = [
  faAbout,
  faQuality,
  faCertifications,
  faContact,
];
