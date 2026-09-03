"use client";

import Image from "next/image";
import { PremiumHeroSection } from "@/components/home/PremiumHeroSection";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  IndustrialCtaBand,
  IndustrialSectionHeader,
  IndustrialTextLink,
} from "@/components/industrial/IndustrialPrimitives";
import { IndustrialPanelCard, IndustrialProductCard } from "@/components/industrial/IndustrialCards";
import { routes } from "@/lib/config/routes";

const industryImages = [
  "/media/demo/bukan-slide-03-product.png",
  "/media/demo/bukan-slide-04-inventory.png",
  "/media/demo/bukan-slide-02-extrusion.png",
] as const;

const productImages = [
  "/media/demo/bukan-slide-03-product.png",
  "/media/demo/bukan-slide-03-product.png",
  "/media/demo/bukan-slide-04-inventory.png",
  "/media/demo/bukan-slide-01-yard.png",
] as const;

export function IndustrialHomePage() {
  const { t, path } = useLocale();

  return (
    <div className="industrial-font">
      <PremiumHeroSection />

      <section className="ind-section ind-section-muted" aria-labelledby="industries-heading">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={t.home.industries.kicker}
            title={t.home.industries.title}
            description={t.home.industries.description}
            action={
              <IndustrialTextLink href={path(routes.industries.path)}>
                {t.home.industries.action}
                <span aria-hidden="true">{t.common.arrow}</span>
              </IndustrialTextLink>
            }
          />
          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {t.home.industries.items.map((item, index) => (
              <IndustrialPanelCard
                key={item.title}
                kicker={item.kicker}
                title={item.title}
                href={path(routes.industries.path)}
                image={industryImages[index] ?? industryImages[0]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="ind-section" aria-labelledby="products-heading">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={t.home.products.kicker}
            title={t.home.products.title}
            description={t.home.products.description}
            action={
              <IndustrialTextLink href={path(routes.products.path)}>
                {t.home.products.action}
                <span aria-hidden="true">{t.common.arrow}</span>
              </IndustrialTextLink>
            }
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {t.home.products.items.map((item, index) => (
              <IndustrialProductCard
                key={item.title}
                kicker={item.kicker}
                title={item.title}
                href={path(routes.products.path)}
                image={productImages[index] ?? productImages[0]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="ind-section ind-section-elevated">
        <div className="ind-container ind-editorial-grid">
          <div className="ind-editorial-media relative">
            <Image
              src="/media/demo/bukan-slide-01-yard.png"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <div>
            <div className="ind-kicker-row">
              <span className="ind-kicker">{t.home.manufacturing.kicker}</span>
              <span className="ind-kicker-line" aria-hidden="true" />
            </div>
            <h2 className="ind-display mt-5 max-w-[14ch]">{t.home.manufacturing.title}</h2>
            <p className="ind-lead mt-6 max-w-md">{t.home.manufacturing.description}</p>
            <ul className="ind-feature-list mt-10">
              {t.home.manufacturing.features.map((item) => (
                <li key={item} className="ind-feature-item">
                  {item}
                </li>
              ))}
            </ul>
            <IndustrialTextLink href={path(routes.engineering.path)} className="mt-10">
              {t.home.manufacturing.action}
              <span aria-hidden="true">{t.common.arrow}</span>
            </IndustrialTextLink>
          </div>
        </div>
      </section>

      <section className="ind-section ind-section-muted">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={t.home.quality.kicker}
            title={t.home.quality.title}
            description={t.home.quality.description}
          />
          <div className="ind-stat-strip mt-12 lg:mt-16">
            {t.home.quality.stats.map((item) => (
              <div key={item.value} className="ind-stat-cell">
                <p className="ind-stat-value">{item.value}</p>
                <p className="ind-stat-label">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <IndustrialTextLink href={path(routes.laboratory.path)}>
              {t.home.quality.action}
              <span aria-hidden="true">{t.common.arrow}</span>
            </IndustrialTextLink>
          </div>
        </div>
      </section>

      <IndustrialCtaBand
        title={t.home.cta.title}
        buttonLabel={t.home.cta.button}
        buttonHref={path(routes.requestQuote.path)}
      />
    </div>
  );
}
