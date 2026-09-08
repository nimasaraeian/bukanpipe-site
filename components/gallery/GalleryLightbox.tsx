"use client";
/* eslint-disable @next/next/no-img-element -- lightbox loads full-resolution img on demand */

import { useCallback, useEffect, useRef } from "react";
import type { GalleryCategory, GalleryImage } from "@/data/gallery/types";
import type { GalleryPageCopy } from "@/data/gallery/content";

type GalleryLightboxProps = {
  locale: "fa" | "en";
  copy: GalleryPageCopy;
  images: readonly GalleryImage[];
  index: number;
  categoryLabel: (id: GalleryCategory) => string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function GalleryLightbox({
  locale,
  copy,
  images,
  index,
  categoryLabel,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];

  const trapFocus = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        locale === "fa" ? onNext() : onPrevious();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        locale === "fa" ? onPrevious() : onNext();
      }
    },
    [locale, onClose, onNext, onPrevious],
  );

  useEffect(() => {
    closeRef.current?.focus();
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [trapFocus, index]);

  if (!image) return null;

  const title = locale === "fa" ? image.titleFa : image.titleEn;
  const caption = locale === "fa" ? image.captionFa : image.captionEn;
  const alt = locale === "fa" ? image.altFa : image.altEn;

  return (
    <div
      ref={dialogRef}
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="gallery-lightbox__header">
        <div className="gallery-lightbox__meta">
          <div className="gallery-lightbox__category">{categoryLabel(image.category)}</div>
          <div className="gallery-lightbox__title">{title}</div>
        </div>
        <div className="gallery-lightbox__actions">
          <button
            ref={closeRef}
            type="button"
            className="gallery-lightbox__btn"
            onClick={onClose}
            aria-label={copy.lightboxClose}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="gallery-lightbox__stage">
        <button
          type="button"
          className="gallery-lightbox__btn gallery-lightbox__nav gallery-lightbox__nav--prev"
          onClick={onPrevious}
          aria-label={copy.lightboxPrevious}
        >
          {locale === "fa" ? "→" : "←"}
        </button>
        <img src={image.fullSrc} alt={alt} width={image.width} height={image.height} decoding="async" />
        <button
          type="button"
          className="gallery-lightbox__btn gallery-lightbox__nav gallery-lightbox__nav--next"
          onClick={onNext}
          aria-label={copy.lightboxNext}
        >
          {locale === "fa" ? "←" : "→"}
        </button>
      </div>

      <div className="gallery-lightbox__footer">
        <p className="gallery-lightbox__caption">{caption}</p>
      </div>
    </div>
  );
}
