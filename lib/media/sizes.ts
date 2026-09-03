import type { LegacyMediaRecord } from "@/data/media/types";

export function sizesForRole(record: LegacyMediaRecord): string {
  switch (record.cropSuitability) {
    case "WIDE_EDITORIAL":
      return "(min-width: 1024px) 720px, 100vw";
    case "PORTRAIT_COLUMN":
      return "(min-width: 1024px) 360px, 70vw";
    case "SQUARE_THUMB":
      return "160px";
    case "SMALL_DISPLAY_ONLY":
      return "(min-width: 768px) 280px, 45vw";
    default:
      return "100vw";
  }
}

export function objectPositionFor(record: LegacyMediaRecord): string {
  if (record.cropSuitability === "PORTRAIT_COLUMN") {
    return "center 30%";
  }
  if (record.category === "LOADING_LOGISTICS") {
    return "center 45%";
  }
  return "center";
}

export function isRemoteLegacyUrl(src: string): boolean {
  return (
    src.startsWith("https://bukanpipe.com/wp-content/uploads/") ||
    src.startsWith("https://bukanpipe.ir/wp-content/uploads/")
  );
}
