import type { Locale } from "@/lib/i18n/config";

export type GalleryPageCopy = {
  eyebrow: string;
  h1: string;
  heroDescription: string;
  intro: string;
  introHeading: string;
  featuredHeading: string;
  galleryHeading: string;
  filterAll: string;
  seoFooterHeading: string;
  seoFooter: string;
  lightboxClose: string;
  lightboxPrevious: string;
  lightboxNext: string;
  categoryStories: Partial<
    Record<
      string,
      {
        heading: string;
        body: string;
      }
    >
  >;
  internalLinks: {
    title: string;
    links: readonly { label: string; path: string; hint?: string }[];
  };
};

const copyFa: GalleryPageCopy = {
  eyebrow: "بوکان پایپ از نزدیک",
  h1: "گالری کارخانه بوکان پایپ",
  heroDescription:
    "نمایی واقعی از کارخانه، خطوط تولید، آزمایشگاه کنترل کیفیت، محصولات، انبار و فرآیند آماده‌سازی سفارش‌ها.",
  introHeading: "کارخانه تولید لوله پلی اتیلن از نگاه تصویر",
  intro:
    "بوکان پایپ از سال ۱۳۷۶ در بوکان، آذربایجان غربی، لوله پلی اتیلن (HDPE) تک‌جداره تولید می‌کند. این گالری مجموعه‌ای از تصاویر واقعی کارخانه است — از نمای هوایی مجموعه تولیدی تا خطوط تولید، آزمایشگاه کنترل کیفیت، انبار لوله‌ها و فرآیند بارگیری. هدف، ارائه تصویری شفاف از محیط تولید، فرآیند ساخت و زیرساخت‌های پشتیبانی است؛ بدون وعده‌های غیرقابل‌راستی‌آزمایی. برای مشخصات فنی محصولات، استانداردها و خدمات آزمایشگاه به صفحات محصولات، کیفیت و آزمایشگاه مراجعه کنید.",
  featuredHeading: "لحظات برجسته",
  galleryHeading: "تمام تصاویر کارخانه",
  filterAll: "همه تصاویر",
  seoFooterHeading: "درباره این گالری",
  seoFooter:
    "تصاویر منتشرشده در گالری کارخانه بوکان پایپ برای نمایش محیط تولید لوله پلی اتیلن، خط تولید، کنترل کیفیت، انبار و لجستیک تهیه شده‌اند. برای استعلام قیمت، مشخصات فنی یا بازدید هماهنگ‌شده با واحد فروش تماس بگیرید.",
  lightboxClose: "بستن",
  lightboxPrevious: "تصویر قبلی",
  lightboxNext: "تصویر بعدی",
  categoryStories: {
    aerial: {
      heading: "نمای هوایی و محوطه کارخانه",
      body: "نماهای هوایی و زمینی از مجموعه تولیدی بوکان پایپ و محوطه کارخانه.",
    },
    production: {
      heading: "خطوط تولید",
      body: "محیط تولید لوله پلی اتیلن و بخش‌های فعال خط تولید در کارخانه.",
    },
    laboratory: {
      heading: "آزمایشگاه و کنترل کیفیت",
      body: "فضای آزمایشگاه و فرآیندهای کنترل کیفیت مرتبط با تولید لوله.",
    },
    products: {
      heading: "محصولات",
      body: "لوله‌های پلی اتیلن تولیدی در محوطه کارخانه و آماده تحویل.",
    },
    warehouse: {
      heading: "انبار",
      body: "نگهداری و سازماندهی لوله‌ها در انبار کارخانه.",
    },
    logistics: {
      heading: "بارگیری و لجستیک",
      body: "آماده‌سازی و بارگیری سفارش‌ها برای ارسال.",
    },
    facility: {
      heading: "زیرساخت و محیط کارخانه",
      body: "فضاهای پشتیبانی، محوطه و زیرساخت مجموعه تولیدی.",
    },
  },
  internalLinks: {
    title: "ادامه مسیر",
    links: [
      { label: "محصولات لوله پلی اتیلن", path: "/products", hint: "کاتالوگ HDPE" },
      { label: "آزمایشگاه", path: "/laboratory", hint: "کنترل کیفیت" },
      { label: "کیفیت", path: "/quality", hint: "استانداردها" },
      { label: "درباره بوکان پایپ", path: "/about", hint: "کارخانه" },
      { label: "استعلام قیمت", path: "/request-quote", hint: "سفارش پروژه" },
    ],
  },
};

const copyEn: GalleryPageCopy = {
  eyebrow: "Inside Bukan Pipe",
  h1: "Bukan Pipe Factory Gallery",
  heroDescription:
    "A visual look inside Bukan Pipe's manufacturing facility, production environment, quality control laboratory, products, warehouse and logistics operations.",
  introHeading: "HDPE pipe manufacturing, in photographs",
  intro:
    "Since 1997, Bukan Pipe has manufactured single-wall HDPE polyethylene pipe in Bukan, West Azerbaijan. This gallery collects real photographs from the factory — aerial views of the site, production areas, the quality control laboratory, pipe storage, and dispatch preparation. The aim is a transparent visual record of how pipe is made and supported on site, without unverified claims. For product specifications, standards, and laboratory services, see Products, Quality, and Laboratory.",
  featuredHeading: "Featured views",
  galleryHeading: "Full factory gallery",
  filterAll: "All",
  seoFooterHeading: "About this gallery",
  seoFooter:
    "Images in the Bukan Pipe Factory Gallery document the HDPE pipe manufacturing environment, production line, quality control, warehouse, and logistics. For pricing, technical specifications, or a coordinated visit, contact our sales team.",
  lightboxClose: "Close",
  lightboxPrevious: "Previous image",
  lightboxNext: "Next image",
  categoryStories: {
    aerial: {
      heading: "Factory & aerial views",
      body: "Aerial and ground views of the Bukan Pipe manufacturing site.",
    },
    production: {
      heading: "Production",
      body: "Polyethylene pipe production areas and active manufacturing environments.",
    },
    laboratory: {
      heading: "Laboratory & quality control",
      body: "Laboratory space and quality control related to pipe production.",
    },
    products: {
      heading: "Products",
      body: "Manufactured HDPE pipes at the factory site, ready for dispatch.",
    },
    warehouse: {
      heading: "Warehouse",
      body: "Pipe storage and organization at the factory warehouse.",
    },
    logistics: {
      heading: "Logistics",
      body: "Order preparation and loading for dispatch.",
    },
    facility: {
      heading: "Facility & infrastructure",
      body: "Support spaces, grounds, and infrastructure across the site.",
    },
  },
  internalLinks: {
    title: "Continue exploring",
    links: [
      { label: "HDPE pipe products", path: "/products", hint: "Product catalog" },
      { label: "Laboratory", path: "/laboratory", hint: "Quality testing" },
      { label: "Quality", path: "/quality", hint: "Standards" },
      { label: "About Bukan Pipe", path: "/about", hint: "Company" },
      { label: "Request quote", path: "/request-quote", hint: "Project orders" },
    ],
  },
};

export function getGalleryPageCopy(locale: Locale): GalleryPageCopy {
  return locale === "fa" ? copyFa : copyEn;
}

export const gallerySeo = {
  fa: {
    title: "گالری کارخانه بوکان پایپ | تولید، آزمایشگاه و لوله پلی اتیلن",
    description:
      "تصاویر واقعی کارخانه بوکان پایپ، خطوط تولید لوله پلی اتیلن، آزمایشگاه کنترل کیفیت، محصولات، انبار و فرآیند بارگیری و ارسال.",
  },
  en: {
    title: "Bukan Pipe Factory Gallery | Production, Laboratory & HDPE Pipes",
    description:
      "Explore real images of Bukan Pipe's HDPE pipe manufacturing facility, production environment, quality control laboratory, warehouse and logistics operations.",
  },
} as const;
