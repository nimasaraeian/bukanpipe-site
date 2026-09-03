export type RouteDefinition = {
  path: string;
  titleFa: string;
  purpose: string;
  seoDescription: string;
};

export const routes = {
  home: {
    path: "/",
    titleFa: "خانه",
    purpose:
      "ورودی سکو. در فازهای بعد: جایگاه، اثبات، مسیرهای محصول/مهندسی، و تبدیل به استعلام.",
    seoDescription:
      "صفحه بنیاد توسعه سکوی دیجیتال Bukan Pipe. صفحه نهایی کارخانه نیست.",
  },
  products: {
    path: "/products",
    titleFa: "محصولات",
    purpose:
      "معماری کشف محصول و مشخصات فنی. رکورد محصول فقط پس از تأیید دادهٔ کارخانه اضافه می‌شود.",
    seoDescription:
      "مسیر توسعه محصولات Bukan Pipe. فهرست و مشخصات تأییدشده هنوز منتشر نشده است.",
  },
  applications: {
    path: "/applications",
    titleFa: "کاربردها",
    purpose:
      "خوشه‌های کاربرد (آب، کشاورزی، گاز و موارد تأییدشده). زیربخش‌ها در فاز معماری اطلاعات نهایی می‌شوند.",
    seoDescription:
      "مسیر توسعه کاربردهای لوله پلی‌اتیلن. محتوای نهایی پس از تأیید محصول و بازار منتشر می‌شود.",
  },
  laboratory: {
    path: "/laboratory",
    titleFa: "آزمایشگاه",
    purpose:
      "آزمایشگاه به‌عنوان دارایی اعتماد و کانال ورودی. ادعاهای اعتبار فقط پس از راستی‌آزمایی گواهی منتشر می‌شود.",
    seoDescription:
      "مسیر توسعه آزمایشگاه Bukan Pipe. وضعیت اعتبار و دامنه آزمون هنوز به‌عنوان واقعیت منتشر نشده است.",
  },
  projects: {
    path: "/projects",
    titleFa: "پروژه‌ها",
    purpose:
      "مطالعات موردی با مجوز انتشار. هیچ پروژه یا نام مشتری در این فاز ساخته نمی‌شود.",
    seoDescription:
      "مسیر توسعه پروژه‌ها. مطالعات موردی فقط پس از تأیید مدرک و مجوز انتشار اضافه می‌شوند.",
  },
  engineering: {
    path: "/engineering",
    titleFa: "مهندسی",
    purpose:
      "مرجع انتخاب فنی: SDR، PN، PE80/PE100، جوش و نصب. صفحات ابزار در فازهای بعد.",
    seoDescription:
      "مسیر توسعه مرجع مهندسی. راهنماهای فنی پس از تأیید منابع منتشر می‌شوند.",
  },
  standards: {
    path: "/standards",
    titleFa: "استانداردها",
    purpose:
      "استانداردها و مدارک انطباق مرتبط با محصول. فهرست فقط از منابع تأییدشده پر می‌شود.",
    seoDescription:
      "مسیر توسعه استانداردها. هیچ استاندارد یا گواهی تأییدنشده‌ای در این فاز فهرست نشده است.",
  },
  knowledge: {
    path: "/knowledge",
    titleFa: "مرکز دانش",
    purpose:
      "محتوای فنی با هدف جست‌وجو، فروش یا اعتماد. تولید انبوه محتوای نازک مجاز نیست.",
    seoDescription:
      "مسیر توسعه مرکز دانش. مقالات پس از طبقه‌بندی و تأیید منبع اضافه می‌شوند.",
  },
  pricing: {
    path: "/pricing",
    titleFa: "قیمت",
    purpose:
      "هاب شفافیت قیمت (عوامل مؤثر بر قیمت)، نه جدول قیمت کهنه و نه پنهان‌کاری کامل.",
    seoDescription:
      "مسیر توسعه اطلاعات قیمت. هیچ رقم قیمتی در این فاز منتشر نشده است.",
  },
  tools: {
    path: "/tools",
    titleFa: "ابزارهای مهندسی",
    purpose:
      "ابزارهای انتخاب و محاسبه در فازهای بعد. در این فاز فقط مسیر رزرو شده است.",
    seoDescription:
      "مسیر توسعه ابزارهای مهندسی. ماشین‌حساب‌ها هنوز پیاده‌سازی نشده‌اند.",
  },
  requestQuote: {
    path: "/request-quote",
    titleFa: "درخواست پیش‌فاکتور",
    purpose:
      "موتور فروش: استعلام ساختاریافته. بک‌اند و فرم نهایی در فاز RFQ ساخته می‌شود.",
    seoDescription:
      "مسیر توسعه درخواست پیش‌فاکتور. فرم تجاری هنوز فعال نیست.",
  },
  dealers: {
    path: "/dealers",
    titleFa: "نمایندگان",
    purpose:
      "منبع رسمی کانال‌های فروش. راستی‌آزمایی نماینده در مسیر جداگانهٔ آینده (/verify) خواهد آمد.",
    seoDescription:
      "مسیر توسعه نمایندگان. فهرست نمایندگان رسمی هنوز از کارخانه دریافت نشده است.",
  },
  about: {
    path: "/about",
    titleFa: "درباره",
    purpose:
      "هویت کارخانه پس از تأیید نام حقوقی، تاریخچه و مدارک. از آمار ساختگی استفاده نمی‌شود.",
    seoDescription:
      "مسیر توسعه درباره Bukan Pipe. جزئیات حقوقی و تاریخی هنوز راستی‌آزمایی نشده است.",
  },
  contact: {
    path: "/contact",
    titleFa: "تماس",
    purpose:
      "راه‌های تماس تأییدشده. شماره، نشانی و فرم فقط پس از تأیید کارخانه اضافه می‌شود.",
    seoDescription:
      "مسیر توسعه تماس. اطلاعات تماس عملیاتی هنوز در این فاز ثبت نشده است.",
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
  routes.about,
  routes.contact,
];

export const deferredRoutes = {
  verify: {
    path: "/verify",
    reason:
      "در معماری اطلاعات و راهبرد دفاع برند آمده است، اما در محدودهٔ فاز ۰۰۱ نیست.",
  },
  export: {
    path: "/export",
    reason:
      "گسترش صادرات پس از اعتبارسنجی تجاری و پس از لایهٔ فارسی است؛ در فاز ۰۰۱ مسیر ساخته نمی‌شود.",
  },
} as const;
