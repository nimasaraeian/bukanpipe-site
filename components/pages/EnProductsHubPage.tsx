import { JsonLd } from "@/components/seo/JsonLd";
import { ProductSystemsSection } from "@/components/products/en/ProductSystemsSection";
import { ProductsDesignQAOverlay } from "@/components/products/en/ProductsDesignQAOverlay";
import { ProductsHeroSection } from "@/components/products/en/ProductsHeroSection";
import { ProductsSeoLinks } from "@/components/products/en/ProductsSeoLinks";
import type { ContentDocument } from "@/content/models/content-document";
import { breadcrumbListSchema } from "@/lib/schema/builders";
import type { Locale } from "@/lib/i18n/config";
import "@/app/products-en.css";

type EnProductsHubPageProps = {
  doc: ContentDocument;
  breadcrumbHrefs: readonly { label: string; href?: string }[];
  designQA?: boolean;
  designOpacity?: number;
};

export function EnProductsHubPage({
  doc,
  breadcrumbHrefs,
  designQA = false,
  designOpacity = 0.4,
}: EnProductsHubPageProps) {
  return (
    <>
      {designQA ? <ProductsDesignQAOverlay opacity={designOpacity} /> : null}
      <JsonLd
        data={breadcrumbListSchema(
          doc.breadcrumbs.map((item, index) => ({
            name: item.label,
            path: breadcrumbHrefs[index]?.href ?? item.path,
          })),
        )}
      />
      <ProductsHeroSection doc={doc} breadcrumbHrefs={breadcrumbHrefs} />
      <ProductSystemsSection />
      <ProductsSeoLinks locale={doc.locale as Locale} />
    </>
  );
}
