import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo/canonical";

export type PageImageRef = {
  path: string;
  src: string;
};

/**
 * Image sitemap entries attach only when a public page publishes a stable,
 * indexable photograph. Foundation routes currently have none.
 */
export function imageSitemapAttachments(
  _pageImages: readonly PageImageRef[] = [],
): Pick<MetadataRoute.Sitemap[number], "images"> | undefined {
  const images = _pageImages.map((item) =>
    item.src.startsWith("http") ? item.src : canonicalUrl(item.src),
  );
  return images.length > 0 ? { images } : undefined;
}
