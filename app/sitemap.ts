import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";
import { getSitemapPathsForLocale } from "@/lib/sitemap/paths";
import { canonicalUrl } from "@/lib/seo/canonical";
import { imageSitemapAttachments } from "@/lib/seo/image-sitemap";

/**
 * Sitemap enumerates canonical public URLs per locale.
 * FA: published content + request-quote. EN: home, products hub, and EN catalog only.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries = locales.flatMap((locale) =>
    getSitemapPathsForLocale(locale as Locale).map((path) => ({
      url: canonicalUrl(withLocale(path, locale)),
      ...imageSitemapAttachments(),
    })),
  );

  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
