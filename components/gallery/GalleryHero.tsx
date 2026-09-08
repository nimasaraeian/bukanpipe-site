/* eslint-disable @next/next/no-img-element -- LCP hero uses stable img src */
import type { Locale } from "@/lib/i18n/config";

type GalleryHeroProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  heroSrc: string;
  heroWidth: number;
  heroHeight: number;
  heroAlt: string;
};

export function GalleryHero({
  eyebrow,
  title,
  description,
  heroSrc,
  heroWidth,
  heroHeight,
  heroAlt,
}: GalleryHeroProps) {
  return (
    <header className="gallery-hero">
      <div className="gallery-hero__media" aria-hidden="true">
        <img
          src={heroSrc}
          alt={heroAlt}
          width={heroWidth}
          height={heroHeight}
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
      </div>
      <div className="gallery-hero__shade" aria-hidden="true" />
      <div className="gallery-hero__content">
        <p className="gallery-hero__kicker">{eyebrow}</p>
        <h1 className="gallery-hero__title">{title}</h1>
        <p className="gallery-hero__desc">{description}</p>
      </div>
    </header>
  );
}
