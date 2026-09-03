import type { OgCompositionSpec } from "@/data/media/types";
import { displayMediaIds } from "@/data/media/legacy-media";
import { visualBindings } from "@/data/media/visual-bindings";

/**
 * Social image compositions are specified, not rendered as PNG/JPEG yet.
 * Design-development previews use temporary visuals (Phase 004C).
 */
export const ogCompositions: readonly OgCompositionSpec[] = [
  {
    kind: "homepage",
    temporaryVisualId: visualBindings.homepage.hero,
    authenticImageId: null,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
  {
    kind: "product-family",
    temporaryVisualId: visualBindings.ogPreview.productFamily,
    authenticImageId: displayMediaIds.gasPipe,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
  {
    kind: "application",
    temporaryVisualId: null,
    authenticImageId: null,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
  {
    kind: "laboratory",
    temporaryVisualId: visualBindings.ogPreview.laboratory,
    authenticImageId: displayMediaIds.laboratory,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
  {
    kind: "engineering-article",
    temporaryVisualId: null,
    authenticImageId: null,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
  {
    kind: "project-case-study",
    temporaryVisualId: visualBindings.ogPreview.projectCaseStudy,
    authenticImageId: displayMediaIds.loadingStraightPipe,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
] as const;

export function ogCompositionFor(
  kind: OgCompositionSpec["kind"],
): OgCompositionSpec | undefined {
  return ogCompositions.find((item) => item.kind === kind);
}
