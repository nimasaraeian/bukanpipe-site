import { getAllPublishedPaths } from "@/lib/content/registry";
import type { Locale } from "@/lib/i18n/config";

/**
 * Canonical public URLs per locale for sitemap.xml.
 * Excludes redirect stubs and placeholder hubs.
 */
export function getSitemapPathsForLocale(locale: Locale): readonly string[] {
  const paths = new Set<string>(getAllPublishedPaths(locale));
  paths.add("/request-quote");
  return [...paths].sort();
}
