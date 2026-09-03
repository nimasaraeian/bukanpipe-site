import type { VisualAssetRole } from "@/data/media/temporary-types";

/**
 * Page and component slots → temporary visual asset ids.
 * Change only this file (or swap to official ids later) to replace visuals site-wide.
 */
export const visualBindings = {
  homepage: {
    hero: "demo-hero-visual" as const,
    filmstrip: [
      "demo-hero-visual",
      "demo-factory-placeholder",
      "demo-lab-placeholder",
      "demo-product-placeholder",
    ] as const,
  },
  cards: {
    product: "demo-product-placeholder" as const,
    laboratory: "demo-lab-placeholder" as const,
    project: "demo-project-placeholder" as const,
    factory: "demo-factory-placeholder" as const,
  },
  editorial: {
    wideSplit: "demo-project-placeholder" as const,
    overlay: "demo-factory-placeholder" as const,
    portrait: "demo-factory-placeholder" as const,
    ringLab: "demo-lab-placeholder" as const,
    diagonalProduct: "demo-product-placeholder" as const,
  },
  ogPreview: {
    productFamily: "demo-product-placeholder" as const,
    laboratory: "demo-lab-placeholder" as const,
    projectCaseStudy: "demo-project-placeholder" as const,
  },
} as const;

export type VisualBindingSlot = keyof typeof visualBindings;

export function roleForBinding(
  assetId: (typeof visualBindings)["cards"][keyof (typeof visualBindings)["cards"]],
): VisualAssetRole {
  const map: Record<string, VisualAssetRole> = {
    "demo-hero-visual": "HERO_VISUAL",
    "demo-factory-placeholder": "FACTORY_PLACEHOLDER",
    "demo-product-placeholder": "PRODUCT_PLACEHOLDER",
    "demo-lab-placeholder": "LAB_PLACEHOLDER",
    "demo-project-placeholder": "PROJECT_PLACEHOLDER",
  };
  return map[assetId] ?? "HERO_VISUAL";
}
