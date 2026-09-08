import { faProducts } from "@/data/content/fa/products";
import { faApplications } from "@/data/content/fa/applications";
import { faLaboratoryPages } from "@/data/content/fa/laboratory";
import { faTechnicalArticles } from "@/data/content/fa/technical";
import { faCompanyPages } from "@/data/content/fa/company";
import {
  faDownloadsHub,
  faCalculatorHub,
  faCalculatorIndex,
} from "@/data/content/fa/downloads";
import type { ContentDocument } from "@/content/models/content-document";

export const faProductsHub: ContentDocument = {
  id: "products-hub",
  slug: "products",
  path: "/products",
  locale: "fa",
  kind: "hub",
  title: "محصولات لوله پلی اتیلن",
  seoTitle: "خرید لوله پلی اتیلن از کارخانه | محصولات HDPE | بوکان پایپ",
  seoDescription:
    "خرید لوله پلی اتیلن مستقیم از کارخانه بوکان پایپ: آبرسانی، گاز، آبیاری کشاورزی، صنعتی و PE100 — تولید HDPE تا ۶۳۰ میلی‌متر.",
  description: "کاتالوگ تولیدکننده لوله پلی اتیلن — خرید و تأمین از کارخانه.",
  primaryKeyword: "خرید لوله پلی اتیلن از کارخانه",
  secondaryKeywords: [
    "تامین کننده لوله پلی اتیلن",
    "تولید کننده لوله HDPE",
    "لوله پلی اتیلن PE100",
  ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-05",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "محصولات", path: "/products" },
  ],
  sections: [
    {
      type: "definition",
      term: "تأمین از کارخانه",
      text: "بوکان پایپ به‌عنوان تولیدکننده لوله پلی اتیلن، هر خانواده محصول را با مشخصات فنی، QC و پشتیبانی فروش مستقیم عرضه می‌کند.",
    },
    {
      type: "internal-links",
      title: "محصولات اصلی",
      links: [
        { label: "لوله پلی اتیلن آبرسانی", path: "/products/water-supply-pipe" },
        { label: "لوله پلی اتیلن گاز", path: "/products/gas-pipe" },
        { label: "لوله آبیاری پلی اتیلن", path: "/products/irrigation-pipe" },
        { label: "لوله پلی اتیلن صنعتی", path: "/products/industrial-pipe" },
        { label: "لوله پلی اتیلن PE100", path: "/products/pe100-pipe" },
      ],
    },
    {
      type: "internal-links",
      title: "راهنما و استعلام",
      links: [
        { label: "استعلام قیمت", path: "/request-quote" },
        { label: "مرکز فنی", path: "/technical-center" },
        { label: "کارخانه تولید", path: "/about" },
        { label: "گالری کارخانه", path: "/gallery" },
      ],
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe", "pe100-pipe"],
    articles: ["pe100-technical-guide", "hdpe-installation-guide", "polyethylene-pipe"],
  },
};

export const faApplicationsHub: ContentDocument = {
  id: "applications-hub",
  slug: "applications",
  path: "/applications",
  locale: "fa",
  kind: "hub",
  title: "کاربرد لوله پلی اتیلن",
  seoTitle: "کاربرد لوله پلی اتیلن | آب، گاز، کشاورزی و صنعت | بوکان پایپ",
  seoDescription:
    "کاربرد لوله پلی اتیلن در آبرسانی، گازرسانی، آبیاری کشاورزی، فاضلاب و صنعت — راهنمای انتخاب + لینک محصولات کارخانه.",
  description: "کاربردهای شبکه لوله HDPE و PE.",
  primaryKeyword: "کاربرد لوله پلی اتیلن",
  secondaryKeywords: [
    "لوله پلی اتیلن آبرسانی",
    "لوله پلی اتیلن کشاورزی",
    "لوله پلی اتیلن صنعتی",
  ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-05",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "کاربردها", path: "/applications" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "هر کاربرد ملاحظات طراحی مخصوص دارد. صفحات کاربرد برای intent اطلاعاتی است؛ مشخصات فنی و خرید در صفحات محصول و استعلام قیمت.",
    },
    {
      type: "internal-links",
      title: "کاربردهای اصلی",
      links: [
        { label: "انتقال آب", path: "/applications/water-transfer" },
        { label: "آبیاری کشاورزی", path: "/applications/agriculture-irrigation" },
        { label: "گازرسانی", path: "/applications/gas-distribution" },
        { label: "صنعتی", path: "/applications/industrial" },
      ],
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe"],
    articles: ["hdpe-pipe-what-is", "polyethylene-pipe-standards"],
  },
};

export const contentCatalogFa: readonly ContentDocument[] = [
  faProductsHub,
  ...faProducts,
  faApplicationsHub,
  ...faApplications,
  ...faLaboratoryPages,
  ...faTechnicalArticles,
  ...faCompanyPages,
  faDownloadsHub,
  faCalculatorIndex,
  faCalculatorHub,
];
