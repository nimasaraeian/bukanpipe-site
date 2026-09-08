"use client";

import type { GalleryCategory } from "@/data/gallery/types";

type GalleryCategoryMeta = {
  id: GalleryCategory;
  fa: string;
  en: string;
  count: number;
};

type GalleryFiltersProps = {
  locale: "fa" | "en";
  categories: readonly GalleryCategoryMeta[];
  activeCategory: GalleryCategory | "all";
  filterAllLabel: string;
  onChange: (category: GalleryCategory | "all") => void;
};

export function GalleryFilters({
  locale,
  categories,
  activeCategory,
  filterAllLabel,
  onChange,
}: GalleryFiltersProps) {
  return (
    <nav className="gallery-filters" aria-label={locale === "fa" ? "فیلتر گالری" : "Gallery filters"}>
      <div className="ind-container">
        <div className="gallery-filters__scroll" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            className={`gallery-filter-btn${activeCategory === "all" ? " is-active" : ""}`}
            onClick={() => onChange("all")}
          >
            {filterAllLabel}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`gallery-filter-btn${activeCategory === cat.id ? " is-active" : ""}`}
              onClick={() => onChange(cat.id)}
            >
              {locale === "fa" ? cat.fa : cat.en}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
