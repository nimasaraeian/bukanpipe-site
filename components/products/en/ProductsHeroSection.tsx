import Image from "next/image";
import Link from "next/link";

import {
  ProductsHeroCalloutLabels,
  ProductsHeroCallouts,
  ProductsHeroMobileSpecs,
} from "@/components/products/en/ProductsHeroCallouts";
import { HeroFeatureIcon } from "@/components/products/en/ProductsHeroIcons";
import type { ContentDocument } from "@/content/models/content-document";
import { routes } from "@/lib/config/routes";
import { withLocale } from "@/lib/i18n/path";
import { enProductsHeroAssets, getProductsHeroCopy } from "@/lib/products/en-hub-hero";

type ProductsHeroSectionProps = {
  doc: ContentDocument;
  breadcrumbHrefs: readonly { label: string; href?: string }[];
};

const trustIcons = [
  <svg key="lab" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="en-products-hero__trust-icon">
    <path d="M9 3.5h6M10 3.5v6.2L6.4 16.8A3.6 3.6 0 0 0 9.5 22h5a3.6 3.6 0 0 0 3.1-5.2L14 9.7V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>,
  <svg key="pe" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="en-products-hero__trust-icon">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M3.5 12h17M12 3.5c2.2 2.8 3.4 6 3.4 8.5S14.2 17.7 12 20.5M12 3.5C9.8 6.3 8.6 9.5 8.6 12s1.2 5.7 3.4 8.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>,
  <svg key="od" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="en-products-hero__trust-icon">
    <path d="M4 12h16M7 8.5 4 12l3 3.5M17 8.5 20 12l-3 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="year" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="en-products-hero__trust-icon">
    <rect x="4" y="5" width="16" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 3.5v3M16 3.5v3M4 10h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>,
] as const;

export function ProductsHeroSection({ doc, breadcrumbHrefs }: ProductsHeroSectionProps) {
  const copy = getProductsHeroCopy(doc.locale);
  const path = (href: string) => withLocale(href, doc.locale);
  const arrow = doc.locale === "fa" ? "←" : "→";
  const breadcrumb =
    breadcrumbHrefs.length > 0
      ? breadcrumbHrefs
      : doc.breadcrumbs.map((item) => ({ label: item.label, href: undefined as string | undefined }));

  return (
    <section
      className={`en-products-hero en-products-hero--${doc.locale} industrial-font`}
      aria-labelledby="en-products-hero-title"
    >
      <div className="en-products-hero__atmosphere" aria-hidden="true">
        <div className="en-products-hero__atmosphere-vignette" />
        <div className="en-products-hero__atmosphere-glow" />
      </div>

      <div className="ind-container en-products-hero__stage">
        <div className="en-products-hero__copy">
          <nav className="en-products-hero__breadcrumb sr-only" aria-label="Breadcrumb">
            {breadcrumb.map((item, index) => (
              <span key={`${item.label}-${index}`}>
                {index > 0 ? " / " : null}
                {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
              </span>
            ))}
          </nav>

          <p className="en-products-hero__eyebrow">
            <span className="en-products-hero__eyebrow-brand">{copy.eyebrowBrand}</span>
            <span className="en-products-hero__eyebrow-sep" aria-hidden="true">
              {" "}
              |{" "}
            </span>
            <span className="en-products-hero__eyebrow-suffix">{copy.eyebrowSuffix}</span>
          </p>

          <h1 id="en-products-hero-title" className="en-products-hero__title ind-title-shine">
            {copy.titleLine1}
            <br />
            {copy.titleLine2}
          </h1>

          <p className="en-products-hero__lead">{copy.lead}</p>

          <ul className="en-products-hero__features">
            {copy.features.map((feature) => (
              <li key={feature.id} className="en-products-hero__feature">
                <HeroFeatureIcon name={feature.icon} className="en-products-hero__feature-icon" />
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>

          <div className="en-products-hero__actions">
            <Link href={path(routes.requestQuote.path)} className="en-products-hero__btn en-products-hero__btn--primary">
              {copy.ctaPrimary}
              <span aria-hidden="true">{arrow}</span>
            </Link>
            <Link href={path("/downloads")} className="en-products-hero__btn en-products-hero__btn--secondary">
              {copy.ctaSecondary}
              <span aria-hidden="true">{arrow}</span>
            </Link>
          </div>
        </div>

        <div className="en-products-hero__pipe-stage">
          <div className="en-products-hero__pipe-frame">
            <Image
              src={enProductsHeroAssets.pipeRender}
              alt=""
              width={enProductsHeroAssets.pipeRenderWidth}
              height={enProductsHeroAssets.pipeRenderHeight}
              priority
              quality={90}
              className="en-products-hero__pipe-image"
              sizes="(min-width: 1024px) 860px, 100vw"
            />
          </div>
          <ProductsHeroCallouts callouts={copy.callouts} />
          <ProductsHeroCalloutLabels callouts={copy.callouts} />
          <ProductsHeroMobileSpecs callouts={copy.callouts} />
        </div>
      </div>

      <div className="en-products-hero__trust" role="list" aria-label={copy.trustLabel}>
        <div className="en-products-hero__trust-inner">
          {copy.trustItems.map((item, index) => (
            <div key={item.title} className="en-products-hero__trust-item" role="listitem">
              {trustIcons[index]}
              <div>
                <p className="en-products-hero__trust-title">{item.title}</p>
                <p className="en-products-hero__trust-subtitle">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
