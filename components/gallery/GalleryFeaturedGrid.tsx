"use client";

import type { GalleryCategory, GalleryImage } from "@/data/gallery/types";
import { GalleryFigure } from "@/components/gallery/GalleryFigure";

const LAYOUTS = [
  "gallery-featured__item--hero",
  "gallery-featured__item--support-a",
  "gallery-featured__item--support-b",
  "gallery-featured__item--panorama",
  "gallery-featured__item--tall",
  "gallery-featured__item--wide",
  "gallery-featured__item--support-a",
  "gallery-featured__item--support-b",
] as const;

type GalleryFeaturedGridProps = {
  locale: "fa" | "en";
  images: readonly GalleryImage[];
  activeCategory: GalleryCategory | "all";
  categoryLabel: (id: GalleryCategory) => string;
  onOpen: (id: string) => void;
};

export function GalleryFeaturedGrid({
  locale,
  images,
  activeCategory,
  categoryLabel,
  onOpen,
}: GalleryFeaturedGridProps) {
  const visible =
    activeCategory === "all" ? images : images.filter((img) => img.category === activeCategory);

  if (visible.length === 0) return null;

  return (
    <div className="gallery-featured">
      {visible.slice(0, LAYOUTS.length).map((image, index) => (
        <GalleryFigure
          key={image.id}
          image={image}
          locale={locale}
          categoryLabel={categoryLabel(image.category)}
          onOpen={onOpen}
          layoutClass={LAYOUTS[index] ?? "gallery-featured__item--support-a"}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}
