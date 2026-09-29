import type { ContentDocument } from "@/content/models/content-document";
import { canonicalUrl } from "@/lib/seo/canonical";
import { breadcrumbListSchema, organizationRef } from "@/lib/schema/builders";

/**
 * The contact page used to carry its own Organization and its own
 * LocalBusiness, on top of the pair the layout already put on every page:
 * three nodes for one company, each with a slightly different name and
 * telephone. The company is described once, site-wide, as an Organization
 * that is also a ManufacturingBusiness — which is a LocalBusiness — so this
 * page only has to say that it is the page about that company.
 */
export function contactPageSchemas(
  doc: ContentDocument,
  localePath: (path: string) => string,
): readonly Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: canonicalUrl(localePath(doc.path)),
      name: doc.title,
      description: doc.description,
      inLanguage: doc.locale,
      mainEntity: organizationRef(),
    },
    breadcrumbListSchema(
      doc.breadcrumbs.map((item) => ({
        name: item.label,
        path: localePath(item.path),
      })),
    ),
  ];
}
