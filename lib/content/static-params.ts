import type { Locale } from "@/lib/i18n/config";
import type { ContentKind } from "@/content/models/content-document";
import { getPublishedContent } from "@/lib/content/registry";

export function contentSlugsForKind(locale: Locale, kind: ContentKind): readonly string[] {
  return getPublishedContent(locale, kind)
    .filter((doc) => doc.path.split("/").length > 2)
    .map((doc) => doc.slug);
}
