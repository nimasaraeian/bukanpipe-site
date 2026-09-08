"use client";

import type { GalleryCategory, GalleryImage } from "@/data/gallery/types";
import { GalleryFigure } from "@/components/gallery/GalleryFigure";

type GalleryFullGridProps = {
  locale: "fa" | "en";
  images: readonly GalleryImage[];
  activeCategory: GalleryCategory | "all";
  categoryLabel: (id: GalleryCategory) => string;
  onOpen: (id: string) => void;
};

export function GalleryFullGrid({
  locale,
  images,
  activeCategory,
  categoryLabel,
  onOpen,
}: GalleryFullGridProps) {
  return (
    <div className="gallery-grid">
      {images.map((image) => {
        const hidden = activeCategory !== "all" && image.category !== activeCategory;
        return (
          <GalleryFigure
            key={image.id}
            image={image}
            locale={locale}
            categoryLabel={categoryLabel(image.category)}
            onOpen={onOpen}
            hidden={hidden}
          />
        );
      })}
    </div>
  );
}
