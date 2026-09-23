import { siteConfig } from "@/lib/config/site";
import { contactConfig, postalAddressSchema } from "@/lib/config/contact";
import { canonicalUrl } from "@/lib/seo/canonical";
import { organizationLogoObject, organizationLogoUrl } from "@/lib/seo/page-config";
import { omitUndefined } from "@/lib/schema/serialize";
import type { Locale } from "@/lib/i18n/config";
import type { Article } from "@/content/models/article";
import type { Product } from "@/content/models/product";
import type { Project } from "@/content/models/project";
import { companyDocuments, publishedDocuments } from "@/data/company/documents";
import { awards } from "@/data/company/awards";

/**
 * The company's registration identifiers, from its own documents. Search
 * engines use these to resolve the entity rather than infer it from a brand
 * name that several other companies also use.
 */
const NATIONAL_ID = "10220007922";
/** Registered 1373/06/26 in the Iranian calendar. */
const FOUNDING_DATE = "1994-09-17";

/**
 * Only the credentials the registry publishes. A withheld document — one whose
 * stated validity has lapsed — must not leak into structured data either, so
 * this reads the same gate the pages read.
 */
function credentialSchema(): Record<string, unknown>[] {
  return publishedDocuments()
    .filter((doc) => doc.group === "management-system" || doc.group === "standard-mark")
    .map((doc) =>
      omitUndefined({
        "@type": "EducationalOccupationalCredential",
        name: doc.title.en,
        credentialCategory: "certification",
        identifier: doc.reference,
        recognizedBy: { "@type": "Organization", name: doc.issuer.en },
        validUntil: doc.validUntil,
      }),
    );
}

function awardNames(): string[] {
  return awards.map((award) => `${award.title.en} — ${award.issuer.en} (${award.year})`);
}

export function organizationSchema(): Record<string, unknown> {
  return omitUndefined({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    alternateName: siteConfig.brandNameFa,
    legalName: "Bukan Polyethylene Pipe Company",
    description: siteConfig.organizationDescription,
    url: siteConfig.siteUrl,
    logo: organizationLogoObject(),
    address: postalAddressSchema(),
    foundingDate: FOUNDING_DATE,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "IR-NationalID",
      value: NATIONAL_ID,
    },
    hasCredential: credentialSchema(),
    award: awardNames(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+98-44-46433444",
      email: "info@bukanpipe.com",
      contactType: "sales",
      areaServed: "IR",
      availableLanguage: ["fa", "en"],
    },
    sameAs: socialUrls(),
  });
}

/** Exported so a test can assert the registry and the schema agree. */
export const organizationIdentifiers = {
  nationalId: NATIONAL_ID,
  foundingDate: FOUNDING_DATE,
  documentCount: companyDocuments.length,
} as const;

export function manufacturingBusinessSchema(): Record<string, unknown> {
  return omitUndefined({
    "@context": "https://schema.org",
    "@type": "ManufacturingBusiness",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    logo: organizationLogoUrl(),
    image: `${siteConfig.siteUrl}/media/demo/ChatGPT Image Sep 8, 2026, 10_35_51 AM.png`,
    description: siteConfig.defaultDescription,
    address: postalAddressSchema(),
    telephone: "+98-44-46433444",
    email: "info@bukanpipe.com",
  });
}

export function webSiteSchema(locale: Locale = siteConfig.defaultLocale): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      logo: organizationLogoObject(),
    },
  };
}

export function breadcrumbListSchema(
  items: readonly { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function productSchema(product: Product): Record<string, unknown> {
  return omitUndefined({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    url: canonicalUrl(`/products/${product.slug}`),
    category: "HDPE polyethylene pipe",
    brand: {
      "@type": "Brand",
      name: siteConfig.brandName,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
  });
}

export function contentProductSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  category?: string;
}): Record<string, unknown> {
  return omitUndefined({
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url: input.url,
    category: input.category ?? "HDPE polyethylene pipe",
    image: input.image
      ? omitUndefined({
          "@type": "ImageObject",
          url: input.image,
          name: input.imageAlt ?? input.name,
        })
      : undefined,
    brand: {
      "@type": "Brand",
      name: siteConfig.brandName,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
  });
}

export function articleSchema(article: Article, locale: Locale = siteConfig.defaultLocale): Record<string, unknown> {
  return omitUndefined({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: canonicalUrl(`/knowledge/${article.slug}`),
    dateModified: article.updatedAt,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: siteConfig.brandName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      logo: organizationLogoObject(),
    },
  });
}

export function projectSchema(project: Project): Record<string, unknown> {
  return omitUndefined({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    additionalType: "CaseStudy",
    name: project.title,
    description: project.description,
    url: canonicalUrl(`/projects/${project.slug}`),
    dateModified: project.updatedAt,
  });
}

function socialUrls(): string[] | undefined {
  const urls = [contactConfig.social.instagram.url, siteConfig.social.linkedin].filter(
    (value): value is string => Boolean(value),
  );
  return urls.length > 0 ? urls : undefined;
}
