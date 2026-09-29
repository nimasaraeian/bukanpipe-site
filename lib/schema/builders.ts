import { siteConfig } from "@/lib/config/site";
import {
  contactConfig,
  getMessagingChatUrl,
  postalAddressSchema,
} from "@/lib/config/contact";
import { canonicalUrl } from "@/lib/seo/canonical";
import { organizationLogoObject } from "@/lib/seo/page-config";
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
/** As registered, and as the About page's identifier table now prints it. */
const LEGAL_NAME_FA = "شرکت تعاونی لوله پلی اتیلن بوکان";
const LEGAL_NAME_EN = "Bukan Polyethylene Pipe Cooperative Company";
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
        /*
         * `expires`, not `validUntil`: schema.org does not define validUntil
         * on a credential — it belongs to Offer and Demand — so the expiry
         * was being hung on a property the type does not have, which means it
         * was being dropped.
         */
        expires: doc.validUntilIso,
      }),
    );
}

function awardNames(): string[] {
  return awards.map((award) => `${award.title.en} — ${award.issuer.en} (${award.year})`);
}

/**
 * Stable identifiers for the two nodes every page carries.
 *
 * Without them the company appeared twice on every page — once as an
 * Organization and once as a ManufacturingBusiness — as two unrelated nodes
 * that happened to share a name, leaving a search engine to guess whether
 * they were one company or two. There is one node now, and everything else
 * points at it by @id.
 */
export const entityIds = {
  organization: `${siteConfig.siteUrl}/#organization`,
  website: `${siteConfig.siteUrl}/#website`,
} as const;

/** A reference to the company, for the manufacturer and publisher slots. */
export function organizationRef(): Record<string, unknown> {
  return { "@id": entityIds.organization };
}

/**
 * The hours in openingHoursSpecification are the hours the contact page
 * prints; contactConfig holds the two forms side by side.
 */
function openingHours(): Record<string, unknown> {
  const { days, opens, closes } = contactConfig.officeHoursSpec;
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days.map((day) => `https://schema.org/${day}`),
    opens,
    closes,
  };
}

/**
 * The phone numbers and mailboxes the contact page lists, kept in their roles
 * rather than flattened into one number: a caller looking for the laboratory
 * should not be given the sales desk.
 */
function contactPoints(): Record<string, unknown>[] {
  const { phones, emails, roles } = contactConfig;
  return [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: ["+984446433444", "+989144822511", roles.salesSmsRecipient.e164],
      email: emails.sales,
      areaServed: "IR",
      availableLanguage: ["fa", "en"],
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      telephone: [phones.laboratory],
      email: emails.laboratory,
      areaServed: "IR",
      availableLanguage: ["fa", "en"],
    },
  ];
}

/**
 * One node for the company, typed as both.
 *
 * It was typed ManufacturingBusiness, which is not a schema.org type at all —
 * there is no manufacturing subtype of LocalBusiness — so the node named a
 * type no consumer defines and the local-business fields on it went nowhere.
 * Organization and LocalBusiness are both real, and naming the pair keeps the
 * plain Organization that most consumers match on while giving the address,
 * hours and telephone a type that expects them.
 *
 * What is lost by dropping the invented type is the fact that this is a
 * factory, so that is said in the two classifications a registry would use:
 * ISIC Rev.4 2220, manufacture of plastics products, and NAICS 326122,
 * plastics pipe and pipe fitting manufacturing. Codes, not a guessed
 * vocabulary URI that may not resolve.
 */
export function organizationSchema(locale: Locale = siteConfig.defaultLocale): Record<string, unknown> {
  const fa = locale === "fa";
  return omitUndefined({
    "@context": "https://schema.org",
    "@id": entityIds.organization,
    "@type": ["Organization", "LocalBusiness"],
    name: fa ? siteConfig.brandNameFa : siteConfig.brandName,
    alternateName: fa ? siteConfig.brandName : siteConfig.brandNameFa,
    legalName: fa ? LEGAL_NAME_FA : LEGAL_NAME_EN,
    description: siteConfig.organizationDescription,
    url: siteConfig.siteUrl,
    logo: organizationLogoObject(),
    /* the factory itself, not the logo — main brought this in while this
       branch was merging the two company nodes into one */
    image: `${siteConfig.siteUrl}/media/brand/bukan-pipe-factory-aerial-view.png`,
    isicV4: "2220",
    naics: "326122",
    address: postalAddressSchema(),
    /*
     * foundingDate is the company's registration, 1373/06/26 in the Iranian
     * calendar, which the About page prints as "Founded 1373 (1994)". The
     * plant started running in 1376 (1997); the page prints that too, on its
     * own row, and schema.org has no property for it, so it is not folded in
     * here — calling 1997 the founding date would contradict the page.
     */
    foundingDate: FOUNDING_DATE,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "IR-NationalID",
      value: NATIONAL_ID,
    },
    hasCredential: credentialSchema(),
    award: awardNames(),
    telephone: "+984446433444",
    email: contactConfig.emails.sales,
    contactPoint: contactPoints(),
    openingHoursSpecification: openingHours(),
    sameAs: socialUrls(),
  });
}

/** Exported so a test can assert the registry and the schema agree. */
export const organizationIdentifiers = {
  nationalId: NATIONAL_ID,
  foundingDate: FOUNDING_DATE,
  documentCount: companyDocuments.length,
} as const;

/*
 * No potentialAction/SearchAction here. That markup tells Google the address
 * of a site's own search results, and this site has no search — there is no
 * search route and no search field in the header. Declaring one would point
 * at a page that 404s.
 */
export function webSiteSchema(locale: Locale = siteConfig.defaultLocale): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@id": entityIds.website,
    "@type": "WebSite",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    inLanguage: locale,
    publisher: organizationRef(),
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
    manufacturer: organizationRef(),
  });
}

/*
 * No offers, and no price. The site publishes neither — every product page
 * sends the reader to a quote — and an offer with no price is an invitation
 * for Google to show a blank one.
 */
export function contentProductSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  material?: string;
  additionalProperty?: readonly Record<string, unknown>[];
}): Record<string, unknown> {
  return omitUndefined({
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url: input.url,
    category: input.category ?? "HDPE polyethylene pipe",
    material: input.material,
    additionalProperty: input.additionalProperty,
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
    manufacturer: organizationRef(),
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
    author: organizationRef(),
    publisher: organizationRef(),
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

/**
 * Only channels the contact page actually renders. Telegram and WhatsApp are
 * reached through the sales number unless a verified @username is configured,
 * so the links here are the same ones a reader would click.
 */
function socialUrls(): string[] | undefined {
  const { telegram } = contactConfig.messaging;
  const urls = [
    contactConfig.social.instagram.url,
    telegram.url ?? getMessagingChatUrl("telegram", telegram.fallbackPhone),
    getMessagingChatUrl("whatsapp", contactConfig.messaging.whatsapp.fallbackPhone),
    siteConfig.social.linkedin,
  ].filter((value): value is string => Boolean(value));
  return urls.length > 0 ? urls : undefined;
}
