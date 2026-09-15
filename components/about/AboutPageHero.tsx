"use client";

import Image from "next/image";
import { getAboutHeroContent } from "@/data/content/about-hero";
import { getIndustrialPageHeroImageProps, getPageHeroImage } from "@/data/media/page-hero-images";
import { IndustrialButton } from "@/components/industrial/IndustrialPrimitives";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { routes } from "@/lib/config/routes";
import { cn } from "@/lib/cn";

type AboutPageHeroProps = {
  title: string;
  description?: string;
};

export function AboutPageHero({ title, description }: AboutPageHeroProps) {
  const { locale, path: localePath } = useLocale();
  const copy = getAboutHeroContent(locale);
  const hero = getPageHeroImage(routes.about.path);
  const imageProps = getIndustrialPageHeroImageProps(hero);
  const heading = title.trim() || copy.title;
  const lead = description?.trim() || copy.lead;
  const resolvedPosition = imageProps.imagePosition ?? "48% 52%";
  const mobilePosition = "56% 48%";

  return (
    <section
      className={cn(
        "ind-page-hero ind-page-hero--brand-photo ind-page-hero--brand-about ind-page-hero--match-en industrial-font",
        locale === "fa" ? "about-hero--fa" : "about-hero--en",
      )}
      aria-labelledby="about-hero-heading"
      style={
        {
          "--ind-hero-object-position": resolvedPosition,
          "--ind-hero-object-position-mobile-ltr": mobilePosition,
          "--ind-hero-object-position-mobile-rtl": mobilePosition,
        } as React.CSSProperties
      }
    >
      <div className="ind-page-hero-scene" aria-hidden="true">
        <Image
          src={imageProps.imageSrc!}
          alt={copy.imageAlt}
          fill
          priority
          unoptimized
          className="ind-page-hero-photo"
          sizes="100vw"
        />
        <div className="ind-page-hero-shade-left" />
        <div className="ind-page-hero-shade-top" />
        <div className="ind-page-hero-shade-bottom" />
        <div className="ind-page-hero-scene-glow" />
      </div>

      <div className="ind-container ind-page-hero-content about-hero-content">
        <div className="ind-page-hero-copy-stack ind-page-hero-copy-stack--brand about-hero-stack">
          <div className="about-hero-head">
            <div className="ind-kicker-row">
              <span className="ind-kicker">{copy.eyebrow}</span>
              <span className="ind-kicker-line" aria-hidden="true" />
            </div>

            <h1
              id="about-hero-heading"
              className="ind-display ind-display-lg ind-page-hero-title ind-title-shine mt-5"
            >
              {heading}
            </h1>
          </div>

          <div className="about-hero-body">
            <p className="ind-lead ind-page-hero-lead mt-5">{lead}</p>

            <div className="ind-page-hero-actions mt-8 flex flex-wrap gap-3">
              <IndustrialButton href={localePath(routes.requestQuote.path)}>
                {copy.primaryCta}
              </IndustrialButton>
              <IndustrialButton href="#about-story" variant="secondary">
                {copy.secondaryCta}
              </IndustrialButton>
            </div>

            <dl className="ind-about-hero-stats">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="ind-about-hero-stat">
                  <dt className="ind-about-hero-stat-value">{stat.value}</dt>
                  <dd className="ind-about-hero-stat-label">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
