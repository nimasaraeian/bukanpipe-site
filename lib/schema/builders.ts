import { siteConfig } from "@/lib/config/site";
import { canonicalUrl } from "@/lib/seo/canonical";
import { omitUndefined } from "@/lib/schema/serialize";
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
    sameAs: socialUrls(),
  });
}

export function webSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    inLanguage: siteConfig.defaultLocale,
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
  });
}

export function articleSchema(article: Article): Record<string, unknown> {
  return omitUndefined({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: canonicalUrl(`/knowledge/${article.slug}`),
    dateModified: article.updatedAt,
    inLanguage: siteConfig.defaultLocale,
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
