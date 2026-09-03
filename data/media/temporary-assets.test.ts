import { describe, expect, it } from "vitest";
import {
  getTemporaryVisual,
  temporaryVisualByRole,
  temporaryVisuals,
} from "@/data/media/temporary-assets";
import {
  temporaryVisualKinds,
  temporaryVisualStatuses,
  visualAssetRoles,
} from "@/data/media/temporary-types";
import { visualBindings } from "@/data/media/visual-bindings";
import { resolveTemporaryVisual } from "@/lib/media/visual-asset";

describe("temporary visual assets", () => {
  it("defines one demo asset per approved role", () => {
    expect(temporaryVisuals).toHaveLength(visualAssetRoles.length);
    for (const role of visualAssetRoles) {
      expect(temporaryVisualByRole[role]?.role).toBe(role);
    }
  });

  it("marks every asset as demo with replacement guidance", () => {
    for (const asset of temporaryVisuals) {
      expect(temporaryVisualStatuses).toContain(asset.status);
      expect(asset.status).toBe("DEMO_VISUAL");
      expect(asset.replaceWith.length).toBeGreaterThan(12);
      expect(temporaryVisualKinds).toContain(asset.kind);
      expect(asset.src.startsWith("/media/demo/")).toBe(true);
    }
  });

  it("does not claim factory authenticity in alt text", () => {
    for (const asset of temporaryVisuals) {
      const alt = asset.seo.alt.toLowerCase();
      expect(alt).toMatch(/placeholder|abstract|design|diagram|not a/);
      expect(alt).not.toMatch(/^(?!.*not ).*(bukan pipe factory|our factory|کارخانه بوکان)/);
    }
  });

  it("resolves bindings used on the homepage and cards", () => {
    for (const id of visualBindings.homepage.filmstrip) {
      expect(resolveTemporaryVisual(id)).toBeDefined();
    }
    expect(getTemporaryVisual(visualBindings.cards.product)?.role).toBe(
      "PRODUCT_PLACEHOLDER",
    );
    expect(getTemporaryVisual(visualBindings.cards.laboratory)?.role).toBe(
      "LAB_PLACEHOLDER",
    );
  });
});
