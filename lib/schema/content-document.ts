import type { ContentDocument } from "@/content/models/content-document";
import { canonicalUrl } from "@/lib/seo/canonical";
import { getOgImageForContent } from "@/lib/seo/page-config";
import { siteConfig } from "@/lib/config/site";
import { omitUndefined } from "@/lib/schema/serialize";
import {
  breadcrumbListSchema,
  contentProductSchema,
  organizationSchema,
} from "@/lib/schema/builders";

export function contentDocumentSchemas(
  doc: ContentDocument,
  localePath: (path: string) => string,
): readonly Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [
    organizationSchema(),
    breadcrumbListSchema(
      doc.breadcrumbs.map((item) => ({
        name: item.label,
        path: localePath(item.path),
      })),
    ),
  ];

  if (doc.kind === "product") {
    const og = getOgImageForContent(doc);
    const imageUrl = `${siteConfig.siteUrl}${og.url}`;
    schemas.push(
      contentProductSchema({
        name: doc.title,
        description: doc.description,
        url: canonicalUrl(localePath(doc.path)),
        image: imageUrl,
        imageAlt: doc.heroImage?.alt ?? doc.imageAlt,
      }),
    );
  }

  if (doc.kind === "article" || doc.kind === "pillar") {
    schemas.push(
      omitUndefined({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: doc.title,
        description: doc.description,
        url: canonicalUrl(localePath(doc.path)),
        dateModified: doc.lastReviewed,
        inLanguage: doc.locale,
        author: {
          "@type": "Organization",
          name: siteConfig.brandName,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.brandName,
        },
      }),
    );
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
