import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/lib/config/routes";
import { canonicalUrl } from "@/lib/seo/canonical";
import { imageSitemapAttachments } from "@/lib/seo/image-sitemap";

/**
 * Sitemap enumerates implemented routes intended for indexing at launch.
 * Image attachments stay empty until public pages publish stable photographs.
 * Robots still noindex the whole site until NEXT_PUBLIC_ALLOW_INDEXING=true.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((route) => ({
    url: canonicalUrl(route.path),
    ...imageSitemapAttachments(),
  }));
}
