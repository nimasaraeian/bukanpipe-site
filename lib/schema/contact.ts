import type { ContentDocument } from "@/content/models/content-document";
import { canonicalUrl } from "@/lib/seo/canonical";
import { omitUndefined } from "@/lib/schema/serialize";
import { breadcrumbListSchema, organizationSchema } from "@/lib/schema/builders";
import { postalAddressSchema } from "@/lib/config/contact";

export function contactPageSchemas(
  doc: ContentDocument,
  localePath: (path: string) => string,
): readonly Record<string, unknown>[] {
  return [
    organizationSchema(),
    omitUndefined({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Bukan Pipe",
      description: doc.description,
      url: canonicalUrl(localePath(doc.path)),
      telephone: "+98-44-46433444",
      email: "info@bukanpipe.com",
      address: postalAddressSchema(),
    }),
    breadcrumbListSchema(
      doc.breadcrumbs.map((item) => ({
        name: item.label,
        path: localePath(item.path),
      })),
    ),
  ];
}
