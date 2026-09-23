import type { ContentDocument } from "@/content/models/content-document";

/**
 * All six laboratory pages used to declare the same primary keyword, so they
 * competed with each other for it and none of them ranked. Each now owns the
 * intent its own title already targets; the hub keeps the generic term.
 */
function labPage(
  slug: string,
  title: string,
  seoTitle: string,
  seoDescription: string,
  description: string,
  sections: ContentDocument["sections"],
  keywords: { primary: string; secondary: readonly string[] },
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
    primaryKeyword: keywords.primary,
    secondaryKeywords: keywords.secondary,
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
  "آزمایشگاه لوله پلی اتیلن بوکان پایپ — واحد مستقل کنترل کیفیت و آزمون پلیمر با گواهی ISO/IEC 17025، خدمات آزمون برای تولید و مشتریان بیرونی.",
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
    { primary: "آزمایشگاه لوله پلی اتیلن", secondary: ["کنترل کیفیت لوله پلی اتیلن", "آزمایشگاه پلیمر", "تست لوله پلی اتیلن"] },
  );

export const faLaboratoryPages: readonly ContentDocument[] = [
  faLaboratoryHub,
  labPage(
    "services",
    "خدمات آزمایشگاه",
    "خدمات آزمایشگاه لوله پلی اتیلن | بوکان پایپ",
    "خدمات آزمون لوله پلی اتیلن بوکان پایپ برای نمونه تولید داخلی و مشتریان بیرونی — آزمون پلیمر، لوله و اتصالات، همراه گزارش آزمون.",
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
      { primary: "خدمات آزمون لوله پلی اتیلن", secondary: ["آزمون لوله و اتصالات", "خدمات آزمایشگاه پلیمر", "تست نمونه لوله"] },
  ),
  labPage(
    "iso-17025",
    "ISO/IEC 17025",
    "ISO IEC 17025 | آزمایشگاه بوکان پایپ",
    "ایزو ۱۷۰۲۵ آزمایشگاه بوکان پایپ — چارچوب استاندارد مدیریت آزمایشگاه، معنای اعتباربخشی و اینکه گواهی چه چیزی را تضمین می‌کند و چه چیزی را نه.",
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
      { primary: "ایزو ۱۷۰۲۵ آزمایشگاه", secondary: ["ISO IEC 17025", "اعتباربخشی آزمایشگاه", "گواهی ISO 17025 آزمایشگاه"] },
  ),
  labPage(
    "test-scope",
    "دامنه آزمون",
    "دامنه آزمون‌های آزمایشگاه | بوکان پایپ",
    "دامنه آزمون لوله پلی اتیلن در آزمایشگاه بوکان پایپ — فهرست آزمون‌های قابل ارائه روی لوله، اتصالات و مواد اولیه، بدون اعلام قیمت.",
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
      { primary: "دامنه آزمون لوله پلی اتیلن", secondary: ["فهرست آزمون لوله PE", "آزمون هیدرواستاتیک لوله", "دامنه اعتبار آزمایشگاه"] },
  ),
  labPage(
    "standards",
    "استانداردهای آزمون",
    "استانداردهای آزمون لوله پلی اتیلن",
    "استاندارد آزمون لوله پلی اتیلن — مراجع INSO و ISO که آزمایشگاه بوکان پایپ در روش آزمون و گزارش‌دهی به آن‌ها استناد می‌کند.",
    "استانداردهای آزمون",
    [
      {
        type: "paragraph",
        text: "هر آزمون با روش و استاندارد مرجع مشخص گزارش می‌شود. INSO و ISO مرجع اصلی در تولید و آزمون لوله PE هستند.",
      },
    ],
      { primary: "استاندارد آزمون لوله پلی اتیلن", secondary: ["INSO آزمون لوله", "ISO آزمون پلی اتیلن", "روش آزمون لوله PE"] },
  ),
  labPage(
    "training",
    "آموزش",
    "آموزش فنی لوله پلی اتیلن | بوکان پایپ",
    "آموزش فنی لوله پلی اتیلن — دوره‌های جوش بات فیوژن و الکتروفیوژن و کنترل کیفیت در آزمایشگاه بوکان پایپ؛ هماهنگی از طریق تماس با کارخانه.",
    "آموزش",
    [
      {
        type: "paragraph",
        text: "واحد آموزش بوکان پایپ دارای پروانه فعالیت مرکز کارآموزی بین‌کارگاهی به شماره ۱۴/۱۱۲۲۱ از سازمان آموزش فنی و حرفه‌ای کشور (وزارت تعاون، کار و رفاه اجتماعی) است. این پروانه در ۱۴۰۴/۰۷/۲۳ صادر شده و اعتبار آن پنج سال است. مبنای قانونی آن تبصره ۲ ماده ۱۱۰ قانون کار و آیین‌نامه ایجاد مراکز کارآموزی جوارکارگاهی و بین‌کارگاهی است.",
      },
      { type: "heading", level: 2, text: "مرکز کارآموزی بین‌کارگاهی یعنی چه" },
      {
        type: "paragraph",
        text: "مرکز کارآموزی جوارکارگاهی برای کارکنان همان کارخانه است؛ مرکز بین‌کارگاهی اجازه می‌دهد آموزش برای شاغلان سایر واحدهای صنعتی استان هم ارائه شود. تفاوت عملی این است که پیمانکار یا کارفرمای دیگری هم می‌تواند نیروی خود را برای آموزش به اینجا بفرستد.",
      },
      { type: "heading", level: 2, text: "چرا آموزش جوش در پلی اتیلن جدی است" },
      {
        type: "paragraph",
        text: "در خط پلی اتیلن، اتصال نقطه‌ای است که خرابی از آنجا شروع می‌شود و جوش معیوب معمولاً ظاهر سالمی دارد. رایج‌ترین علت خرابی، باز کردن مهار پیش از پایان زمان خنک‌کاری است — اتصال درست به نظر می‌رسد ولی پیوند کامل نشده است. به همین دلیل در شبکه گاز، صلاحیت جوشکار و رکورد جوش بخشی از الزامات تحویل خط است، نه یک کار تشریفاتی.",
      },
      { type: "heading", level: 2, text: "سرفصل‌های مرتبط" },
      {
        type: "list",
        items: [
          "جوش لب‌به‌لب (butt fusion): پارامترها، آماده‌سازی سطح، هم‌محوری و زمان خنک‌کاری",
          "جوش الکتروفیوژن: تراشیدن لایه اکسید، جازدن اتصال و بی‌حرکت نگه داشتن قطعه",
          "بازرسی چشمی اتصال و تشخیص عیوب رایج",
          "کنترل کیفیت لوله: بازرسی ابعادی و آزمون‌های آزمایشگاهی",
          "ایمنی کار با دستگاه جوش و ترانشه",
        ],
      },
      {
        type: "paragraph",
        text: "سرفصل دقیق، مدت دوره و شرایط ثبت‌نام بسته به گروه متقاضی تعیین می‌شود و از طریق تماس با کارخانه هماهنگ می‌شود.",
      },
      {
        type: "internal-links",
        title: "مرتبط",
        links: [
          { label: "جوش لوله پلی اتیلن", path: "/technical-center/polyethylene-pipe-welding" },
          { label: "راهنمای نصب HDPE", path: "/technical-center/hdpe-installation-guide" },
          { label: "گواهی‌ها و مجوزها", path: "/certifications" },
          { label: "تماس با کارخانه", path: "/contact" },
        ],
      },
    ],
      { primary: "آموزش فنی لوله پلی اتیلن", secondary: ["دوره جوش پلی اتیلن", "آموزش کنترل کیفیت لوله", "آموزش جوشکار PE"] },
  ),
];
