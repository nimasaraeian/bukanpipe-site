import type { Locale } from "@/lib/i18n/config";
import { faProductsHeroCopy } from "@/lib/products/fa-hub-hero";

export type HeroCallout = {
  id: string;
  label: string;
  detail: string;
  /** Anchor on pipe image (% of visual frame) */
  anchor: { x: number; y: number };
  /** Label box position (% of visual frame) */
  labelAt: { x: number; y: number };
};

export type HeroFeature = {
  id: string;
  label: string;
  icon: "shield" | "clock" | "recycle" | "links";
};

/** Calibration constants — desktop 1440px target */
export const enProductsHeroLayout = {
  heroMinHeightPx: 680,
  copyMaxWidthPx: 520,
  pipeStageWidthPx: 860,
  pipeStageTopPx: 8,
  pipeImageWidthPx: 780,
  pipeImageHeightPx: 520,
} as const;

export const enProductsHeroAssets = {
  pipeRender: "/media/products/en/hero-pe100.png",
  pipeRenderWidth: 780,
  pipeRenderHeight: 439,
  goldenReferenceOverlay: "/media/products/en/golden-reference-overlay.png",
} as const;

export const enProductsHeroCopy = {
  eyebrowBrand: "BUKAN PIPE",
  eyebrowSuffix: "PE100 PIPE SYSTEMS",
  titleLine1: "Engineered",
  titleLine2: "From the Inside Out",
  lead:
    "High performance HDPE (PE100) pipe systems engineered for water, gas, irrigation, sewer, drainage and critical infrastructure.",
  features: [
    { id: "corrosion", label: "Corrosion Resistant", icon: "shield" },
    { id: "service-life", label: "Long Service Life", icon: "clock" },
    { id: "recyclable", label: "Sustainable & Recyclable", icon: "recycle" },
    { id: "leak-free", label: "Leak-Free Performance", icon: "links" },
  ] satisfies readonly HeroFeature[],
  callouts: [
    {
      id: "pe100-material",
      label: "PE100 Material",
      detail: "High strength PE100 compound",
      anchor: { x: 56, y: 28 },
      labelAt: { x: 18, y: 18 },
    },
    {
      id: "wall-structure",
      label: "Uniform Wall Structure",
      detail: "Consistent thickness for reliable pressure performance",
      anchor: { x: 54, y: 42 },
      labelAt: { x: 18, y: 36 },
    },
    {
      id: "internal-bore",
      label: "Smooth Internal Bore",
      detail: "Low friction for maximum flow efficiency",
      anchor: { x: 52, y: 56 },
      labelAt: { x: 18, y: 54 },
    },
    {
      id: "uv-exterior",
      label: "UV Stabilized Exterior",
      detail: "Enhanced protection for harsh environments",
      anchor: { x: 58, y: 72 },
      labelAt: { x: 18, y: 72 },
    },
  ] satisfies readonly HeroCallout[],
} as const;

export type ProductsHeroCopy = {
  eyebrowBrand: string;
  eyebrowSuffix: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  features: readonly HeroFeature[];
  callouts: readonly HeroCallout[];
};

export function getProductsHeroCopy(locale: Locale): ProductsHeroCopy {
  return locale === "fa" ? faProductsHeroCopy : enProductsHeroCopy;
}
