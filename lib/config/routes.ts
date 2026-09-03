import type { CtaType } from "@/lib/config/cta";
import type { EvidenceStatus } from "@/content/models/shared";

export type RouteLifecycle = "implemented" | "planned" | "deferred";

export type RouteDefinition = {
  path: string;
  titleFa: string;
  purpose: string;
  seoDescription: string;
  lifecycle: RouteLifecycle;
  includeInSitemap: boolean;
  primaryCta: CtaType;
};

export type PlannedRoute = {
  path: string;
  titleFa: string;
  parentPath: string;
  evidenceStatus: EvidenceStatus;
  primaryCta: CtaType;
  notes: string;
};

export const routes = {
  home: {
    path: "/",
    titleFa: "خانه",
    purpose:
      "ورودی سکو. در فازهای بعد: جایگاه، اثبات، مسیرهای محصول/مهندسی، و تبدیل به استعلام.",
    seoDescription:
      "صفحه بنیاد توسعه سکوی دیجیتال Bukan Pipe. صفحه نهایی کارخانه نیست.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  products: {
    path: "/products",
    titleFa: "محصولات",
    purpose:
      "هاب کشف محصول و مشخصات فنی. رکورد محصول فقط پس از تأیید دادهٔ کارخانه اضافه می‌شود.",
    seoDescription:
      "مسیر توسعه محصولات Bukan Pipe. فهرست و مشخصات تأییدشده هنوز منتشر نشده است.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  applications: {
    path: "/applications",
    titleFa: "کاربردها",
    purpose:
      "خوشه‌های کاربرد مستقل از کاتالوگ محصول. زیربخش‌ها فقط برای کاربردهای تأییدشده منتشر می‌شوند.",
    seoDescription:
      "مسیر توسعه کاربردهای لوله پلی‌اتیلن. محتوای نهایی پس از تأیید محصول و بازار منتشر می‌شود.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VIEW_PRODUCT",
  },
  laboratory: {
    path: "/laboratory",
    titleFa: "آزمایشگاه",
    purpose:
      "آزمایشگاه به‌عنوان دارایی اعتماد و کانال ورودی. ادعاهای اعتبار فقط پس از راستی‌آزمایی گواهی منتشر می‌شود.",
    seoDescription:
      "مسیر توسعه آزمایشگاه Bukan Pipe. وضعیت اعتبار و دامنه آزمون هنوز به‌عنوان واقعیت منتشر نشده است.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_LAB_TEST",
  },
  projects: {
    path: "/projects",
    titleFa: "پروژه‌ها",
    purpose:
      "مطالعات موردی با مجوز انتشار. هیچ پروژه یا نام مشتری بدون مدرک ساخته نمی‌شود.",
    seoDescription:
      "مسیر توسعه پروژه‌ها. مطالعات موردی فقط پس از تأیید مدرک و مجوز انتشار اضافه می‌شوند.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  engineering: {
    path: "/engineering",
    titleFa: "مهندسی",
    purpose:
      "مرجع تصمیم فنی همیشگی: SDR، PN، PE80/PE100، جوش و نصب. از صفحات محصول و مرکز دانش جدا است.",
    seoDescription:
      "مسیر توسعه مرجع مهندسی. راهنماهای فنی پس از تأیید منابع منتشر می‌شوند.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VIEW_PRODUCT",
  },
  standards: {
    path: "/standards",
    titleFa: "استانداردها",
    purpose:
      "استانداردها و مدارک انطباق مرتبط با محصول. فهرست فقط از منابع تأییدشده پر می‌شود.",
    seoDescription:
      "مسیر توسعه استانداردها. هیچ استاندارد یا گواهی تأییدنشده‌ای در این فاز فهرست نشده است.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VIEW_STANDARD",
  },
  knowledge: {
    path: "/knowledge",
    titleFa: "مرکز دانش",
    purpose:
      "مقالات پشتیبان که مالک قصد جست‌وجوی صفحات مهندسی یا محصول نیستند. تولید محتوای نازک مجاز نیست.",
    seoDescription:
      "مسیر توسعه مرکز دانش. مقالات پس از طبقه‌بندی و تأیید منبع اضافه می‌شوند.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VIEW_PRODUCT",
  },
  pricing: {
    path: "/pricing",
    titleFa: "قیمت",
    purpose:
      "هاب شفافیت قیمت (عوامل مؤثر بر قیمت)، نه جدول قیمت کهنه. تبدیل اصلی به استعلام است.",
    seoDescription:
      "مسیر توسعه اطلاعات قیمت. هیچ رقم قیمتی در این فاز منتشر نشده است.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  tools: {
    path: "/tools",
    titleFa: "ابزارهای مهندسی",
    purpose:
      "هاب ماشین‌حساب و انتخاب. ابزارها در فازهای بعد ساخته می‌شوند و با راهنماهای مهندسی پیوند می‌خورند.",
    seoDescription:
      "مسیر توسعه ابزارهای مهندسی. ماشین‌حساب‌ها هنوز پیاده‌سازی نشده‌اند.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "USE_TOOL",
  },
  requestQuote: {
    path: "/request-quote",
    titleFa: "درخواست پیش‌فاکتور",
    purpose:
      "موتور فروش: استعلام ساختاریافته. بک‌اند و فرم نهایی در فاز RFQ ساخته می‌شود.",
    seoDescription:
      "مسیر توسعه درخواست پیش‌فاکتور. فرم تجاری هنوز فعال نیست.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  dealers: {
    path: "/dealers",
    titleFa: "نمایندگان",
    purpose:
      "منبع رسمی کانال‌های فروش. فهرست فقط پس از تأیید کارخانه. راستی‌آزمایی در /verify است.",
    seoDescription:
      "مسیر توسعه نمایندگان. فهرست نمایندگان رسمی هنوز از کارخانه دریافت نشده است.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VERIFY_DEALER",
  },
  verify: {
    path: "/verify",
    titleFa: "راستی‌آزمایی نماینده",
    purpose:
      "تجربهٔ آیندهٔ تأیید هویت یا مجوز نماینده. منطق راستی‌آزمایی و پایگاه داده در این فاز پیاده نمی‌شود.",
    seoDescription:
      "مسیر توسعه راستی‌آزمایی نماینده Bukan Pipe. سامانه تأیید هنوز فعال نیست.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VERIFY_DEALER",
  },
  about: {
    path: "/about",
    titleFa: "درباره",
    purpose:
      "هویت کارخانه پس از تأیید نام حقوقی، تاریخچه و مدارک. از آمار ساختگی استفاده نمی‌شود.",
    seoDescription:
      "مسیر توسعه درباره Bukan Pipe. جزئیات حقوقی و تاریخی هنوز راستی‌آزمایی نشده است.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "CONTACT_SALES",
  },
  contact: {
    path: "/contact",
    titleFa: "تماس",
    purpose:
      "راه‌های تماس تأییدشده. شماره، نشانی و فرم فقط پس از تأیید کارخانه اضافه می‌شود.",
    seoDescription:
      "مسیر توسعه تماس. اطلاعات تماس عملیاتی هنوز در این فاز ثبت نشده است.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "CONTACT_SALES",
  },
} as const satisfies Record<string, RouteDefinition>;

export const publicRoutes: readonly RouteDefinition[] = [
  routes.home,
  routes.products,
  routes.applications,
  routes.laboratory,
  routes.projects,
  routes.engineering,
  routes.standards,
  routes.knowledge,
  routes.pricing,
  routes.tools,
  routes.requestQuote,
  routes.dealers,
  routes.verify,
  routes.about,
  routes.contact,
];

export const sitemapRoutes: readonly RouteDefinition[] = publicRoutes.filter(
  (route) => route.includeInSitemap,
);

export const plannedRoutes: readonly PlannedRoute[] = [
  {
    path: "/products/gas-pipe",
    titleFa: "لوله گازرسانی",
    parentPath: "/products",
    evidenceStatus: "candidate",
    primaryCta: "REQUEST_QUOTE",
    notes: "URL میراثی /gas-pipe/ تأیید شد. تولید جاری، استاندارد و مجوز گاز هنوز راستی‌آزمایی نشده است.",
  },
  {
    path: "/products/water-pipe",
    titleFa: "لوله آبرسانی",
    parentPath: "/products",
    evidenceStatus: "candidate",
    primaryCta: "REQUEST_QUOTE",
    notes: "در راهبرد و صفحهٔ دربارهٔ میراثی به‌عنوان کاربرد آمده است. کاتالوگ جاری تأیید نشده است.",
  },
  {
    path: "/products/irrigation-pipe",
    titleFa: "لوله آبیاری",
    parentPath: "/products",
    evidenceStatus: "candidate",
    primaryCta: "REQUEST_QUOTE",
    notes: "خوشهٔ کشاورزی راهبردی است. ساخت صفحه فقط پس از تأیید محصول.",
  },
  {
    path: "/products/pe100",
    titleFa: "لوله PE100",
    parentPath: "/products",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_QUOTE",
    notes: "مقصد کلیدواژهٔ راهبردی. تولید PE100 باید از کارخانه تأیید شود.",
  },
  {
    path: "/products/sewer-pipe",
    titleFa: "لوله فاضلاب",
    parentPath: "/products",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_QUOTE",
    notes: "فقط در صورت تأیید محصول واقعی ساخته می‌شود.",
  },
  {
    path: "/applications/water-supply",
    titleFa: "آبرسانی",
    parentPath: "/applications",
    evidenceStatus: "candidate",
    primaryCta: "VIEW_PRODUCT",
    notes: "قصد کاربرد، نه کاتالوگ. محصول مرتبط باید جداگانه تأیید شود.",
  },
  {
    path: "/applications/agriculture",
    titleFa: "کشاورزی",
    parentPath: "/applications",
    evidenceStatus: "candidate",
    primaryCta: "VIEW_PRODUCT",
    notes: "هاب عمودی منطقه‌ای در راهبرد. قابلیت محصول جاری تأیید نشده است.",
  },
  {
    path: "/applications/irrigation",
    titleFa: "آبیاری تحت فشار",
    parentPath: "/applications",
    evidenceStatus: "candidate",
    primaryCta: "VIEW_PRODUCT",
    notes: "اگر محتوای متمایز از کشاورزی نداشته باشد، ادغام شود.",
  },
  {
    path: "/applications/gas-distribution",
    titleFa: "گازرسانی",
    parentPath: "/applications",
    evidenceStatus: "candidate",
    primaryCta: "VIEW_PRODUCT",
    notes: "قصد کاربرد شبکه گاز. مالک تجاری کلیدواژهٔ محصول با /products/gas-pipe است.",
  },
  {
    path: "/applications/industrial",
    titleFa: "صنعتی",
    parentPath: "/applications",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "ساخت صفحه منوط به تأیید کاربرد و محصول صنعتی.",
  },
  {
    path: "/applications/sewage",
    titleFa: "فاضلاب و زهکشی",
    parentPath: "/applications",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "فقط پس از تأیید محصول مرتبط.",
  },
  {
    path: "/engineering/sdr",
    titleFa: "SDR چیست",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "راهنمای همیشگی. منبع فنی باید مشخص شود؛ ادعای محصول لازم نیست.",
  },
  {
    path: "/engineering/pn",
    titleFa: "PN چیست",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "فشار کاری روی همین صفحه پوشش داده می‌شود. مسیر جدا برای فشار ساخته نمی‌شود.",
  },
  {
    path: "/engineering/pe80-vs-pe100",
    titleFa: "PE80 یا PE100",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "مالک قصد مقایسه‌ای. مالک تجاری PE100 صفحهٔ محصول است.",
  },
  {
    path: "/engineering/pipe-sizing",
    titleFa: "انتخاب قطر لوله",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "USE_TOOL",
    notes: "قصد اطلاعاتی. قصد محاسبه‌ای به /tools/pipe-sizing می‌رود.",
  },
  {
    path: "/engineering/pressure-loss",
    titleFa: "افت فشار",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "USE_TOOL",
    notes: "راهنما. ماشین‌حساب جدا در /tools/pressure-loss.",
  },
  {
    path: "/engineering/welding",
    titleFa: "جوش پلی‌اتیلن",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "هاب جوش شامل butt fusion و electrofusion به‌صورت بخش، نه URL رقیب.",
  },
  {
    path: "/engineering/installation",
    titleFa: "نصب",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "نصب و انبارداری می‌تواند در همین خوشه بماند.",
  },
  {
    path: "/laboratory/services",
    titleFa: "خدمات آزمایشگاه",
    parentPath: "/laboratory",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_LAB_TEST",
    notes: "خدمات برون‌سازمانی فقط پس از تأیید دامنه و دسترسی مشتری.",
  },
  {
    path: "/laboratory/tests",
    titleFa: "آزمون‌ها",
    parentPath: "/laboratory",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_LAB_TEST",
    notes: "فهرست آزمون. صفحات تکی فقط برای آزمون تأییدشده.",
  },
  {
    path: "/laboratory/accreditation",
    titleFa: "اعتباربخشی",
    parentPath: "/laboratory",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_LAB_TEST",
    notes: "گواهی، شماره، مرجع، اعتبار و دامنه باید جاری باشد.",
  },
  {
    path: "/laboratory/request-test",
    titleFa: "درخواست آزمون",
    parentPath: "/laboratory",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_LAB_TEST",
    notes: "تبدیل خدمات آزمایشگاه. فرم در فاز بعدی.",
  },
  {
    path: "/tools/pipe-sizing",
    titleFa: "محاسبه قطر",
    parentPath: "/tools",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_QUOTE",
    notes: "مالک قصد ابزاری برای محاسبه قطر.",
  },
  {
    path: "/tools/pressure-loss",
    titleFa: "محاسبه افت فشار",
    parentPath: "/tools",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_QUOTE",
    notes: "مالک قصد ابزاری برای افت فشار.",
  },
];

export const deferredRoutes = {
  export: {
    path: "/export",
    reason:
      "صادرات پس از تأیید قابلیت تجاری و پس از لایهٔ فارسی است. صفحه عمومی ساخته نمی‌شود.",
  },
  exportIraq: {
    path: "/export/iraq",
    reason: "فرود عراق فقط پس از validation تجاری و اسناد صادرات.",
  },
} as const;
