import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";
import { canonicalUrl } from "@/lib/seo/canonical";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
};

export function createRootMetadata(): Metadata {
  const indexable = siteConfig.allowIndexing;
  const canonical = canonicalUrl("/");

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: siteConfig.defaultTitle,
      template: `%s | ${siteConfig.brandName}`,
    },
    description: siteConfig.defaultDescription,
    applicationName: siteConfig.brandName,
    alternates: {
      canonical,
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: siteConfig.openGraphLocale,
      url: canonical,
      siteName: siteConfig.brandName,
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
    },
    twitter: {
      card: "summary",
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
    },
  };
}

export function createPageMetadata(input: PageMetadataInput): Metadata {
  const indexable = siteConfig.allowIndexing;
  const url = canonicalUrl(input.path);
  const title = input.title;
  const description = input.description;

  return {
    title,
    description,
    keywords: input.keywords ? [...input.keywords] : undefined,
    alternates: {
      canonical: url,
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: siteConfig.openGraphLocale,
      url,
      siteName: siteConfig.brandName,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
