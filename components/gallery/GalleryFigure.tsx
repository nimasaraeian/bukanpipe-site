/* eslint-disable @next/next/no-img-element -- stable img src for gallery image SEO */
import type { GalleryImage } from "@/data/gallery/types";

type GalleryFigureProps = {
  image: GalleryImage;
  locale: "fa" | "en";
  categoryLabel: string;
  onOpen: (id: string) => void;
  layoutClass?: string;
  loading?: "lazy" | "eager";
  hidden?: boolean;
};

export function GalleryFigure({
  image,
  locale,
  categoryLabel,
  onOpen,
  layoutClass,
  loading = "lazy",
  hidden = false,
}: GalleryFigureProps) {
  const title = locale === "fa" ? image.titleFa : image.titleEn;
  const alt = locale === "fa" ? image.altFa : image.altEn;
  const caption = locale === "fa" ? image.captionFa : image.captionEn;

  return (
    <figure
      className={`gallery-figure${layoutClass ? ` ${layoutClass}` : ""}${hidden ? " is-hidden" : ""}`}
      style={{ "--gallery-aspect": `${image.aspectRatio}` } as React.CSSProperties}
      data-category={image.category}
    >
      <button
        type="button"
        className="gallery-figure__trigger"
        onClick={() => onOpen(image.id)}
        aria-label={title}
      >
        <div className="gallery-figure__media">
          <img
            src={image.src}
            alt={alt}
            width={image.variants.card.width}
            height={image.variants.card.height}
            loading={loading}
            decoding="async"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      </button>
      <figcaption className="gallery-figure__caption">
        <span className="gallery-figure__title">{title}</span>
        {caption && caption !== title ? (
          <span className="gallery-figure__caption-text">{caption}</span>
        ) : null}
        <span className="sr-only"> — {categoryLabel}</span>
      </figcaption>
    </figure>
  );
}
