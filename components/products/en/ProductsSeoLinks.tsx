import Link from "next/link";

import { getProductSystems } from "@/lib/products/get-product-systems";

import { getProductsHubUiCopy } from "@/lib/products/hub-ui-copy";

import { withLocale } from "@/lib/i18n/path";

import type { Locale } from "@/lib/i18n/config";



type ProductsSeoLinksProps = {

  locale: Locale;

};



function seoLinkLabel(ctaLabel: string, locale: Locale): string {

  if (locale === "fa") {

    return ctaLabel.replace(/^مشاهده\s+/, "");

  }

  return ctaLabel.replace(/^Explore /, "");

}



/** Crawlable product links — present in server HTML, not JS-only navigation */

export function ProductsSeoLinks({ locale }: ProductsSeoLinksProps) {

  const ui = getProductsHubUiCopy(locale);

  const productSystems = getProductSystems(locale);



  return (

    <nav className="en-products-seo-links" aria-label={ui.seoNavLabel}>

      <ul>

        {productSystems.map((system) => (

          <li key={system.slug}>

            <Link href={withLocale(system.path, locale)}>{seoLinkLabel(system.ctaLabel, locale)}</Link>

          </li>

        ))}

      </ul>

    </nav>

  );

}


