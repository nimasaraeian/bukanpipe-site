import { locales } from "@/lib/i18n/config";
import { NOINDEX_PATHS } from "@/lib/seo/page-config";

/** robots.txt Disallow entries that match locale-prefixed production URLs. */
export function getIndexableRobotsDisallowPaths(): readonly string[] {
  const bare = [...NOINDEX_PATHS];
  const prefixed = locales.flatMap((locale) => bare.map((path) => `/${locale}${path}`));
  return [...bare, ...prefixed];
}
