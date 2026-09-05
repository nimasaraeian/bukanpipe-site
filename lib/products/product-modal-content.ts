import type { ContentBlock } from "@/content/models/content-document";
import type { Locale } from "@/lib/i18n/config";
import { enProducts } from "@/data/content/en/products";
import { faProducts } from "@/data/content/fa/products";

export type ProductModalContent = {
  productTitle: string;
  overview: string;
  advantages: readonly string[];
  applications: readonly string[];
  standardsNote: string;
  qualityNote: string;
};

const enHeadings = {
  advantages: "Technical advantages",
  applications: "Typical applications",
  standards: "Standards and project compliance",
  quality: "Quality control",
} as const;

const faHeadings = {
  advantages: "مزایای فنی",
  applications: "کاربردهای رایج",
  standards: "استاندارد و انطباق پروژه",
  quality: "کنترل کیفیت",
} as const;

function listAfterHeading(blocks: readonly ContentBlock[], heading: string): readonly string[] {
  const index = blocks.findIndex(
    (block) => block.type === "heading" && block.text === heading,
  );
  if (index === -1) return [];
  const next = blocks[index + 1];
  return next?.type === "list" ? next.items : [];
}

function paragraphAfterHeading(blocks: readonly ContentBlock[], heading: string): string {
  const index = blocks.findIndex(
    (block) => block.type === "heading" && block.text === heading,
  );
  if (index === -1) return "";
  const next = blocks[index + 1];
  return next?.type === "paragraph" ? next.text : "";
}

export function getProductModalContent(slug: string, locale: Locale): ProductModalContent | null {
  const headings = locale === "fa" ? faHeadings : enHeadings;
  const catalog = locale === "fa" ? faProducts : enProducts;
  const doc = catalog.find((product) => product.slug === slug);
  if (!doc) return null;

  const overviewBlock = doc.sections.find((block) => block.type === "paragraph");
  const overview = overviewBlock?.type === "paragraph" ? overviewBlock.text : doc.description;

  return {
    productTitle: doc.title,
    overview,
    advantages: listAfterHeading(doc.sections, headings.advantages),
    applications: listAfterHeading(doc.sections, headings.applications),
    standardsNote: paragraphAfterHeading(doc.sections, headings.standards),
    qualityNote: paragraphAfterHeading(doc.sections, headings.quality),
  };
}
