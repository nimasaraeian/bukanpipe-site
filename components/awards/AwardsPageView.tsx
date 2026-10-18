import Link from "next/link";
import { AwardsShowcase, type ShowcaseItem } from "@/components/awards/AwardsShowcase";
import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import { awardsPageCopy, categoryLabel } from "@/data/company/awards-page";
import { trophies, trophyAlt, trophyImage } from "@/data/company/trophies";
import { getIndustrialPageHeroImageProps, getPageHeroImage } from "@/data/media/page-hero-images";
import { getDirection, type Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";

const toFaDigits = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]!);

export function buildShowcaseItems(locale: Locale): ShowcaseItem[] {
  const copy = awardsPageCopy[locale];
  return trophies.map((t) => {
    const img = trophyImage(t);
    return {
      id: t.id,
      title: t.title[locale],
      year: t.year,
      yearDisplay: t.year ? (locale === "fa" ? toFaDigits(t.year) : t.year) : "",
      level: t.level,
      levelLabel: t.level === "national" ? copy.levelNational : copy.levelProvincial,
      category: t.category,
      categoryLabel: categoryLabel(t.category, locale),
      issuer: t.issuer[locale],
      alt: trophyAlt(t, locale),
      thumb: img.thumb,
      card: img.card,
      full: img.full,
    };
  });
}

export function AwardsPageView({ locale }: { locale: Locale }) {
  const copy = awardsPageCopy[locale];
  const hero = getPageHeroImage("/awards", getDirection(locale));
  const items = buildShowcaseItems(locale);
  const home = locale === "fa" ? "خانه" : "Home";

  return (
    <main id="main-content">
      <IndustrialPageHero
        kicker={copy.kicker}
        title={copy.h1}
        description={copy.heroDescription}
        {...getIndustrialPageHeroImageProps(hero)}
        breadcrumb={[
          { label: home, href: withLocale("/", locale) },
          { label: copy.h1 },
        ]}
      >
        <ul className="aw-stats" aria-label={locale === "fa" ? "در یک نگاه" : "At a glance"}>
          {copy.stats.map((s) => (
            <li key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </IndustrialPageHero>

      <AwardsShowcase locale={locale} copy={copy} items={items} />

      <section className="ind-section" aria-labelledby="aw-related">
        <div className="ind-container">
          <h2 id="aw-related" className="aw-h2">
            {copy.relatedHeading}
          </h2>
          <ul className="aw-related">
            {copy.related.map((r) => (
              <li key={r.path}>
                <Link href={withLocale(r.path, locale)}>
                  <b>{r.label}</b>
                  <span>{r.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
