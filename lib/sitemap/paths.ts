import { getAllPublishedPaths } from "@/lib/content/registry";
import { routes } from "@/lib/config/routes";
import type { Locale } from "@/lib/i18n/config";

const EXTRA_SITEMAP_PATHS = [
  "/",
  "/request-quote",
  routes.solutions.path,
  routes.industries.path,
] as const;

/**
 * Canonical public URLs per locale for sitemap.xml.
 * Excludes redirect stubs, noindex placeholders, and design-system.
 */
export function getSitemapPathsForLocale(locale: Locale): readonly string[] {
  const paths = new Set<string>(getAllPublishedPaths(locale));

  for (const path of EXTRA_SITEMAP_PATHS) {
    paths.add(path);
  }

  return [...paths].sort();
}

export function sitemapPriorityForPath(path: string): number {
  if (path === "/") return 1;
  if (path === "/products" || path === "/polyethylene-pipe") return 0.9;
  if (path.startsWith("/products/")) return 0.85;
  if (path === "/applications" || path === "/laboratory" || path === "/technical-center") {
    return 0.85;
  }
  if (path === "/about" || path === "/contact" || path === "/request-quote") return 0.8;
  return 0.7;
}

export function sitemapChangeFrequencyForPath(
  path: string,
): "weekly" | "monthly" | "yearly" {
  if (path === "/" || path === "/products") return "weekly";
  if (path.startsWith("/technical-center")) return "monthly";
  return "monthly";
}
