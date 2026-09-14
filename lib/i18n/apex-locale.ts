import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Cookie-less `/` must match hreflang x-default (Persian).
 * `/fa` and `/en` stay the canonical locale homepages — this only affects the apex path.
 */
export const apexFallbackLocale: Locale = "fa";

export function localeForUnprefixedPath(
  pathname: string,
  cookieLocale: string | undefined,
): Locale {
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }
  if (pathname === "/") {
    return apexFallbackLocale;
  }
  return defaultLocale;
}
