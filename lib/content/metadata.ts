import type { Metadata } from "next";
import type { ContentDocument } from "@/content/models/content-document";
import type { Locale } from "@/lib/i18n/config";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getOgImageForContent } from "@/lib/seo/page-config";

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
    ogImage: getOgImageForContent(doc),
    titleAbsolute: doc.seoTitle.includes("|"),
  });
}
