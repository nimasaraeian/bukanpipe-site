export const visualAssetRoles = [
  "HERO_VISUAL",
  "FACTORY_PLACEHOLDER",
  "PRODUCT_PLACEHOLDER",
  "LAB_PLACEHOLDER",
  "PROJECT_PLACEHOLDER",
] as const;
export type VisualAssetRole = (typeof visualAssetRoles)[number];

export const temporaryVisualStatuses = [
  "DEMO_VISUAL",
  "REPLACE_WITH_OFFICIAL_FACTORY_ASSET",
] as const;
export type TemporaryVisualStatus = (typeof temporaryVisualStatuses)[number];

export const temporaryVisualKinds = [
  "abstract-industrial",
  "engineering-diagram",
  "pipe-render",
  "infrastructure-concept",
  "material-study",
  "technical-illustration",
] as const;
export type TemporaryVisualKind = (typeof temporaryVisualKinds)[number];

/** SEO-ready metadata for a visual asset slot. */
export type VisualAssetSeo = {
  alt: string;
  title: string;
  description: string;
  decorative: boolean;
};

/**
 * Temporary design-development asset. Not a factory photograph.
 * Swap `src` (or replace the whole record with an official asset) at launch.
 */
export type TemporaryVisualRecord = {
  id: string;
  role: VisualAssetRole;
  status: TemporaryVisualStatus;
  kind: TemporaryVisualKind;
  src: string;
  width: number;
  height: number;
  aspectRatio: string;
  seo: VisualAssetSeo;
  /** Human-readable official replacement target. */
  replaceWith: string;
  notes: string;
};

export type VisualAssetSource =
  | { kind: "temporary"; id: string }
  | { kind: "legacy"; id: string };
