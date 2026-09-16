import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { openGraphLocale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";
import { siteConfig } from "@/lib/config/site";
import { canonicalUrl } from "@/lib/seo/canonical";
import { buildLanguageAlternates } from "@/lib/i18n/locale-availability";
import {
  DEFAULT_OG_IMAGE,
  getOgImageForPath,
  isNoindexPath,
  type OgImage,
  type PageSeoConfig,
} from "@/lib/seo/page-config";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  keywords?: readonly string[];
  ogImage?: OgImage;
  /** Override global allowIndexing for this page (e.g. stub routes). */
  index?: boolean;
  /** When true, title is not passed through the root template suffix. */
  titleAbsolute?: boolean;
};

function resolveOgImage(
  path: string,
  explicit?: PageMetadataInput["ogImage"],
): OgImage {
  if (explicit) return explicit;
  return getOgImageForPath(path) ?? DEFAULT_OG_IMAGE;
}

function resolveRobots(path: string, indexOverride?: boolean): Metadata["robots"] {
  const indexable =
    indexOverride !== undefined
      ? indexOverride && siteConfig.allowIndexing
      : siteConfig.allowIndexing && !isNoindexPath(path);

  return indexable ? { index: true, follow: true } : { index: false, follow: false };
}

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
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon.ico", sizes: "48x48" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
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
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function createPageMetadata(input: PageMetadataInput): Metadata {
  const url = canonicalUrl(input.locale ? withLocale(input.path, input.locale) : input.path);
  const title = input.title;
  const description = input.description;
  const ogLocale = input.locale ? openGraphLocale[input.locale] : siteConfig.openGraphLocale;
  const languageAlternates = buildLanguageAlternates(input.path);
  const ogImage = resolveOgImage(input.path, input.ogImage);

  return {
    title: input.titleAbsolute ? { absolute: title } : title,
    description,
    keywords: input.keywords ? [...input.keywords] : undefined,
    alternates: {
      canonical: url,
      ...(languageAlternates ? { languages: languageAlternates } : {}),
    },
    robots: resolveRobots(input.path, input.index),
    openGraph: {
      type: "website",
      locale: ogLocale,
      url,
      siteName: siteConfig.brandName,
      title,
      description,
      images: [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

/** Bridge PageSeoConfig → Next Metadata (for programmatic / SDK use). */
export function metadataFromSeoConfig(config: PageSeoConfig): Metadata {
  return createPageMetadata({
    title: config.title,
    description: config.description,
    path: config.path,
    locale: config.locale,
    keywords: config.keywords,
    ogImage: config.ogImage,
    index: config.index,
  });
}
