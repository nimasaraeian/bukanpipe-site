import type { ContentDocument } from "@/content/models/content-document";

function labPage(
  slug: string,
  title: string,
  seoTitle: string,
  seoDescription: string,
  description: string,
  sections: ContentDocument["sections"],
): ContentDocument {
  const path = slug ? `/laboratory/${slug}` : "/laboratory";
  return {
    id: slug ? `laboratory-${slug}` : "laboratory-hub",
    slug: slug || "laboratory",
    path,
    locale: "fa",
    kind: slug ? "laboratory" : "hub",
    title,
    seoTitle,
    seoDescription,
    description,
    primaryKeyword: "آزمایشگاه لوله پلی اتیلن",
    secondaryKeywords: ["ISO IEC 17025", "تست هیدرواستاتیک", "آزمایش لوله پلی اتیلن"],
    status: "published",
    evidenceStatus: "requires-verification",
    verificationStatus: "legacy-claim",
    lastReviewed: "2026-09-03",
    references: ["https://bukanpipe.com/qc-and-laboratory/", "https://bukanpipe.com/lab-scope/"],
    breadcrumbs: slug
      ? [
          { label: "خانه", path: "/" },
          { label: "آزمایشگاه", path: "/laboratory" },
          { label: title, path },
        ]
      : [
          { label: "خانه", path: "/" },
          { label: "آزمایشگاه", path: "/laboratory" },
        ],
    sections,
    related: {
      laboratory: slug === "iso-17025" ? ["services", "test-scope"] : ["iso-17025"],
      products: ["water-supply-pipe", "gas-pipe"],
    },
  };
}

export const faLaboratoryHub = labPage(
  "",
  "آزمایشگاه و کنترل کیفیت",
  "آزمایشگاه لوله پلی اتیلن بوکان پایپ",
  "واحد QC و آزمایشگاه پلیمر — کنترل تولید و خدمات آزمون.",
  "آزمایشگاه تخصصی پلیمر و لوله.",
  [
    {
      type: "paragraph",
      text: "واحد کنترل کیفیت و آزمایشگاه بوکان پایپ علاوه بر پایش تولید، خدمات آزمون برای مشتریان و آموزش فنی ارائه می‌دهد. در معرفی گازرسانی، همکاری با آزمایشگاه همکار (اکرودیته) شرکت ملی گاز و سازمان ملی استاندارد ذکر شده است.",
    },
    { type: "heading", level: 2, text: "خدمات" },
    {
      type: "list",
      items: [
        "کنترل کیفیت خط تولید",
        "آزمون برای مشتریان خارج از کارخانه",
        "آموزش فنی",
        "اجرای آزمون‌ها مطابق استانداردهای ملی و بین‌المللی",
      ],
    },
    {
      type: "paragraph",
      text: "وضعیت فعلی گواهی ISO/IEC 17025 و شماره اعتبار پس از تأیید مدارک رسمی در صفحه ISO 17025 منتشر می‌شود.",
    },
    {
      type: "internal-links",
      title: "کارخانه و تولید",
      links: [
        { label: "گالری کارخانه", path: "/gallery" },
        { label: "درباره بوکان پایپ", path: "/about" },
        { label: "کنترل کیفیت و آزمایشگاه", path: "/quality" },
        { label: "گواهی‌ها", path: "/certifications" },
      ],
    },
  ],
);

export const faLaboratoryPages: readonly ContentDocument[] = [
  faLaboratoryHub,
  labPage(
    "services",
    "خدمات آزمایشگاه",
    "خدمات آزمایشگاه لوله پلی اتیلن | بوکان پایپ",
    "آزمون پلیمر، لوله و اتصالات برای تولید و مشتری.",
    "خدمات آزمون",
    [
      {
        type: "paragraph",
        text: "آزمایشگاه خدمات کنترل کیفیت تولید و آزمون برای سفارش‌دهندگان خارجی را ارائه می‌دهد. فهرست دقیق و زمان‌بندی هر آزمون با واحد آزمایشگاه هماهنگ می‌شود.",
      },
      {
        type: "list",
        items: [
          "آزمون‌های مکانیکی و حرارتی",
          "آزمون فشار و عملکرد",
          "آزمون اتصالات و سیستم PE",
        ],
      },
    ],
  ),
  labPage(
    "iso-17025",
    "ISO/IEC 17025",
    "ISO IEC 17025 | آزمایشگاه بوکان پایپ",
    "چارچوب ISO 17025 و وضعیت اعتبارسنجی.",
    "استاندارد ISO 17025",
    [
      {
        type: "paragraph",
        text: "ISO/IEC 17025 الزامات صلاحیت آزمایشگاه‌ها را تعریف می‌کند. در محتوای قبلی شرکت به کار با چارچوب 17025 اشاره شده است؛ انتشار «دارای گواهی معتبر» منوط به PDF گواهی به‌روز است.",
      },
      {
        type: "paragraph",
        text: "برای دریافت گواهی یا دامنه اعتبارسنجی فعلی با lab@bukanpipe.com تماس بگیرید.",
      },
    ],
  ),
  labPage(
    "test-scope",
    "دامنه آزمون",
    "دامنه آزمون‌های آزمایشگاه | بوکان پایپ",
    "فهرست آزمون‌های قابل ارائه — بدون قیمت.",
    "دامنه آزمون",
    [
      {
        type: "paragraph",
        text: "دامنه آزمون شامل آزمون‌های مکانیکی، حرارتی، فشار و ابعادی لوله و مواد پلیمری است. فهرست کامل پس از تأیید مدیریت آزمایشگاه در اختیار مشتریان قرار می‌گیرد.",
      },
      {
        type: "list",
        items: [
          "هیدرواستاتیک / فشار",
          "MFR، Vicat، چگالی",
          "OIT، carbon black dispersion",
          "ESCR، impact، ring stiffness",
          "ابعاد و عملکرد سیستم PE",
        ],
      },
    ],
  ),
  labPage(
    "standards",
    "استانداردهای آزمون",
    "استانداردهای آزمون لوله پلی اتیلن",
    "مراجع INSO و ISO در آزمون.",
    "استانداردهای آزمون",
    [
      {
        type: "paragraph",
        text: "هر آزمون با روش و استاندارد مرجع مشخص گزارش می‌شود. INSO و ISO مرجع اصلی در تولید و آزمون لوله PE هستند.",
      },
    ],
  ),
  labPage(
    "training",
    "آموزش",
    "آموزش فنی لوله پلی اتیلن | بوکان پایپ",
    "دوره‌های آموزشی جوش و QC.",
    "آموزش",
    [
      {
        type: "paragraph",
        text: "واحد آموزش دوره‌های فنی مرتبط با لوله PE برگزار می‌کند. سرفصل و ثبت‌نام از طریق تماس با کارخانه هماهنگ می‌شود.",
      },
    ],
  ),
];
