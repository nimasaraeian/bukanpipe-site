import type { ContentDocument } from "@/content/models/content-document";
import { canonicalUrl } from "@/lib/seo/canonical";
import { omitUndefined } from "@/lib/schema/serialize";
import {
  breadcrumbListSchema,
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
    schemas.push(
      omitUndefined({
        "@context": "https://schema.org",
        "@type": "Product",
        name: doc.title,
        description: doc.description,
        url: canonicalUrl(localePath(doc.path)),
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
