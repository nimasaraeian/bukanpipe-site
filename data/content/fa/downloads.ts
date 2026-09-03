import type { ContentDocument } from "@/content/models/content-document";

export type DownloadItem = {
  id: string;
  title: string;
  description: string;
  category:
    | "company-catalogue"
    | "water-standards"
    | "gas-standards"
    | "irrigation-standards"
    | "technical-publications"
    | "laboratory-resources";
  /** Public download URL — item hidden until set. */
  fileUrl?: string;
  fileType?: string;
  verificationStatus: "verified" | "verify-before-production" | "missing-source";
};

/** Only items with a hosted fileUrl are shown on the public site. */
export const faDownloadsPublic: readonly DownloadItem[] = [];

export const faDownloadsInternalQueue: readonly DownloadItem[] = [
  {
    id: "catalogue-fa",
    title: "کاتالوگ شرکت",
    description: "کاتالوگ معرفی محصولات — نسخه به‌روز پس از تأیید طراحی.",
    category: "company-catalogue",
    fileType: "PDF",
    verificationStatus: "verify-before-production",
  },
  {
    id: "water-ins-14427",
    title: "INSO 14427 — لوله آبرسانی",
    description: "مرجع استاندارد آبرسانی.",
    category: "water-standards",
    verificationStatus: "missing-source",
  },
  {
    id: "gas-ins-11233",
    title: "INSO 11233 — لوله گاز",
    description: "مرجع استاندارد گاز.",
    category: "gas-standards",
    verificationStatus: "missing-source",
  },
  {
    id: "irrigation-ins-13477",
    title: "INSO 13477 — آبیاری",
    description: "مرجع استاندارد آبیاری.",
    category: "irrigation-standards",
    verificationStatus: "missing-source",
  },
  {
    id: "welding-guide",
    title: "راهنمای جوش PE",
    description: "انتشار PDF فنی مرتبط با مقاله جوش.",
    category: "technical-publications",
    verificationStatus: "missing-source",
  },
  {
    id: "lab-scope-pdf",
    title: "دامنه آزمون آزمایشگاه",
    description: "PDF دامنه آزمون.",
    category: "laboratory-resources",
    verificationStatus: "verify-before-production",
  },
];

export const faDownloadsHub: ContentDocument = {
  id: "downloads-hub",
  slug: "downloads",
  path: "/downloads",
  locale: "fa",
  kind: "hub",
  title: "مرکز دانلود",
  seoTitle: "دانلود کاتالوگ و استاندارد | بوکان پایپ",
  seoDescription: "کاتالوگ، استاندارد و منابع فنی — پس از آماده‌سازی فایل منتشر می‌شود.",
  description: "منابع قابل دانلود.",
  primaryKeyword: "دانلود کاتالوگ لوله پلی اتیلن",
  secondaryKeywords: [],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "دانلود", path: "/downloads" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "فایل‌های کاتالوگ و استاندارد پس از آماده‌سازی و تأیید حق انتشار در این بخش قرار می‌گیرند. تا آن زمان، برای دریافت مشخصات و کاتالوگ با واحد فروش تماس بگیرید.",
    },
  ],
  related: { products: ["water-supply-pipe", "gas-pipe"] },
};

export const faCalculatorHub: ContentDocument = {
  id: "calculator-pipeline-design",
  slug: "pipeline-design",
  path: "/calculator/pipeline-design",
  locale: "fa",
  kind: "calculator",
  title: "ماشین‌حساب طراحی خط لوله",
  seoTitle: "ماشین‌حساب طراحی خط لوله آب | بوکان پایپ",
  seoDescription: "برآورد قطر، سرعت، افت فشار و توان پمپ برای خط انتقال آب.",
  description: "ابزار پیش‌طراحی شبکه آب.",
  primaryKeyword: "محاسبه قطر لوله",
  secondaryKeywords: ["افت فشار لوله پلی اتیلن", "سرعت جریان لوله"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/pipeline_design/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "ماشین‌حساب", path: "/calculator" },
    { label: "طراحی خط لوله", path: "/calculator/pipeline-design" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "این ابزار برای پیش‌طراحی خط انتقال آب از چاه به مقصد (استخر، شبکه و غیره) است. نتیجه جایگزین محاسبه مهندسی با پروفیل ارتفاعی واقعی و منحنی پمپ نیست.",
    },
  ],
};

export const faCalculatorIndex: ContentDocument = {
  id: "calculator-hub",
  slug: "calculator",
  path: "/calculator",
  locale: "fa",
  kind: "hub",
  title: "ماشین‌حساب‌های مهندسی",
  seoTitle: "ماشین‌حساب لوله پلی اتیلن | بوکان پایپ",
  seoDescription: "ابزارهای برآورد قطر، افت فشار و پمپ.",
  description: "ابزارهای مهندسی.",
  primaryKeyword: "ماشین حساب لوله پلی اتیلن",
  secondaryKeywords: [],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "ماشین‌حساب", path: "/calculator" },
  ],
  sections: [],
  related: { articles: ["polyethylene-pipe-temperature-pressure"] },
};
