"use client";

import { JsonLd } from "@/components/seo/JsonLd";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { IndustrialPanelCard } from "@/components/industrial/IndustrialCards";
import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import {
  IndustrialButton,
  IndustrialSectionHeader,
  IndustrialTextLink,
} from "@/components/industrial/IndustrialPrimitives";
import { getDirection } from "@/lib/i18n/config";
import { getIndustrialPageHeroImageProps, getPageHeroImage, industrialSlides } from "@/data/media/page-hero-images";
import { routes } from "@/lib/config/routes";
import { breadcrumbListSchema } from "@/lib/schema/builders";

const cardImages = [
  industrialSlides.product,
  industrialSlides.inventory,
  industrialSlides.extrusion,
  industrialSlides.yard,
] as const;

export function IndustriesPageContent() {
  const { locale, t, path } = useLocale();
  const direction = getDirection(locale);
  const hero = getPageHeroImage(routes.industries.path, direction);
  const routeMeta = t.routes.industries;

  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: t.routes.home.title, path: path(routes.home.path) },
          { name: routeMeta.title, path: path(routes.industries.path) },
        ])}
      />

      <IndustrialPageHero
        title={routeMeta.title}
        description={routeMeta.purpose}
        {...getIndustrialPageHeroImageProps(hero)}
        breadcrumb={[
          { label: t.common.home, href: path(routes.home.path) },
          { label: routeMeta.title },
        ]}
      >
        <IndustrialButton href={path(routes.products.path)}>{t.industriesPage.ctaProducts}</IndustrialButton>
        <IndustrialButton href={path(routes.solutions.path)} variant="secondary">
          {t.industriesPage.ctaSolutions}
        </IndustrialButton>
      </IndustrialPageHero>

      <section className="ind-section ind-section-muted">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={t.industriesPage.sectors.kicker}
            title={t.industriesPage.sectors.title}
            description={t.industriesPage.sectors.description}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {t.industriesPage.cards.map((item, index) => (
              <IndustrialPanelCard
                key={item.title}
                kicker={item.kicker}
                title={item.title}
                href={path(routes.industries.path)}
                image={cardImages[index] ?? cardImages[0]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="ind-section">
        <div className="ind-container">
          <div className="ind-kicker-row">
            <span className="ind-kicker">{t.industriesPage.sectorMap.kicker}</span>
            <span className="ind-kicker-line" aria-hidden="true" />
          </div>
          <h2 className="ind-display mt-5">{t.industriesPage.sectorMap.title}</h2>
          <p className="ind-lead mt-4 max-w-2xl">{t.industriesPage.sectorMap.description}</p>

          <div className="ind-stat-strip mt-12 lg:mt-16">
            {t.industriesPage.sectorMap.highlights.map((item) => (
              <div key={item.label} className="ind-stat-cell">
                <p className="ind-stat-value">{item.label}</p>
                <p className="ind-stat-label">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="ind-glass ind-glass-strong mt-10 p-6 lg:p-8">
            <p className="text-sm font-semibold text-[color:var(--ind-text)]">{t.industriesPage.solutionsBox.title}</p>
            <p className="ind-lead mt-2 text-sm">{t.industriesPage.solutionsBox.description}</p>
            <IndustrialTextLink href={path(routes.solutions.path)} className="mt-6">
              {t.industriesPage.solutionsBox.action}
              <span aria-hidden="true">{t.common.arrow}</span>
            </IndustrialTextLink>
          </div>
        </div>
      </section>
    </>
  );
}
