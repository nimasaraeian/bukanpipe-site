"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryCategory, GalleryImage } from "@/data/gallery/types";
import type { GalleryPageCopy } from "@/data/gallery/content";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { GalleryFeaturedGrid } from "@/components/gallery/GalleryFeaturedGrid";
import { GalleryFullGrid } from "@/components/gallery/GalleryFullGrid";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { GalleryCategoryStories } from "@/components/gallery/GalleryCategoryStories";
import { GalleryInternalLinks } from "@/components/gallery/GalleryInternalLinks";

type GalleryCategoryMeta = {
  id: GalleryCategory;
  fa: string;
  en: string;
  count: number;
};

type GalleryExperienceProps = {
  locale: "fa" | "en";
  copy: GalleryPageCopy;
  categories: readonly GalleryCategoryMeta[];
  images: readonly GalleryImage[];
  featured: readonly GalleryImage[];
};

export function GalleryExperience({
  locale,
  copy,
  categories,
  images,
  featured,
}: GalleryExperienceProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLElement>(null);

  const visibleImages =
    activeCategory === "all" ? images : images.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback(
    (id: string) => {
      const index = visibleImages.findIndex((img) => img.id === id);
      if (index >= 0) setLightboxIndex(index);
    },
    [visibleImages],
  );

  const handleCategoryChange = useCallback((category: GalleryCategory | "all") => {
    setActiveCategory(category);
    setLightboxIndex(null);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrevious = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return current <= 0 ? visibleImages.length - 1 : current - 1;
    });
  }, [visibleImages.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return current >= visibleImages.length - 1 ? 0 : current + 1;
    });
  }, [visibleImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex]);

  const categoryLabel = (id: GalleryCategory) => {
    const meta = categories.find((c) => c.id === id);
    return locale === "fa" ? meta?.fa ?? id : meta?.en ?? id;
  };

  return (
    <>
      <GalleryFilters
        locale={locale}
        categories={categories}
        activeCategory={activeCategory}
        filterAllLabel={copy.filterAll}
        onChange={handleCategoryChange}
      />

      <section className="ind-section" aria-labelledby="gallery-featured-heading">
        <div className="ind-container">
          <header className="ind-section-header ind-section-header-wide">
            <h2 id="gallery-featured-heading" className="ind-display">
              {copy.featuredHeading}
            </h2>
          </header>
          <GalleryFeaturedGrid
            locale={locale}
            images={featured}
            activeCategory={activeCategory}
            categoryLabel={categoryLabel}
            onOpen={openLightbox}
          />
        </div>
      </section>

      <section
        ref={galleryRef}
        className="ind-section ind-section-muted"
        aria-labelledby="gallery-full-heading"
      >
        <div className="ind-container">
          <header className="ind-section-header ind-section-header-wide">
            <h2 id="gallery-full-heading" className="ind-display">
              {copy.galleryHeading}
            </h2>
          </header>
          <GalleryFullGrid
            locale={locale}
            images={images}
            activeCategory={activeCategory}
            categoryLabel={categoryLabel}
            onOpen={openLightbox}
          />
        </div>
      </section>

      <section className="ind-section">
        <div className="ind-container">
          <GalleryCategoryStories
            copy={copy}
            categories={categories}
            activeCategory={activeCategory}
          />
          <GalleryInternalLinks locale={locale} copy={copy} />
        </div>
      </section>

      {lightboxIndex !== null && visibleImages[lightboxIndex] ? (
        <GalleryLightbox
          locale={locale}
          copy={copy}
          images={visibleImages}
          index={lightboxIndex}
          categoryLabel={categoryLabel}
          onClose={closeLightbox}
          onPrevious={goPrevious}
          onNext={goNext}
        />
      ) : null}
    </>
  );
}
