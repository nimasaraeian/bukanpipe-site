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
  title: "محصولات",
  seoTitle: "محصولات لوله پلی اتیلن | بوکان پایپ",
  seoDescription:
    "لوله پلی‌اتیلن آبرسانی، گاز، فاضلاب، زهکشی، آبیاری و PE100 — کاتالوگ تجاری بوکان پایپ.",
  description: "کاتالوگ محصولات لوله PE.",
  primaryKeyword: "لوله پلی اتیلن",
  secondaryKeywords: ["خرید لوله پلی اتیلن", "تولید کننده لوله پلی اتیلن"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "محصولات", path: "/products" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "هر محصول صفحه تجاری مستقل دارد. مشخصات فنی پس از تأیید کارخانه تکمیل می‌شود.",
    },
  ],
  related: { articles: ["polyethylene-pipe"] },
};

export const faApplicationsHub: ContentDocument = {
  id: "applications-hub",
  slug: "applications",
  path: "/applications",
  locale: "fa",
  kind: "hub",
  title: "کاربردها",
  seoTitle: "کاربرد لوله پلی اتیلن | بوکان پایپ",
  seoDescription: "کاربردهای صنعتی لوله PE: آب، گاز، کشاورزی، فاضلاب و صنعت.",
  description: "کاربردهای شبکه لوله پلی‌اتیلن.",
  primaryKeyword: "کاربرد لوله پلی اتیلن",
  secondaryKeywords: [],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "کاربردها", path: "/applications" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "کاربردها از صفحات محصول جدا هستند تا intent جستجو حفظ شود.",
    },
  ],
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
