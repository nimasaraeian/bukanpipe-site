export const mediaGrades = ["A", "B", "C", "REJECT"] as const;
export type MediaGrade = (typeof mediaGrades)[number];

export const mediaCategories = [
  "FACTORY_EXTERIOR",
  "FACTORY_INTERIOR",
  "PRODUCTION_LINE",
  "PIPE_PRODUCT",
  "PIPE_DETAIL",
  "LABORATORY",
  "TESTING",
  "QUALITY_CONTROL",
  "PROJECT",
  "LOADING_LOGISTICS",
  "TEAM",
  "HISTORY",
  "CERTIFICATE",
  "DOCUMENT",
  "BRAND",
] as const;
export type MediaCategory = (typeof mediaCategories)[number];

export const authenticityStatuses = [
  "LEGACY_WP_LIBRARY",
  "LEGACY_PAGE_ASSET",
  "PHASE_003_OWNED_MEDIA",
  "REQUIRES_VALIDITY_VERIFICATION",
  "UNVERIFIED_REPUBLICATION",
  "SUBJECT_UNCONFIRMED",
] as const;
export type AuthenticityStatus = (typeof authenticityStatuses)[number];

export const websiteRoles = [
  "HOMEPAGE_HERO",
  "SUPPORTING_EDITORIAL",
  "SMALL_SUPPORTING",
  "DOCUMENT_SCAN",
  "SPEC_TABLE",
  "BRAND_MARK",
  "ARCHIVE_ONLY",
  "DO_NOT_USE",
] as const;
export type WebsiteRole = (typeof websiteRoles)[number];

export const cropSuitabilities = [
  "FULL_BLEED_UNSAFE",
  "WIDE_EDITORIAL",
  "PORTRAIT_COLUMN",
  "SQUARE_THUMB",
  "SMALL_DISPLAY_ONLY",
  "DOCUMENT_ONLY",
  "NONE",
] as const;
export type CropSuitability = (typeof cropSuitabilities)[number];

export const mediaFormats = [
  "jpeg",
  "png",
  "webp",
  "gif",
  "svg",
  "mp4",
  "pdf",
  "unknown",
] as const;
export type MediaFormat = (typeof mediaFormats)[number];

export type LegacyMediaRecord = {
  id: string;
  wpId: number;
  sourceUrl: string;
  originalFilename: string;
  width: number | null;
  height: number | null;
  aspectRatio: string | null;
  format: MediaFormat;
  filesizeBytes: number | null;
  sourcePage: string;
  subject: string;
  category: MediaCategory;
  authenticity: AuthenticityStatus;
  visualQuality: MediaGrade;
  websiteRole: WebsiteRole;
  cropSuitability: CropSuitability;
  legacyAlt: string;
  proposedFilename: string | null;
  notes: string;
};

export type OgCompositionKind =
  | "homepage"
  | "product-family"
  | "application"
  | "laboratory"
  | "engineering-article"
  | "project-case-study";

export type OgCompositionSpec = {
  kind: OgCompositionKind;
  authenticImageId: string | null;
  identity: "Bukan Pipe / بوکان پایپ";
  titleSource: "page-title";
  clutter: "none";
  status: "specified-not-rendered";
};
