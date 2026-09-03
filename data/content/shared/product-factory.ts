import type { ContentBlock, ContentDocument } from "@/content/models/content-document";
import type { Locale } from "@/lib/i18n/config";

type ProductSeed = {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  overview: string;
  advantages: readonly string[];
  applications: readonly string[];
  standardsNote: string;
  qualityNote: string;
  relatedProducts: readonly string[];
  relatedArticles: readonly string[];
  relatedApplications: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  specCta?: string;
  references?: readonly string[];
};

function productBlocks(seed: ProductSeed): readonly ContentBlock[] {
  return [
    { type: "paragraph", text: seed.overview },
    { type: "heading", level: 2, text: "مزایای فنی" },
    { type: "list", items: seed.advantages },
    { type: "heading", level: 2, text: "کاربردهای رایج" },
    { type: "list", items: seed.applications },
    {
      type: "spec-cta",
      text:
        seed.specCta ??
        "برای دریافت جدول قطر، SDR، PN و وزن واحد طول متناسب با پروژه، با واحد فروش تماس بگیرید یا درخواست پیش‌فاکتور ثبت کنید.",
    },
    { type: "heading", level: 2, text: "استاندارد و انطباق پروژه" },
    { type: "paragraph", text: seed.standardsNote },
    { type: "heading", level: 2, text: "کنترل کیفیت" },
    { type: "paragraph", text: seed.qualityNote },
  ];
}

export function buildFaProduct(seed: ProductSeed): ContentDocument {
  return {
    id: seed.id,
    slug: seed.slug,
    path: `/products/${seed.slug}`,
    locale: "fa",
    kind: "product",
    title: seed.title,
    seoTitle: seed.seoTitle,
    seoDescription: seed.seoDescription,
    description: seed.description,
    primaryKeyword: seed.primaryKeyword,
    secondaryKeywords: seed.secondaryKeywords,
    status: "published",
    evidenceStatus: "candidate",
    verificationStatus: "legacy-claim",
    lastReviewed: "2026-09-03",
    references: seed.references ?? ["https://bukanpipe.com/about_us/"],
    breadcrumbs: [
      { label: "خانه", path: "/" },
      { label: "محصولات", path: "/products" },
      { label: seed.title, path: `/products/${seed.slug}` },
    ],
    sections: productBlocks(seed),
    faqs: seed.faqs.length > 0 ? seed.faqs : undefined,
    related: {
      products: seed.relatedProducts,
      applications: seed.relatedApplications,
      articles: seed.relatedArticles,
      laboratory: ["services", "test-scope"],
    },
    imageAlt: `${seed.title} — بوکان پایپ`,
  };
}

export function buildEnProduct(seed: ProductSeed): ContentDocument {
  const doc = buildFaProduct(seed);
  return {
    ...doc,
    locale: "en",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Products", path: "/products" },
      { label: seed.title, path: `/products/${seed.slug}` },
    ],
  };
}

export type { ProductSeed, Locale };
