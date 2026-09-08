import { siteConfig } from "@/lib/config/site";

import { postalAddressSchema } from "@/lib/config/contact";

import { canonicalUrl } from "@/lib/seo/canonical";

import { organizationLogoUrl } from "@/lib/seo/page-config";

import { omitUndefined } from "@/lib/schema/serialize";

import type { Locale } from "@/lib/i18n/config";

import type { Article } from "@/content/models/article";

import type { Product } from "@/content/models/product";

import type { Project } from "@/content/models/project";



export function organizationSchema(): Record<string, unknown> {

  return omitUndefined({

    "@context": "https://schema.org",

    "@type": "Organization",

    name: siteConfig.brandName,

    alternateName: siteConfig.brandNameFa,

    url: siteConfig.siteUrl,

    logo: organizationLogoUrl(),

    address: postalAddressSchema(),

    sameAs: socialUrls(),

  });

}



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

      logo: organizationLogoUrl(),

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

}): Record<string, unknown> {

  return omitUndefined({

    "@context": "https://schema.org",

    "@type": "Product",

    name: input.name,

    description: input.description,

    url: input.url,

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

      logo: organizationLogoUrl(),

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

  const urls = [siteConfig.social.instagram, siteConfig.social.linkedin].filter(

    (value): value is string => Boolean(value),

  );

  return urls.length > 0 ? urls : undefined;

}


