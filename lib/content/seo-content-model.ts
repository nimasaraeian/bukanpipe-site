import type {
  ContentBlock,
  ContentDocument,
  ContentFaq,
  ContentHeroImage,
} from "@/content/models/content-document";
import type { Locale } from "@/lib/i18n/config";
import { productSystemAssets } from "@/lib/products/product-assets";

/** Factory-verified production facts — safe for public spec tables. */
export const factoryProductionFacts = {
  en: {
    productionRange: "16 mm to 630 mm, pressure rating 2.5 to 25 bar (depending on grade and SDR)",
    type: "Single-wall HDPE extrusion",
    since: "Manufacturing since 1997",
    location: "Bukan, West Azerbaijan, Iran",
  },
  fa: {
    productionRange: "از سایز ۱۶ تا ۶۳۰ میلی‌متر، فشار کاری ۲.۵ تا ۲۵ بار (بسته به گرید و SDR)",
    type: "اکستروژن تک‌جداره HDPE",
    since: "تولید از سال ۱۳۷۶",
    location: "بوکان، آذربایجان غربی، ایران",
  },
} as const;

export type SeoProductSeed = {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  definition: string;
  overview: string;
  advantages: readonly string[];
  applications: readonly string[];
  specifications: readonly { label: string; value: string }[];
  specNote?: string;
  standardsNote: string;
  qualityNote: string;
  relatedProducts: readonly string[];
  relatedArticles: readonly string[];
  relatedApplications: readonly string[];
  faqs: readonly ContentFaq[];
  curatedLinks: readonly { label: string; path: string; hint?: string }[];
  specCta?: string;
  extraSections?: readonly ContentBlock[];
  lastReviewed?: string;
  references?: readonly string[];
  heroImage: ContentHeroImage;
};

export type SeoArticleSeed = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  definition: string;
  sections: readonly ContentBlock[];
  related: ContentDocument["related"];
  references?: readonly string[];
  faqs?: readonly ContentFaq[];
  curatedLinks?: readonly { label: string; path: string; hint?: string }[];
  lastReviewed?: string;
};

const labels = {
  en: {
    definition: "What is it?",
    specs: "Technical specifications",
    advantages: "Technical advantages",
    applications: "Typical applications",
    standards: "Standards and project compliance",
    quality: "Quality control",
    explore: "Related resources",
    qualityAndQuote: "Laboratory, certifications and quote",
    specDefault:
      "Contact sales or request a quote for diameter, SDR, PN and weight-per-metre tables matched to your project.",
  },
  fa: {
    definition: "تعریف",
    specs: "مشخصات فنی",
    advantages: "مزایای فنی",
    applications: "کاربردهای رایج",
    standards: "استاندارد و انطباق پروژه",
    quality: "کنترل کیفیت",
    explore: "منابع مرتبط",
    qualityAndQuote: "آزمایشگاه، گواهی‌ها و استعلام",
    specDefault:
      "برای دریافت جدول قطر، SDR، PN و وزن واحد طول متناسب با پروژه، با واحد فروش تماس بگیرید یا درخواست پیش‌فاکتور ثبت کنید.",
  },
} as const;

export function buildSeoProductBlocks(
  locale: Locale,
  seed: Pick<
    SeoProductSeed,
    | "definition"
    | "overview"
    | "advantages"
    | "applications"
    | "specifications"
    | "specNote"
    | "standardsNote"
    | "qualityNote"
    | "curatedLinks"
    | "specCta"
    | "extraSections"
  >,
): readonly ContentBlock[] {
  const L = labels[locale];
  const blocks: ContentBlock[] = [
    { type: "definition", term: L.definition, text: seed.definition },
    { type: "paragraph", text: seed.overview },
    {
      type: "spec-table",
      title: L.specs,
      rows: seed.specifications,
      note: seed.specNote,
    },
    { type: "heading", level: 2, text: L.advantages },
    { type: "list", items: seed.advantages },
    { type: "heading", level: 2, text: L.applications },
    { type: "list", items: seed.applications },
    ...(seed.extraSections ?? []),
    {
      type: "internal-links",
      title: L.explore,
      links: seed.curatedLinks,
    },
    { type: "spec-cta", text: seed.specCta ?? L.specDefault },
    { type: "heading", level: 2, text: L.standards },
    { type: "paragraph", text: seed.standardsNote },
    { type: "heading", level: 2, text: L.quality },
    { type: "paragraph", text: seed.qualityNote },
    {
      type: "internal-links",
      title: L.qualityAndQuote,
      links:
        locale === "fa"
          ? [
              { label: "آزمایشگاه", path: "/laboratory" },
              { label: "گواهی‌ها", path: "/certifications" },
              { label: "استعلام قیمت", path: "/request-quote" },
            ]
          : [
              { label: "Laboratory", path: "/laboratory" },
              { label: "Certifications", path: "/certifications" },
              { label: "Request a quote", path: "/request-quote" },
            ],
    },
  ];
  return blocks;
}

export function buildSeoProductDocument(locale: Locale, seed: SeoProductSeed): ContentDocument {
  const home = locale === "fa" ? "خانه" : "Home";
  const products = locale === "fa" ? "محصولات" : "Products";

  return {
    id: seed.id,
    slug: seed.slug,
    path: `/products/${seed.slug}`,
    locale,
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
    lastReviewed: seed.lastReviewed ?? "2026-09-05",
    references: seed.references ?? ["https://bukanpipe.com/about_us/"],
    breadcrumbs: [
      { label: home, path: "/" },
      { label: products, path: "/products" },
      { label: seed.title, path: `/products/${seed.slug}` },
    ],
    sections: buildSeoProductBlocks(locale, seed),
    faqs: seed.faqs.length > 0 ? seed.faqs : undefined,
    related: {
      products: seed.relatedProducts,
      applications: seed.relatedApplications,
      articles: seed.relatedArticles,
      laboratory: ["services", "test-scope"],
    },
    imageAlt: seed.heroImage.alt,
    heroImage: seed.heroImage,
  };
}

export function buildSeoArticleDocument(
  locale: Locale,
  seed: SeoArticleSeed,
): ContentDocument {
  const home = locale === "fa" ? "خانه" : "Home";
  const hub = locale === "fa" ? "مرکز فنی" : "Technical Center";
  const blocks: ContentBlock[] = [
    { type: "definition", term: labels[locale].definition, text: seed.definition },
    ...seed.sections,
  ];

  if (seed.curatedLinks && seed.curatedLinks.length > 0) {
    blocks.push({
      type: "internal-links",
      title: labels[locale].explore,
      links: seed.curatedLinks,
    });
  }

  return {
    id: `article-${seed.slug}`,
    slug: seed.slug,
    path: `/technical-center/${seed.slug}`,
    locale,
    kind: "article",
    title: seed.title,
    seoTitle: seed.seoTitle,
    seoDescription: seed.seoDescription,
    description: seed.description,
    primaryKeyword: seed.primaryKeyword,
    secondaryKeywords: seed.secondaryKeywords,
    status: "published",
    evidenceStatus: "candidate",
    verificationStatus: "legacy-claim",
    lastReviewed: seed.lastReviewed ?? "2026-09-05",
    references: seed.references,
    breadcrumbs: [
      { label: home, path: "/" },
      { label: hub, path: "/technical-center" },
      { label: seed.title, path: `/technical-center/${seed.slug}` },
    ],
    sections: blocks,
    related: seed.related,
    faqs: seed.faqs,
  };
}

export function baseProductSpecRows(
  locale: Locale,
  extra: readonly { label: string; value: string }[] = [],
): readonly { label: string; value: string }[] {
  const f = factoryProductionFacts[locale];
  const L =
    locale === "fa"
      ? {
          pipeType: "نوع لوله",
          productionRange: "محدوده تولید",
          factory: "تولیدکننده",
        }
      : {
          pipeType: "Pipe type",
          productionRange: "Production range",
          factory: "Manufacturer",
        };

  return [
    { label: L.pipeType, value: f.type },
    { label: L.productionRange, value: f.productionRange },
    ...extra,
    {
      label: L.factory,
      value: `Bukan Pipe — ${f.location}. ${f.since}.`,
    },
  ];
}

export const seoLandingPaths = {
  water: "/products/water-supply-pipe",
  gas: "/products/gas-pipe",
  irrigation: "/products/irrigation-pipe",
  industrial: "/products/industrial-pipe",
  pe100: "/products/pe100-pipe",
  pe100Guide: "/technical-center/pe100-technical-guide",
  installGuide: "/technical-center/hdpe-installation-guide",
  welding: "/technical-center/polyethylene-pipe-welding",
  temperature: "/technical-center/polyethylene-pipe-temperature-pressure",
  pillar: "/polyethylene-pipe",
} as const;

export const seoProductHeroImages = {
  water: {
    src: productSystemAssets.water,
    alt: "HDPE water supply pipe with BUKAN PIPE branding — PE100 manufacturing",
    title: "Water HDPE Pipes",
    width: 1200,
    height: 675,
  },
  gas: {
    src: productSystemAssets.gas,
    alt: "HDPE gas distribution pipe — electrofusion-ready PE pipe",
    title: "Gas HDPE Pipes",
    width: 1200,
    height: 675,
  },
  irrigation: {
    src: productSystemAssets.irrigation,
    alt: "HDPE irrigation pipe for agricultural pressurised water mains",
    title: "Irrigation HDPE Pipes",
    width: 1200,
    height: 675,
  },
  industrial: {
    src: productSystemAssets.pe100,
    alt: "Industrial HDPE pipe for process fluid transfer networks",
    title: "Industrial HDPE Pipes",
    width: 1200,
    height: 675,
  },
  pe100: {
    src: productSystemAssets.pe100,
    alt: "PE100 HDPE pressure pipe — higher MRS grade polyethylene",
    title: "PE100 Pipe",
    width: 1200,
    height: 675,
  },
  sewer: {
    src: productSystemAssets.sewer,
    alt: "HDPE sewer pipe for wastewater collection networks",
    title: "HDPE Sewer Pipe",
    width: 1200,
    height: 675,
  },
  drainage: {
    src: productSystemAssets.drainage,
    alt: "HDPE drainage pipe for stormwater and surface runoff",
    title: "HDPE Drainage Pipe",
    width: 1200,
    height: 675,
  },
} as const;
