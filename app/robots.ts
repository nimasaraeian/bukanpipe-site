import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { getIndexableRobotsDisallowPaths } from "@/lib/seo/robots-disallow";

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.allowIndexing) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      host: siteConfig.siteUrl,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...getIndexableRobotsDisallowPaths()],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
