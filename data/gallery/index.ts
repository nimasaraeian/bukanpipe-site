import manifestJson from "@/data/gallery/gallery-manifest.json";
import type { GalleryCategory, GalleryImage, GalleryManifest } from "@/data/gallery/types";

export const galleryManifest = manifestJson as GalleryManifest;

export function getGalleryImages(): readonly GalleryImage[] {
  return galleryManifest.images;
}

export function getGalleryCategories(): GalleryManifest["stats"]["categories"] {
  return galleryManifest.stats.categories;
}

export function getGalleryHero(): GalleryManifest["hero"] {
  return galleryManifest.hero;
}

export function getGalleryOgImage(): GalleryManifest["ogImage"] {
  return galleryManifest.ogImage;
}

export function getFeaturedGalleryImages(): GalleryImage[] {
  return galleryManifest.images.filter((img) => img.featured);
}

export function getGalleryImagesByCategory(category: GalleryCategory | "all"): GalleryImage[] {
  if (category === "all") return [...galleryManifest.images];
  return galleryManifest.images.filter((img) => img.category === category);
}

export function getGalleryImageById(id: string): GalleryImage | undefined {
  return galleryManifest.images.find((img) => img.id === id);
}

/** Stable public URLs for sitemap image attachments on /gallery pages. */
export function getGallerySitemapImageUrls(): string[] {
  return galleryManifest.images.map((img) => img.src);
}

export function getGalleryStats() {
  return galleryManifest.stats;
}
