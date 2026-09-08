import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";
import {
  getSitemapPathsForLocale,
  sitemapChangeFrequencyForPath,
  sitemapPriorityForPath,
} from "@/lib/sitemap/paths";
import { canonicalUrl } from "@/lib/seo/canonical";
import { imageSitemapAttachments } from "@/lib/seo/image-sitemap";
import { getGallerySitemapImageUrls } from "@/data/gallery";

/**
 * Sitemap enumerates canonical public URLs per locale (EN + FA).
 * Homepage, catalog content, solutions, industries, and request-quote included.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const galleryImages = getGallerySitemapImageUrls();

  const entries = locales.flatMap((locale) =>
    getSitemapPathsForLocale(locale as Locale).map((path) => ({
      url: canonicalUrl(withLocale(path, locale)),
      changeFrequency: sitemapChangeFrequencyForPath(path),
      priority: sitemapPriorityForPath(path),
      ...imageSitemapAttachments(
        path === "/gallery"
          ? galleryImages.map((src) => ({ path: "/gallery", src }))
          : [],
      ),
    })),
  );

  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
