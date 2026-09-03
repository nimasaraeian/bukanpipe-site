import type { TemporaryVisualRecord, VisualAssetRole } from "@/data/media/temporary-types";
import {
  getTemporaryVisual,
  temporaryVisualForRole,
} from "@/data/media/temporary-assets";

export type ResolvedVisualAsset = {
  record: TemporaryVisualRecord;
  unoptimized: boolean;
};

export function resolveTemporaryVisual(id: string): ResolvedVisualAsset | undefined {
  const record = getTemporaryVisual(id);
  if (!record) {
    return undefined;
  }
  return {
    record,
    unoptimized: false,
  };
}

export function resolveRoleVisual(role: VisualAssetRole): ResolvedVisualAsset {
  const record = temporaryVisualForRole(role);
  return { record, unoptimized: false };
}

export function sizesForVisualRole(role: VisualAssetRole): string {
  switch (role) {
    case "HERO_VISUAL":
      return "(min-width: 1280px) 1200px, 100vw";
    case "FACTORY_PLACEHOLDER":
      return "(min-width: 1024px) 420px, 70vw";
    case "PRODUCT_PLACEHOLDER":
      return "(min-width: 1024px) 360px, 90vw";
    case "LAB_PLACEHOLDER":
      return "(min-width: 768px) 280px, 60vw";
    case "PROJECT_PLACEHOLDER":
      return "(min-width: 1024px) 720px, 100vw";
    default:
      return "100vw";
  }
}

export function objectPositionForRole(role: VisualAssetRole): string {
  if (role === "FACTORY_PLACEHOLDER") {
    return "center 35%";
  }
  if (role === "PRODUCT_PLACEHOLDER") {
    return "center";
  }
  return "center";
}
