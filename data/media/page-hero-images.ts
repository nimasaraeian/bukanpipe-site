import type { Direction } from "@/lib/i18n/config";
import { routes } from "@/lib/config/routes";
import { editorialPhotos } from "@/data/media/editorial-photos";
import { productSystemAssets } from "@/lib/products/product-assets";

/** Approved demo photography — same set as homepage hero concept. Home keeps slide-03. */
export const industrialSlides = {
  yard: "/media/demo/bukan-slide-01-yard.png",
  extrusion: "/media/demo/bukan-slide-02-extrusion.png",
  product: "/media/demo/bukan-slide-03-product.png",
  inventory: "/media/demo/bukan-slide-04-inventory.png",
} as const;

/** Homepage hero — full pyramid on desktop; cinematic crop on mobile. */
export const homeHeroImage = {
  src: {
    en: "/media/brand/home-hero-pyramid-en.jpg",
    fa: "/media/brand/home-hero-pyramid-fa.jpg",
  },
  mobileSrc: {
    en: "/media/brand/home-hero-pyramid-mobile-en.jpg",
    fa: "/media/brand/home-hero-pyramid-mobile-fa.jpg",
  },
  /** Desktop — full frame, golden point on the pipe side */
  position: { en: "100% 50%", fa: "0% 50%" },
  /** Mobile — mirror of FA framing (pipes opposite the copy column) */
  mobilePosition: { en: "72% 46%", fa: "28% 46%" },
} as const;

export type IndustrialSlideId = keyof typeof industrialSlides;

export type PageHeroImage = {
  src: string;
  /** CSS object-position for cinematic framing (desktop LTR) */
  position?: string;
  /** Desktop RTL — mirror crop when subject sits on one side */
  positionRtl?: string;
  /** Mobile overlay — keep focal point opposite the text column */
  mobilePosition?: {
    ltr?: string;
    rtl?: string;
  };
  /** Lighter overlays — keeps logo / golden highlights visible on the right */
  variant?: "brand" | "default" | "product";
  /** Optional BEM modifier for page-specific crop tuning */
  sceneModifier?: "applications" | "about" | "calculator" | "laboratory" | "downloads" | "technical" | "quality";
};

/** Inner-page hero backgrounds (homepage hero is separate). */
export const pageHeroImages: Record<string, PageHeroImage> = {
  [routes.about.path]: {
    src: editorialPhotos.aboutHero,
    position: "48% 52%",
    mobilePosition: { ltr: "56% 48%", rtl: "56% 48%" },
    variant: "brand",
    sceneModifier: "about",
  },
  [routes.products.path]: {
    src: industrialSlides.product,
    position: "65% 42%",
    mobilePosition: { ltr: "72% 44%", rtl: "28% 44%" },
  },
  [routes.solutions.path]: {
    src: industrialSlides.extrusion,
    position: "58% center",
    mobilePosition: { ltr: "70% center", rtl: "30% center" },
  },
  [routes.industries.path]: {
    src: industrialSlides.inventory,
    position: "62% center",
    mobilePosition: { ltr: "72% center", rtl: "28% center" },
  },
  [routes.applications.path]: {
    src: "/media/brand/applications-hero.png",
    position: "72% 88%",
    mobilePosition: { ltr: "68% 72%", rtl: "28% 68%" },
    variant: "brand",
    sceneModifier: "applications",
  },
  "/calculator": {
    src: "/media/brand/calculator-hero.png",
    position: "84% 56%",
    mobilePosition: { ltr: "78% 50%", rtl: "22% 50%" },
    variant: "brand",
    sceneModifier: "calculator",
  },
  [routes.laboratory.path]: {
    src: editorialPhotos.laboratoryHero,
    position: "78% 50%",
    positionRtl: "22% 50%",
    mobilePosition: { ltr: "76% 50%", rtl: "24% 50%" },
    variant: "brand",
    sceneModifier: "laboratory",
  },
  [routes.projects.path]: {
    src: industrialSlides.yard,
    position: "50% 40%",
    mobilePosition: { ltr: "68% 42%", rtl: "32% 42%" },
  },
  [routes.engineering.path]: {
    src: industrialSlides.extrusion,
    position: "60% center",
    mobilePosition: { ltr: "70% center", rtl: "30% center" },
  },
  [routes.standards.path]: {
    src: industrialSlides.extrusion,
    position: "52% center",
    mobilePosition: { ltr: "68% center", rtl: "32% center" },
  },
  [routes.knowledge.path]: {
    src: industrialSlides.inventory,
    position: "58% center",
    mobilePosition: { ltr: "70% center", rtl: "30% center" },
  },
  "/technical-center": {
    src: "/media/brand/technical-center-hero.jpg",
    position: "74% center",
    mobilePosition: { ltr: "78% center", rtl: "22% center" },
    sceneModifier: "technical",
  },
  "/downloads": {
    src: "/media/brand/downloads-hero.png",
    position: "72% center",
    mobilePosition: { ltr: "72% center", rtl: "72% center" },
    variant: "brand",
    sceneModifier: "downloads",
  },
  [routes.pricing.path]: {
    src: industrialSlides.product,
    position: "68% 38%",
    mobilePosition: { ltr: "74% 40%", rtl: "26% 40%" },
  },
  [routes.tools.path]: {
    src: industrialSlides.extrusion,
    position: "56% center",
    mobilePosition: { ltr: "68% center", rtl: "32% center" },
  },
  [routes.requestQuote.path]: {
    src: industrialSlides.product,
    position: "64% center",
    mobilePosition: { ltr: "72% center", rtl: "28% center" },
  },
  [routes.dealers.path]: {
    src: industrialSlides.inventory,
    position: "60% center",
    mobilePosition: { ltr: "70% center", rtl: "30% center" },
  },
  [routes.verify.path]: {
    src: industrialSlides.yard,
    position: "54% center",
    mobilePosition: { ltr: "68% center", rtl: "32% center" },
  },
  [routes.contact.path]: {
    src: industrialSlides.yard,
    position: "62% 45%",
    mobilePosition: { ltr: "70% 44%", rtl: "30% 44%" },
  },
  "/quality": {
    src: editorialPhotos.qualityHero,
    position: "78% 50%",
    positionRtl: "22% 50%",
    mobilePosition: { ltr: "76% 50%", rtl: "24% 50%" },
    variant: "brand",
    sceneModifier: "quality",
  },
  "/certifications": {
    src: industrialSlides.product,
    position: "64% 40%",
    mobilePosition: { ltr: "70% 42%", rtl: "30% 42%" },
  },
};

/** Per-application detail heroes — product renders with baked-in logo (never mirror) */
export const applicationDetailHeroImages: Record<string, PageHeroImage> = {
  "/applications/water-transfer": {
    src: productSystemAssets.water,
    position: "76% 54%",
    mobilePosition: { ltr: "78% 52%", rtl: "22% 52%" },
    variant: "product",
  },
  "/applications/agriculture-irrigation": {
    src: productSystemAssets.irrigation,
    position: "64% 56%",
    mobilePosition: { ltr: "74% 54%", rtl: "26% 54%" },
    variant: "product",
  },
  "/applications/gas-distribution": {
    src: productSystemAssets.gas,
    position: "70% 50%",
    mobilePosition: { ltr: "76% 48%", rtl: "24% 48%" },
    variant: "product",
  },
  "/applications/sewage": {
    src: productSystemAssets.sewer,
    position: "66% 48%",
    mobilePosition: { ltr: "74% 46%", rtl: "26% 46%" },
    variant: "product",
  },
  "/applications/drainage": {
    src: productSystemAssets.drainage,
    position: "48% 62%",
    mobilePosition: { ltr: "72% 58%", rtl: "28% 58%" },
    variant: "product",
  },
  "/applications/industrial": {
    src: productSystemAssets.pe100,
    position: "68% 52%",
    mobilePosition: { ltr: "76% 50%", rtl: "24% 50%" },
    variant: "product",
  },
  "/applications/cable-protection": {
    src: industrialSlides.inventory,
    position: "58% center",
    mobilePosition: { ltr: "70% center", rtl: "30% center" },
    variant: "product",
  },
};

/** Per-product detail heroes — SEO landing pages with product renders */
export const productDetailHeroImages: Record<string, PageHeroImage> = {
  "/products/water-supply-pipe": {
    src: productSystemAssets.water,
    position: "76% 54%",
    mobilePosition: { ltr: "78% 52%", rtl: "22% 52%" },
    variant: "product",
  },
  "/products/gas-pipe": {
    src: productSystemAssets.gas,
    position: "70% 50%",
    mobilePosition: { ltr: "76% 48%", rtl: "24% 48%" },
    variant: "product",
  },
  "/products/irrigation-pipe": {
    src: productSystemAssets.irrigation,
    position: "64% 56%",
    mobilePosition: { ltr: "74% 54%", rtl: "26% 54%" },
    variant: "product",
  },
  "/products/industrial-pipe": {
    src: productSystemAssets.pe100,
    position: "68% 52%",
    mobilePosition: { ltr: "76% 50%", rtl: "24% 50%" },
    variant: "product",
  },
  "/products/pe100-pipe": {
    src: productSystemAssets.pe100,
    position: "72% 48%",
    mobilePosition: { ltr: "78% 46%", rtl: "22% 46%" },
    variant: "product",
  },
  "/products/sewage-pipe": {
    src: productSystemAssets.sewer,
    position: "66% 48%",
    mobilePosition: { ltr: "74% 46%", rtl: "26% 46%" },
    variant: "product",
  },
  "/products/drainage-pipe": {
    src: productSystemAssets.drainage,
    position: "48% 62%",
    mobilePosition: { ltr: "72% 58%", rtl: "28% 58%" },
    variant: "product",
  },
  "/technical-center/pe100-technical-guide": {
    src: productSystemAssets.pe100,
    position: "68% 50%",
    mobilePosition: { ltr: "76% 48%", rtl: "24% 48%" },
    variant: "product",
    sceneModifier: "technical",
  },
  "/technical-center/hdpe-installation-guide": {
    src: industrialSlides.yard,
    position: "58% 44%",
    mobilePosition: { ltr: "70% 42%", rtl: "30% 42%" },
    sceneModifier: "technical",
  },
  "/technical-center/hdpe-pipe-what-is": {
    src: productSystemAssets.pe100,
    position: "68% 50%",
    mobilePosition: { ltr: "76% 48%", rtl: "24% 48%" },
    variant: "product",
    sceneModifier: "technical",
  },
  "/technical-center/pe80-vs-pe100": {
    src: productSystemAssets.pe100,
    position: "70% 48%",
    mobilePosition: { ltr: "78% 46%", rtl: "22% 46%" },
    variant: "product",
    sceneModifier: "technical",
  },
  "/technical-center/polyethylene-pipe-specifications": {
    src: industrialSlides.inventory,
    position: "62% center",
    mobilePosition: { ltr: "72% center", rtl: "28% center" },
    sceneModifier: "technical",
  },
  "/technical-center/polyethylene-pipe-standards": {
    src: industrialSlides.extrusion,
    position: "58% center",
    mobilePosition: { ltr: "70% center", rtl: "30% center" },
    sceneModifier: "technical",
  },
};

const allPageHeroImages: Record<string, PageHeroImage> = {
  ...pageHeroImages,
  ...applicationDetailHeroImages,
  ...productDetailHeroImages,
};

const defaultInnerHero: PageHeroImage = {
  src: industrialSlides.extrusion,
  position: "58% center",
  mobilePosition: { ltr: "70% center", rtl: "30% center" },
};

export function getPageHeroImage(path: string, _direction: Direction = "ltr"): PageHeroImage {
  if (allPageHeroImages[path]) return allPageHeroImages[path];

  const parentPath = path.replace(/\/[^/]+$/, "");
  if (parentPath && allPageHeroImages[parentPath]) {
    return allPageHeroImages[parentPath];
  }

  return defaultInnerHero;
}

/** Props for IndustrialPageHero from a resolved hero config */
export function getIndustrialPageHeroImageProps(hero: PageHeroImage) {
  return {
    imageSrc: hero.src,
    imagePosition: hero.position,
    imagePositionRtl: hero.positionRtl,
    imageMobilePositionLtr: hero.mobilePosition?.ltr,
    imageMobilePositionRtl: hero.mobilePosition?.rtl,
    imageVariant: hero.variant,
    imageSceneModifier: hero.sceneModifier,
  };
}

/** Card grids on development route pages — varied slides, same visual family. */
export const pageCardImages = {
  products: [industrialSlides.product, industrialSlides.inventory, industrialSlides.yard] as const,
  solutions: [industrialSlides.extrusion, industrialSlides.product, industrialSlides.inventory, industrialSlides.yard] as const,
  industries: [industrialSlides.yard, industrialSlides.inventory, industrialSlides.extrusion, industrialSlides.product] as const,
  applications: [industrialSlides.yard, industrialSlides.inventory, industrialSlides.extrusion] as const,
  laboratory: [
    editorialPhotos.laboratoryHero,
    editorialPhotos.qualityHero,
    editorialPhotos.homeManufacturing,
  ] as const,
  projects: [industrialSlides.inventory, industrialSlides.yard] as const,
  engineering: [industrialSlides.extrusion, industrialSlides.product, industrialSlides.inventory] as const,
  default: [industrialSlides.extrusion, industrialSlides.inventory, industrialSlides.yard] as const,
} as const;

export function getPageCardImages(path: string): readonly string[] {
  if (path === routes.products.path) return pageCardImages.products;
  if (path === routes.solutions.path) return pageCardImages.solutions;
  if (path === routes.industries.path || path === routes.applications.path) {
    return pageCardImages.industries;
  }
  if (path === routes.laboratory.path) return pageCardImages.laboratory;
  if (path === routes.projects.path) return pageCardImages.projects;
  if (path === routes.engineering.path || path === routes.knowledge.path) {
    return pageCardImages.engineering;
  }
  return pageCardImages.default;
}
