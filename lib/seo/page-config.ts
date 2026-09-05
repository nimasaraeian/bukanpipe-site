import type { ContentDocument } from "@/content/models/content-document";
import type { Locale } from "@/lib/i18n/config";
import { brandAssets } from "@/lib/media/brand-assets";
import { siteConfig } from "@/lib/config/site";

/** Default Open Graph image — factory product hero (1200×630 safe crop). */
export const DEFAULT_OG_IMAGE = {
  url: "/media/demo/bukan-slide-03-product.png",
  width: 1200,
  height: 630,
  alt: "BUKAN PIPE — HDPE and PE100 polyethylene pipe manufacturing",
} as const;

export const OG_IMAGES = {
  home: {
    url: "/media/brand/about-factory-hero.png",
    width: 1200,
    height: 630,
    alt: "Bukan Pipe HDPE pipe factory — Bukan, Iran",
  },
  products: DEFAULT_OG_IMAGE,
  applications: {
    url: "/media/brand/applications-hero.png",
    width: 1200,
    height: 630,
    alt: "HDPE pipe applications — water, gas and irrigation networks",
  },
  laboratory: {
    url: "/media/brand/laboratory-hero.png",
    width: 1200,
    height: 630,
    alt: "Polyethylene pipe quality testing laboratory at Bukan Pipe",
  },
  technical: {
    url: "/media/brand/technical-center-hero.jpg",
    width: 1200,
    height: 630,
    alt: "HDPE pipe engineering technical resources — Bukan Pipe",
  },
  calculator: {
    url: "/media/brand/calculator-hero.png",
    width: 1200,
    height: 630,
    alt: "HDPE pipeline engineering calculator — Bukan Pipe",
  },
} as const;

/** Thin placeholder routes — noindex until content is verified. */
export const NOINDEX_PATHS = new Set<string>([
  "/projects",
  "/pricing",
  "/dealers",
  "/verify",
  "/design-system",
]);

export type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  keywords?: readonly string[];
  canonical?: string;
  hreflang?: Record<string, string>;
  ogImage?: (typeof DEFAULT_OG_IMAGE);
  index?: boolean;
  schema?: readonly string[];
};

export function isNoindexPath(path: string): boolean {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  return NOINDEX_PATHS.has(normalized);
}

export function getOgImageForPath(path: string): typeof DEFAULT_OG_IMAGE | undefined {
  if (path === "/") return OG_IMAGES.home;
  if (path === "/products" || path.startsWith("/products/")) return OG_IMAGES.products;
  if (path === "/applications" || path.startsWith("/applications/")) return OG_IMAGES.applications;
  if (path === "/laboratory" || path.startsWith("/laboratory/")) return OG_IMAGES.laboratory;
  if (path.startsWith("/technical-center") || path === "/polyethylene-pipe") return OG_IMAGES.technical;
  if (path.startsWith("/calculator")) return OG_IMAGES.calculator;
  if (path === "/about") return OG_IMAGES.home;
  return DEFAULT_OG_IMAGE;
}

export function getOgImageForContent(doc: ContentDocument): typeof DEFAULT_OG_IMAGE {
  if (doc.heroImage) {
    return {
      url: doc.heroImage.src,
      width: doc.heroImage.width ?? DEFAULT_OG_IMAGE.width,
      height: doc.heroImage.height ?? DEFAULT_OG_IMAGE.height,
      alt: doc.heroImage.alt,
    };
  }
  const byPath = getOgImageForPath(doc.path);
  if (byPath) {
    return doc.imageAlt ? { ...byPath, alt: doc.imageAlt } : byPath;
  }
  return doc.imageAlt
    ? { ...DEFAULT_OG_IMAGE, alt: doc.imageAlt }
    : DEFAULT_OG_IMAGE;
}

export function organizationLogoUrl(): string {
  return `${siteConfig.siteUrl}${brandAssets.logo}`;
}
