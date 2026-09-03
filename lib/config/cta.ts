export const ctaTypes = [
  "REQUEST_QUOTE",
  "CONTACT_SALES",
  "VIEW_PRODUCT",
  "DOWNLOAD_DATASHEET",
  "VIEW_STANDARD",
  "VIEW_PROJECT",
  "USE_TOOL",
  "REQUEST_LAB_TEST",
  "VERIFY_DEALER",
] as const;

export type CtaType = (typeof ctaTypes)[number];
