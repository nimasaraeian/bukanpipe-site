"use client";

import { JsonLd } from "@/components/seo/JsonLd";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { IndustrialGlassCard } from "@/components/industrial/IndustrialGlassCard";
import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import {
  IndustrialButton,
  IndustrialSectionHeader,
  IndustrialTextLink,
} from "@/components/industrial/IndustrialPrimitives";
import { getDirection } from "@/lib/i18n/config";
import { getPageHeroImage, industrialSlides } from "@/data/media/page-hero-images";
import { routes } from "@/lib/config/routes";
import { breadcrumbListSchema } from "@/lib/schema/builders";

const cardImages = [
  industrialSlides.product,
  industrialSlides.extrusion,
  industrialSlides.inventory,
  industrialSlides.yard,
] as const;

export function SolutionsPageContent() {
  const { locale, t, path } = useLocale();
  const direction = getDirection(locale);
  const hero = getPageHeroImage(routes.solutions.path, direction);
  const routeMeta = t.routes.solutions;

  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: t.routes.home.title, path: path(routes.home.path) },
          { name: routeMeta.title, path: path(routes.solutions.path) },
        ])}
      />

      <IndustrialPageHero
        title={routeMeta.title}
        description={routeMeta.purpose}
        imageSrc={hero.src}
        imagePosition={hero.position}
        breadcrumb={[
          { label: t.common.home, href: path(routes.home.path) },
          { label: routeMeta.title },
        ]}
      >
        <IndustrialButton href={path(routes.requestQuote.path)}>{t.cta.requestQuote}</IndustrialButton>
        <IndustrialButton href={path(routes.products.path)} variant="secondary">
          {t.cta.viewProducts}
        </IndustrialButton>
      </IndustrialPageHero>

      <section className="ind-section ind-section-muted">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={t.solutionsPage.systemPackages.kicker}
            title={t.solutionsPage.systemPackages.title}
            description={t.solutionsPage.systemPackages.description}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:mt-16">
            {t.solutionsPage.cards.map((item, index) => (
              <IndustrialGlassCard
                key={item.title}
                meta={item.meta}
                title={item.title}
                description={item.description}
                image={cardImages[index]}
                href={
                  index === 0
                    ? path(routes.products.path)
                    : index === 1 || index === 3
                      ? path(routes.engineering.path)
                      : path(routes.requestQuote.path)
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="ind-section">
        <div className="ind-container ind-editorial-grid">
          <div>
            <div className="ind-kicker-row">
              <span className="ind-kicker">{t.solutionsPage.capabilities.kicker}</span>
              <span className="ind-kicker-line" aria-hidden="true" />
            </div>
            <h2 className="ind-display mt-5 max-w-[14ch]">{t.solutionsPage.capabilities.title}</h2>
            <p className="ind-lead mt-6 max-w-lg">{t.solutionsPage.capabilities.description}</p>
            <ul className="ind-feature-list mt-10">
              {t.solutionsPage.capabilities.items.map((item) => (
                <li key={item} className="ind-feature-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="ind-glass ind-glass-strong p-8">
            <p className="ind-kicker">{t.solutionsPage.industryBox.kicker}</p>
            <h3 className="mt-3 text-xl font-semibold text-[color:var(--ind-text)]">{t.solutionsPage.industryBox.title}</h3>
            <p className="ind-lead mt-4 text-sm">{t.solutionsPage.industryBox.description}</p>
            <IndustrialTextLink href={path(routes.industries.path)} className="mt-8">
              {t.solutionsPage.industryBox.action}
              <span aria-hidden="true">{t.common.arrow}</span>
            </IndustrialTextLink>
          </div>
        </div>
      </section>
    </>
  );
}
