import type { Locale } from "@/lib/i18n/config";

export type ProductsHubUiCopy = {
  systemsKicker: string;
  systemsHeading: string;
  systemsIntro: string;
  systemsTablistLabel: string;
  exploreArrow: string;
  families: {
    kicker: string;
    heading: string;
    intro: string;
    items: readonly { code: string; name: string; grade: string; sizes: string; uses: string }[];
    note: string;
  };
  seoNavLabel: string;
  modal: {
    closeDetails: string;
    close: string;
    technicalAdvantages: string;
    typicalApplications: string;
    standardsCompliance: string;
    qualityControl: string;
    requestQuote: string;
    backToSystems: string;
  };
};

const enProductsHubUiCopy: ProductsHubUiCopy = {
  systemsKicker: "Product Systems",
  systemsHeading: "One material platform. Five engineered networks.",
  systemsIntro:
    "Tap a system — image and specs expand right below it. Use Explore for the full product page.",
  systemsTablistLabel: "Product systems",
  exploreArrow: "→",
  families: {
    kicker: "Two families",
    heading: "Single-wall polyethylene pipe comes in two families",
    intro:
      "Every system above is high-density pipe. The drip lateral is a different material and a different product.",
    items: [
      {
        code: "HDPE",
        name: "High-density polyethylene pipe",
        grade: "PE100 (PE80 to order)",
        sizes: "25 mm and up, to 630 mm",
        uses: "Water supply networks and transmission · gas distribution · sprinkler irrigation and drainage · telecom and power cable ducting · industrial effluent, acid and chemical lines",
      },
      {
        code: "LDPE",
        name: "Low-density (soft) polyethylene pipe",
        grade: "PE40 · PE32 per the catalogue table",
        sizes: "Mainly 16 mm",
        uses: "Drip irrigation only: the lateral (emitter line) that branches off the mains and carries the drippers",
      },
    ],
    note: "Dimensions for both are in the technical centre's size tables; the drip table is also on the irrigation pipe page.",
  },
  seoNavLabel: "Product pages",
  modal: {
    closeDetails: "Close product details",
    close: "Close",
    technicalAdvantages: "Technical advantages",
    typicalApplications: "Typical applications",
    standardsCompliance: "Standards & compliance",
    qualityControl: "Quality control",
    requestQuote: "Request project quote",
    backToSystems: "Back to systems",
  },
};

const faProductsHubUiCopy: ProductsHubUiCopy = {
  systemsKicker: "گروه‌های محصول",
  systemsHeading: "محصولات و مشخصات متناسب با پروژه",
  systemsIntro:
    "گروه موردنظر را انتخاب کنید تا مشخصات آن نمایش داده شود. جزئیات بیشتر در صفحه هر محصول در دسترس است.",
  systemsTablistLabel: "گروه‌های محصول",
  exploreArrow: "←",
  families: {
    kicker: "دو دسته محصول",
    heading: "لوله پلی اتیلن تک‌جداره در دو دسته تولید می‌شود",
    intro: "همه گروه‌های بالا لوله سنگین‌اند. لوله لترال آبیاری قطره‌ای ماده و محصول جداگانه‌ای است.",
    items: [
      {
        code: "HDPE",
        name: "لوله پلی اتیلن سنگین",
        grade: "PE100 (PE80 به سفارش)",
        sizes: "از ۲۵ میلی‌متر به بالا تا ۶۳۰",
        uses: "آبرسانی شبکه و انتقال · گازرسانی · آبیاری بارانی و زهکشی · حفاظ کابل مخابراتی و برق · خطوط صنعتی انتقال پساب، اسید و مواد شیمیایی",
      },
      {
        code: "LDPE",
        name: "لوله پلی اتیلن سبک (نرم)",
        grade: "PE40 · PE32 طبق جدول کاتالوگ",
        sizes: "عمدتاً ۱۶ میلی‌متر",
        uses: "فقط آبیاری قطره‌ای: لوله لترال یا آبده که از خط اصلی منشعب می‌شود و قطره‌چکان روی آن نصب می‌شود",
      },
    ],
    note: "ابعاد هر دو دسته در جدول‌های سایزبندی مرکز فنی آمده است؛ جدول لوله قطره‌ای در صفحه لوله آبیاری هم هست.",
  },
  seoNavLabel: "صفحات محصول",
  modal: {
    closeDetails: "بستن جزئیات محصول",
    close: "بستن",
    technicalAdvantages: "مزایای فنی",
    typicalApplications: "کاربردهای رایج",
    standardsCompliance: "استاندارد و انطباق",
    qualityControl: "کنترل کیفیت",
    requestQuote: "درخواست پیش‌فاکتور پروژه",
    backToSystems: "بازگشت به محصولات",
  },
};

export function getProductsHubUiCopy(locale: Locale): ProductsHubUiCopy {
  return locale === "fa" ? faProductsHubUiCopy : enProductsHubUiCopy;
}
