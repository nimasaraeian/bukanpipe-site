import type { Metadata } from "next";
import type { ContentDocument } from "@/content/models/content-document";
import type { Locale } from "@/lib/i18n/config";
import { createPageMetadata } from "@/lib/seo/metadata";

export function createContentMetadata(
  doc: ContentDocument,
  locale: Locale,
): Metadata {
  return createPageMetadata({
    title: doc.seoTitle,
    description: doc.seoDescription,
    path: doc.path,
    locale,
    keywords: [doc.primaryKeyword, ...doc.secondaryKeywords],
    ogImage: doc.imageAlt
      ? {
          url: "/media/demo/bukan-slide-03-product.png",
          width: 1200,
          height: 630,
          alt: doc.imageAlt,
        }
      : undefined,
  });
}
