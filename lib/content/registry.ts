import type { ContentDocument, ContentKind } from "@/content/models/content-document";
import type { Locale } from "@/lib/i18n/config";
import { contentCatalogFa } from "@/data/content/fa/catalog";
import { contentCatalogEn } from "@/data/content/en/catalog";

const catalogs: Record<Locale, readonly ContentDocument[]> = {
  fa: contentCatalogFa,
  en: contentCatalogEn,
};

export function getContentCatalog(locale: Locale): readonly ContentDocument[] {
  return catalogs[locale];
}

export function getPublishedContent(
  locale: Locale,
  kind?: ContentKind,
): readonly ContentDocument[] {
  return getContentCatalog(locale).filter(
    (doc) => doc.status === "published" && (kind ? doc.kind === kind : true),
  );
}

export function getContentByPath(locale: Locale, path: string): ContentDocument | undefined {
  const normalized = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return getContentCatalog(locale).find((doc) => doc.path === normalized);
}

export function getContentBySlug(
  locale: Locale,
  kind: ContentKind,
  slug: string,
): ContentDocument | undefined {
  return getPublishedContent(locale, kind).find((doc) => doc.slug === slug);
}

export function getContentChildren(
  locale: Locale,
  parentPath: string,
): readonly ContentDocument[] {
  const prefix = parentPath === "/" ? "" : parentPath;
  return getPublishedContent(locale).filter(
    (doc) =>
      doc.path.startsWith(`${prefix}/`) &&
      doc.path !== prefix &&
      doc.path.slice(prefix.length + 1).split("/").length === 1,
  );
}

export function getAllPublishedPaths(locale: Locale): readonly string[] {
  return getPublishedContent(locale).map((doc) => doc.path);
}
