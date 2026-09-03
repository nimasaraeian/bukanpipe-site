import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/config/routes";
import { canonicalUrl } from "@/lib/seo/canonical";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: canonicalUrl(route.path),
  }));
}
