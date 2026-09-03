import type { ContentDocument } from "@/content/models/content-document";
import type { Locale } from "@/lib/i18n/config";
import { getContentByPath, getPublishedContent } from "@/lib/content/registry";

function pathForRelation(
  key: keyof NonNullable<ContentDocument["related"]>,
  slug: string,
): string {
  if (key === "products") return `/products/${slug}`;
  if (key === "applications") return `/applications/${slug}`;
  if (key === "laboratory") return `/laboratory/${slug}`;
  if (key === "articles") {
    return slug === "polyethylene-pipe" ? "/polyethylene-pipe" : `/technical-center/${slug}`;
  }
  return `/${slug}`;
}

export function resolveRelatedLinks(
  locale: Locale,
  doc: ContentDocument,
): readonly { href: string; label: string; kind: string }[] {
  const related = doc.related;
  if (!related) return [];

  const links: { href: string; label: string; kind: string }[] = [];
  const entries: [keyof NonNullable<ContentDocument["related"]>, readonly string[] | undefined][] = [
    ["products", related.products],
    ["applications", related.applications],
    ["articles", related.articles],
    ["laboratory", related.laboratory],
  ];

  for (const [key, slugs] of entries) {
    if (!slugs) continue;
    for (const slug of slugs) {
      const target = getContentByPath(locale, pathForRelation(key, slug));
      if (target) {
        links.push({ href: target.path, label: target.title, kind: key });
      }
    }
  }

  return links;
}

export function getHubChildren(locale: Locale, hubPath: string): readonly ContentDocument[] {
  const prefix = hubPath === "/" ? "" : hubPath;
  return getPublishedContent(locale).filter((doc) => {
    if (!doc.path.startsWith(`${prefix}/`)) return false;
    const rest = doc.path.slice(prefix.length + 1);
    return rest.length > 0 && !rest.includes("/") && doc.kind !== "hub";
  });
}
