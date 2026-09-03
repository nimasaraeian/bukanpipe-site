import type { Direction } from "@/lib/i18n/config";
import { routes } from "@/lib/config/routes";

/** Approved demo photography — same set as homepage hero concept. Home keeps slide-03. */
export const industrialSlides = {
  yard: "/media/demo/bukan-slide-01-yard.png",
  extrusion: "/media/demo/bukan-slide-02-extrusion.png",
  product: "/media/demo/bukan-slide-03-product.png",
  inventory: "/media/demo/bukan-slide-04-inventory.png",
} as const;

export type IndustrialSlideId = keyof typeof industrialSlides;

export type PageHeroImage = {
  src: string;
  /** CSS object-position for cinematic framing */
  position?: string;
};

/** Inner-page hero backgrounds (homepage hero is separate). */
export const pageHeroImages: Record<string, PageHeroImage> = {
  [routes.about.path]: { src: industrialSlides.yard, position: "58% center" },
  [routes.products.path]: { src: industrialSlides.product, position: "65% 42%" },
  [routes.solutions.path]: { src: industrialSlides.extrusion, position: "58% center" },
  [routes.industries.path]: { src: industrialSlides.inventory, position: "62% center" },
  [routes.applications.path]: { src: industrialSlides.inventory, position: "62% center" },
  [routes.laboratory.path]: { src: industrialSlides.extrusion, position: "55% center" },
  [routes.projects.path]: { src: industrialSlides.yard, position: "50% 40%" },
  [routes.engineering.path]: { src: industrialSlides.extrusion, position: "60% center" },
  [routes.standards.path]: { src: industrialSlides.extrusion, position: "52% center" },
  [routes.knowledge.path]: { src: industrialSlides.inventory, position: "58% center" },
  [routes.pricing.path]: { src: industrialSlides.product, position: "68% 38%" },
  [routes.tools.path]: { src: industrialSlides.extrusion, position: "56% center" },
  [routes.requestQuote.path]: { src: industrialSlides.product, position: "64% center" },
  [routes.dealers.path]: { src: industrialSlides.inventory, position: "60% center" },
  [routes.verify.path]: { src: industrialSlides.yard, position: "54% center" },
  [routes.contact.path]: { src: industrialSlides.yard, position: "62% 45%" },
};

const defaultInnerHero: PageHeroImage = {
  src: industrialSlides.extrusion,
  position: "58% center",
};

export function getPageHeroImage(path: string, _direction: Direction = "ltr"): PageHeroImage {
  return pageHeroImages[path] ?? defaultInnerHero;
}

/** Card grids on development route pages — varied slides, same visual family. */
export const pageCardImages = {
  products: [industrialSlides.product, industrialSlides.inventory, industrialSlides.yard] as const,
  solutions: [industrialSlides.extrusion, industrialSlides.product, industrialSlides.inventory, industrialSlides.yard] as const,
  industries: [industrialSlides.yard, industrialSlides.inventory, industrialSlides.extrusion, industrialSlides.product] as const,
  applications: [industrialSlides.yard, industrialSlides.inventory, industrialSlides.extrusion] as const,
  laboratory: [industrialSlides.extrusion, industrialSlides.product, industrialSlides.yard] as const,
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
