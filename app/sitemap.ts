import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";
import { sitemapRoutes } from "@/lib/config/routes";
import { canonicalUrl } from "@/lib/seo/canonical";
import { imageSitemapAttachments } from "@/lib/seo/image-sitemap";

/**
 * Sitemap enumerates implemented routes intended for indexing at launch.
 * Image attachments stay empty until public pages publish stable photographs.
 * Robots still noindex the whole site until NEXT_PUBLIC_ALLOW_INDEXING=true.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    sitemapRoutes.map((route) => ({
      url: canonicalUrl(withLocale(route.path, locale)),
      ...imageSitemapAttachments(),
    })),
  );
}
