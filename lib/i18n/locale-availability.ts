import { contentCatalogEn } from "@/data/content/en/catalog";
import { getAllPublishedPaths, getContentByPath } from "@/lib/content/registry";
import { canonicalUrl } from "@/lib/seo/canonical";
import { locales, type Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const trimmed = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const enAvailablePaths = (() => {
  const paths = new Set<string>(["/", "/products", "/request-quote"]);
  for (const doc of contentCatalogEn) {
    paths.add(doc.path);
  }
  return paths;
})();

const faExtraStaticPaths = new Set<string>(["/request-quote"]);

/**
 * True when the locale has a real page at this path (no 404, no redirect-only stub).
 * Used for hreflang and locale switching — EN is intentionally narrow.
 */
export function isPathAvailableInLocale(path: string, locale: Locale): boolean {
  const normalized = normalizePath(path);

  if (normalized === "/") {
    return true;
  }

  if (getContentByPath(locale, normalized)) {
    return true;
  }

  if (locale === "fa") {
    if (faExtraStaticPaths.has(normalized)) return true;
    return getAllPublishedPaths("fa").includes(normalized);
  }

  return enAvailablePaths.has(normalized);
}

export function buildLanguageAlternates(path: string): Record<string, string> | undefined {
  const normalized = normalizePath(path);
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    if (isPathAvailableInLocale(normalized, locale)) {
      languages[locale] = canonicalUrl(withLocale(normalized, locale));
    }
  }

  if (Object.keys(languages).length <= 1) {
    return undefined;
  }

  return languages;
}
