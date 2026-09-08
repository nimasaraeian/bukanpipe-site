import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { getGalleryPageCopy } from "@/data/gallery/content";
import {
  getFeaturedGalleryImages,
  getGalleryCategories,
  getGalleryHero,
  getGalleryImages,
} from "@/data/gallery";
import type { Locale } from "@/lib/i18n/config";

type GalleryPageViewProps = {
  locale: Locale;
};

export function GalleryPageView({ locale }: GalleryPageViewProps) {
  const copy = getGalleryPageCopy(locale);
  const hero = getGalleryHero();
  const images = getGalleryImages();
  const featured = getFeaturedGalleryImages();
  const categories = getGalleryCategories();

  const heroAlt =
    locale === "fa"
      ? "نمای هوایی مجموعه تولیدی بوکان پایپ و سوله‌های کارخانه"
      : "Aerial view of the Bukan Pipe manufacturing facility and factory buildings";

  return (
    <main id="main-content">
      {hero ? (
        <GalleryHero
          locale={locale}
          eyebrow={copy.eyebrow}
          title={copy.h1}
          description={copy.heroDescription}
          heroSrc={hero.src}
          heroWidth={hero.width}
          heroHeight={hero.height}
          heroAlt={heroAlt}
        />
      ) : null}

      <section className="ind-section">
        <div className="ind-container">
          <div className="gallery-intro">
            <h2 className="gallery-intro__heading">{copy.introHeading}</h2>
            <p className="gallery-intro__body">{copy.intro}</p>
          </div>
        </div>
      </section>

      <GalleryExperience
        locale={locale}
        copy={copy}
        categories={categories}
        images={images}
        featured={featured}
      />
    </main>
  );
}
