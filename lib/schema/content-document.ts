import type { ContentDocument } from "@/content/models/content-document";
import { canonicalUrl } from "@/lib/seo/canonical";
import { getOgImageForContent } from "@/lib/seo/page-config";
import { siteConfig } from "@/lib/config/site";
import { omitUndefined } from "@/lib/schema/serialize";
import {
  breadcrumbListSchema,
  contentProductSchema,
  organizationRef,
} from "@/lib/schema/builders";
import {
  additionalPropertiesOf,
  materialOf,
  specRowsOf,
} from "@/lib/schema/product-properties";

/**
 * A page that teaches rather than sells. TechArticle is the narrower type and
 * the accurate one for the technical centre: these are engineering notes with
 * dimension tables and standard numbers, not news and not blog posts.
 */
function isTechnical(doc: ContentDocument): boolean {
  return (
    doc.path.startsWith("/technical-center") ||
    /* a size page is a dimension table for one diameter — documentation, not an article */
    doc.path.startsWith("/pipe-size/") ||
    doc.kind === "pillar"
  );
}

function articleSchemaFor(doc: ContentDocument, localePath: (path: string) => string) {
  return omitUndefined({
    "@context": "https://schema.org",
    "@type": isTechnical(doc) ? "TechArticle" : "Article",
    headline: doc.title,
    description: doc.description,
    url: canonicalUrl(localePath(doc.path)),
    datePublished: doc.publishedAt,
    dateModified: doc.lastReviewed,
    inLanguage: doc.locale,
    /*
     * The company is the author. These pages carry no byline, and inventing
     * one — or naming an engineer the page does not name — would be a claim
     * about a person that the site does not make.
     */
    author: organizationRef(),
    publisher: organizationRef(),
    isPartOf: { "@id": `${siteConfig.siteUrl}/#website` },
  });
}

export function contentDocumentSchemas(
  doc: ContentDocument,
  localePath: (path: string) => string,
): readonly Record<string, unknown>[] {
  /*
   * The company node is not repeated here. The locale layout emits it on
   * every page, and everything below points at it by @id instead of
   * describing the same company a second time with slightly different words.
   */
  const schemas: Record<string, unknown>[] = [
    breadcrumbListSchema(
      doc.breadcrumbs.map((item) => ({
        name: item.label,
        path: localePath(item.path),
      })),
    ),
  ];

  if (doc.kind === "product") {
    const og = getOgImageForContent(doc);
    const rows = specRowsOf(doc.sections);
    schemas.push(
      contentProductSchema({
        name: doc.title,
        description: doc.description,
        url: canonicalUrl(localePath(doc.path)),
        image: `${siteConfig.siteUrl}${og.url}`,
        imageAlt: doc.heroImage?.alt ?? doc.imageAlt,
        category: "HDPE polyethylene pipe",
        material: materialOf(rows),
        additionalProperty: additionalPropertiesOf(rows),
      }),
    );
  }

  if (doc.kind === "article" || doc.kind === "pillar") {
    schemas.push(articleSchemaFor(doc, localePath));
  }

  if (doc.faqs && doc.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: doc.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
}
