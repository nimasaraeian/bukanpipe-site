"use client";

import Link from "next/link";
import { HomeHeroPhoto } from "@/components/home/HomeHeroPhoto";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { enHomeApplications } from "@/data/content/en/home";
import { faHomeApplications } from "@/data/content/fa/home";
import { routes } from "@/lib/config/routes";

const floatIcons = [
  (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="engine-float-icon">
      <path
        d="M12 3c3.6 3.2 5.5 6.6 5.5 10a5.5 5.5 0 1 1-11 0c0-3.4 1.9-6.8 5.5-10z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M12 14.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="engine-float-icon">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3.5 12h17M12 3.5c2.2 2.8 3.4 6 3.4 8.5S14.2 17.7 12 20.5M12 3.5C9.8 6.3 8.6 9.5 8.6 12s1.2 5.7 3.4 8.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  ),
] as const;

const trustIcons = [
  (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="engine-trust-icon">
      <path
        d="M12 2.5l2.2 1.1 2.4-.2 1.4 2 2.2 1.1-.2 2.4 1.1 2.2-1.1 2.2.2 2.4-2 1.4-1.1 2.2-2.4-.2-2.2 1.1L12 21.5l-2.2-1.1-2.4.2-1.4-2-2.2-1.1.2-2.4-1.1-2.2 1.1-2.2-.2-2.4 2-1.4 1.1-2.2 2.4.2 2.2-1.1L12 2.5z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M8.5 12.2l2.4 2.4 5.1-5.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="engine-trust-icon">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="engine-trust-icon">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="engine-trust-icon">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 12h17M12 3.5c2.2 2.8 3.4 6 3.4 8.5S14.2 17.7 12 20.5M12 3.5C9.8 6.3 8.6 9.5 8.6 12s1.2 5.7 3.4 8.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
] as const;

export function PremiumHeroSection() {
  const { t, path, locale } = useLocale();
  const hero = t.home.hero;
  const specIndex = (locale === "fa" ? faHomeApplications : enHomeApplications).slice(0, 3);

  return (
    <section
      className={`engine-hero engine-hero-font engine-hero--luminous engine-hero--luminous-${locale}`}
      aria-label={hero.kicker}
    >
      <div className="engine-hero-scene" aria-hidden="true">
        <HomeHeroPhoto locale={locale} />
        <div className="engine-hero-scene-vignette" />
        <div className="engine-hero-scene-shade-left" />
        <div className="engine-hero-scene-shade-top" />
        <div className="engine-hero-scene-shade-bottom" />
        <div className="engine-hero-scene-glow" />
        <div className="engine-hero-scene-floor" />
      </div>

      <div className="engine-hero-stage">
        <div className="engine-hero-body">
          <div className="engine-hero-copy">
            <div className="engine-hero-kicker-row">
              <span className="engine-hero-kicker">{hero.kicker}</span>
              <span className="engine-hero-kicker-line" />
            </div>

            <nav className="engine-hero-spec-index" aria-label={hero.ctaSolutions}>
              {specIndex.map((item) => (
                <Link key={item.href} href={path(item.href)} className="engine-hero-spec-index-item">
                  {item.kicker}
                </Link>
              ))}
            </nav>

            <h1 className="engine-hero-headline ind-title-shine">
              {hero.titleLine1}
              <br />
              <span className="engine-hero-headline-accent">
                {hero.titleLine2}
                <span className="engine-hero-period">.</span>
              </span>
              {hero.titleLine3 ? (
                <>
                  <br />
                  {hero.titleLine3}
                </>
              ) : null}
            </h1>

            <p className="engine-hero-subtitle">{hero.subtitle}</p>

            <div className="engine-hero-actions">
              <Link href={path(routes.requestQuote.path)} className="engine-hero-btn engine-hero-btn-primary">
                {hero.ctaPrimary}
                <span aria-hidden="true">{t.common.arrow}</span>
              </Link>
              <Link href={path(routes.products.path)} className="engine-hero-btn engine-hero-btn-secondary">
                {hero.ctaProducts}
                <span aria-hidden="true">{t.common.arrow}</span>
              </Link>
            </div>
            {locale === "fa" || locale === "en" ? (
              <p className="engine-hero-subtitle mt-4 text-sm opacity-90">
                <Link href={path("/technical-center")} className="underline-offset-4 hover:underline">
                  {hero.ctaTechnical}
                </Link>
                {" · "}
                <Link href={path("/calculator")} className="underline-offset-4 hover:underline">
                  {locale === "fa" ? "محاسبات مهندسی" : "Engineering calculator"}
                </Link>
              </p>
            ) : null}
          </div>

          <div className="engine-hero-floats" aria-label={hero.highlightsLabel}>
            {t.home.floatCards.map((card, index) => (
              <div key={card.title} className="engine-hero-float-card">
                {floatIcons[index]}
                <div>
                  <p className="engine-hero-float-title">{card.title}</p>
                  <p className="engine-hero-float-subtitle">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="engine-hero-trust" role="list" aria-label={hero.trustLabel}>
        <div className="engine-hero-trust-inner">
          {t.home.trustItems.map((item, index) => (
            <div key={item.title} className="engine-hero-trust-item" role="listitem">
              {trustIcons[index]}
              <div>
                <p className="engine-hero-trust-title">{item.title}</p>
                <p className="engine-hero-trust-subtitle">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
