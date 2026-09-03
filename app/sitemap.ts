import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/lib/config/routes";
import { canonicalUrl } from "@/lib/seo/canonical";

/**
 * Sitemap enumerates implemented routes intended for indexing at launch.
 * Deferred and unimplemented planned URLs are excluded.
 * Robots still noindex the whole site until NEXT_PUBLIC_ALLOW_INDEXING=true.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((route) => ({
    url: canonicalUrl(route.path),
  }));
}
