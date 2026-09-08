import type { GalleryPageCopy } from "@/data/gallery/content";
import type { GalleryCategory } from "@/data/gallery/types";

type GalleryCategoryMeta = {
  id: GalleryCategory;
  fa: string;
  en: string;
  count: number;
};

type GalleryCategoryStoriesProps = {
  copy: GalleryPageCopy;
  categories: readonly GalleryCategoryMeta[];
  activeCategory: GalleryCategory | "all";
};

export function GalleryCategoryStories({
  copy,
  categories,
  activeCategory,
}: GalleryCategoryStoriesProps) {
  const visibleCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((cat) => cat.id === activeCategory);

  return (
    <>
      {visibleCategories.map((cat) => {
        const story = copy.categoryStories[cat.id];
        if (!story) return null;
        return (
          <article key={cat.id} className="gallery-story" id={`gallery-story-${cat.id}`}>
            <h2 className="gallery-story__heading">{story.heading}</h2>
            <p className="gallery-story__body">{story.body}</p>
          </article>
        );
      })}

      <article className="gallery-seo-footer">
        <h2 className="gallery-seo-footer__heading">{copy.seoFooterHeading}</h2>
        <p className="gallery-seo-footer__body">{copy.seoFooter}</p>
      </article>
    </>
  );
}
