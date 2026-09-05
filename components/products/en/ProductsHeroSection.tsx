import Image from "next/image";

import Link from "next/link";

import {

  ProductsHeroCalloutLabels,

  ProductsHeroCallouts,

  ProductsHeroMobileSpecs,

} from "@/components/products/en/ProductsHeroCallouts";

import { HeroFeatureIcon } from "@/components/products/en/ProductsHeroIcons";

import {

  enProductsHeroAssets,

  getProductsHeroCopy,

} from "@/lib/products/en-hub-hero";

import type { ContentDocument } from "@/content/models/content-document";



type ProductsHeroSectionProps = {

  doc: ContentDocument;

  breadcrumbHrefs: readonly { label: string; href?: string }[];

};



export function ProductsHeroSection({ doc, breadcrumbHrefs }: ProductsHeroSectionProps) {

  const copy = getProductsHeroCopy(doc.locale);

  const breadcrumb =

    breadcrumbHrefs.length > 0

      ? breadcrumbHrefs

      : doc.breadcrumbs.map((item) => ({ label: item.label, href: undefined as string | undefined }));



  return (

    <section className="en-products-hero industrial-font" aria-labelledby="en-products-hero-title">

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

        </div>



        <div className="en-products-hero__pipe-stage">

          <div className="en-products-hero__pipe-frame">

            <Image

              src={enProductsHeroAssets.pipeRender}

              alt=""

              width={enProductsHeroAssets.pipeRenderWidth}

              height={enProductsHeroAssets.pipeRenderHeight}

              priority

              className="en-products-hero__pipe-image"

              sizes="(min-width: 1024px) 860px, 100vw"

            />

          </div>

          <ProductsHeroCallouts callouts={copy.callouts} />

          <ProductsHeroCalloutLabels callouts={copy.callouts} />

          <ProductsHeroMobileSpecs callouts={copy.callouts} />

        </div>

      </div>

    </section>

  );

}


