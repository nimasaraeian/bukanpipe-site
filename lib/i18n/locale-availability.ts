import { getAllPublishedPaths, getContentByPath } from "@/lib/content/registry";
import { canonicalUrl } from "@/lib/seo/canonical";
import { locales, type Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const trimmed = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const extraStaticPaths = new Set<string>(["/request-quote", "/solutions", "/industries", "/gallery"]);

/**
 * Documents whose slug differs between locales, because the keyword people
 * search differs. Without this they would each be the only page at their path
 * and get no hreflang at all, instead of pointing at each other.
 */
const CROSS_LOCALE_PAIRS: readonly Record<Locale, string>[] = [
  {
    fa: "/technical-center/polyethylene-pipe-dimensions-table",
    en: "/technical-center/hdpe-pipe-dimensions-chart",
  },
];

/** The same document in another locale when the slug is not shared. */
export function counterpartPath(path: string, target: Locale): string | undefined {
  const normalized = normalizePath(path);
  const pair = CROSS_LOCALE_PAIRS.find((entry) =>
    locales.some((locale) => entry[locale] === normalized),
  );
  return pair?.[target];
}

/**
 * True when the locale has a real page at this path (no 404, no redirect-only stub).
 * Used for hreflang and locale switching.
 */
export function isPathAvailableInLocale(path: string, locale: Locale): boolean {
  const normalized = normalizePath(path);

  if (normalized === "/") {
    return true;
  }

  if (getContentByPath(locale, normalized)) {
    return true;
  }

  if (extraStaticPaths.has(normalized)) {
    return true;
  }

  return getAllPublishedPaths(locale).includes(normalized);
}

export function buildLanguageAlternates(path: string): Record<string, string> | undefined {
  const normalized = normalizePath(path);
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    const counterpart = counterpartPath(normalized, locale);
    if (counterpart) {
      languages[locale] = canonicalUrl(withLocale(counterpart, locale));
      continue;
    }
    if (isPathAvailableInLocale(normalized, locale)) {
      languages[locale] = canonicalUrl(withLocale(normalized, locale));
    }
  }

  if (Object.keys(languages).length <= 1) {
    return undefined;
  }

  const xDefault = languages.fa ?? languages.en;
  if (xDefault) {
    languages["x-default"] = xDefault;
  }

  return languages;
}
