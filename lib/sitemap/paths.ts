import { contentCatalogEn } from "@/data/content/en/catalog";
import { getAllPublishedPaths } from "@/lib/content/registry";
import type { Locale } from "@/lib/i18n/config";

/**
 * Canonical public URLs per locale for sitemap.xml.
 * Excludes redirect stubs, placeholder hubs, and EN routes that 404.
 */
export function getSitemapPathsForLocale(locale: Locale): readonly string[] {
  if (locale === "en") {
    const paths = new Set<string>(["/", "/products", "/request-quote"]);
    for (const doc of contentCatalogEn) {
      paths.add(doc.path);
    }
    return [...paths].sort();
  }

  const paths = new Set<string>(getAllPublishedPaths("fa"));
  paths.add("/request-quote");
  return [...paths].sort();
}
