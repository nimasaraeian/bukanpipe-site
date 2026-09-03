import type { OgCompositionSpec } from "@/data/media/types";
import { displayMediaIds } from "@/data/media/legacy-media";

/**
 * Social image compositions are specified, not rendered as PNG/JPEG yet.
 * Do not emit a fake photograph as an Open Graph image.
 */
export const ogCompositions: readonly OgCompositionSpec[] = [
  {
    kind: "homepage",
    authenticImageId: null,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
  {
    kind: "product-family",
    authenticImageId: displayMediaIds.gasPipe,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
  {
    kind: "application",
    authenticImageId: null,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
  {
    kind: "laboratory",
    authenticImageId: displayMediaIds.laboratory,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
  {
    kind: "engineering-article",
    authenticImageId: null,
    identity: "Bukan Pipe / بوکان پایپ",
    titleSource: "page-title",
    clutter: "none",
    status: "specified-not-rendered",
  },
  {
    kind: "project-case-study",
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
