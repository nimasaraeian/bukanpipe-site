import type { Locale } from "@/lib/i18n/config";

export type ProductsHubUiCopy = {
  systemsKicker: string;
  systemsHeading: string;
  systemsIntro: string;
  systemsTablistLabel: string;
  exploreArrow: string;
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
  systemsHeading: "One material platform. Six engineered networks.",
  systemsIntro:
    "Tap a system — image and specs expand right below it. Use Explore for the full product page.",
  systemsTablistLabel: "Product systems",
  exploreArrow: "→",
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
  systemsKicker: "سیستم‌های محصول",
  systemsHeading: "یک بستر ماده. شش شبکه مهندسی‌شده.",
  systemsIntro:
    "روی هر سیستم بزنید — تصویر و مشخصات همان‌جا باز می‌شود. با «مشاهده» صفحه کامل محصول را ببینید.",
  systemsTablistLabel: "سیستم‌های محصول",
  exploreArrow: "←",
  seoNavLabel: "صفحات محصول",
  modal: {
    closeDetails: "بستن جزئیات محصول",
    close: "بستن",
    technicalAdvantages: "مزایای فنی",
    typicalApplications: "کاربردهای رایج",
    standardsCompliance: "استاندارد و انطباق",
    qualityControl: "کنترل کیفیت",
    requestQuote: "درخواست پیش‌فاکتور پروژه",
    backToSystems: "بازگشت به سیستم‌ها",
  },
};

export function getProductsHubUiCopy(locale: Locale): ProductsHubUiCopy {
  return locale === "fa" ? faProductsHubUiCopy : enProductsHubUiCopy;
}
