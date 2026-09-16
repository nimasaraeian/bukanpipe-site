import type { TemporaryVisualRecord, VisualAssetRole } from "@/data/media/temporary-types";

const DEMO_STATUS = "DEMO_VISUAL" as const;

function asset(draft: TemporaryVisualRecord): TemporaryVisualRecord {
  return draft;
}

/** Premium AI-generated placeholders (Phase 004C). Replace with official factory photography at launch. */
export const temporaryVisuals: readonly TemporaryVisualRecord[] = [
  asset({
    id: "demo-hero-visual",
    role: "HERO_VISUAL",
    status: DEMO_STATUS,
    kind: "pipe-render",
    src: "/media/demo/bukan-slide-01-yard.webp",
    width: 1536,
    height: 1024,
    aspectRatio: "3:2",
    seo: {
      alt: "Abstract polyethylene pipe extrusion render — design placeholder, not a factory photograph",
      title: "Hero visual placeholder — premium pipe geometry render",
      description:
        "Premium temporary 3D-style render for layout approval. Replace with verified official Bukan Pipe photography before launch.",
      decorative: false,
    },
    replaceWith: "Official wide factory or infrastructure hero photograph (A-grade)",
    notes: "AI-generated abstract pipe render. No people, equipment brands, or site-specific claims.",
  }),
  asset({
    id: "demo-factory-placeholder",
    role: "FACTORY_PLACEHOLDER",
    status: DEMO_STATUS,
    kind: "abstract-industrial",
    src: "/media/demo/bukan-slide-02-extrusion.webp",
    width: 1024,
    height: 1536,
    aspectRatio: "2:3",
    seo: {
      alt: "Abstract industrial hall render — design placeholder, not a factory photograph",
      title: "Factory placeholder — premium industrial interior concept",
      description:
        "Stylized interior concept for design development only. Not Bukan Pipe factory photography.",
      decorative: false,
    },
    replaceWith: "Verified production hall or factory interior official photography",
    notes: "AI-generated architectural abstraction. Not a real site.",
  }),
  asset({
    id: "demo-product-placeholder",
    role: "PRODUCT_PLACEHOLDER",
    status: DEMO_STATUS,
    kind: "technical-illustration",
    src: "/media/demo/bukan-slide-03-product.webp",
    width: 1536,
    height: 1024,
    aspectRatio: "3:2",
    seo: {
      alt: "Technical pipe cross-section render — design placeholder, not a product photograph",
      title: "Product placeholder — pipe cross-section visualization",
      description:
        "Engineering-style product visual for card and catalog rhythm. Not a SKU or product claim.",
      decorative: false,
    },
    replaceWith: "Official product family photography with verified range context",
    notes: "AI-generated cutaway render. No diameter, PN, or material claims.",
  }),
  asset({
    id: "demo-lab-placeholder",
    role: "LAB_PLACEHOLDER",
    status: DEMO_STATUS,
    kind: "engineering-diagram",
    src: "/media/demo/bukan-slide-02-extrusion.webp",
    width: 1024,
    height: 1024,
    aspectRatio: "1:1",
    seo: {
      alt: "Abstract quality-control dashboard render — design placeholder, not a laboratory photograph",
      title: "Laboratory placeholder — QC concept visualization",
      description:
        "Technical illustration for laboratory page rhythm. Does not imply accreditation or live testing.",
      decorative: false,
    },
    replaceWith: "Official laboratory photography with verified scope and consent",
    notes: "AI-generated QC concept. No technicians, logos, or certificate implications.",
  }),
  asset({
    id: "demo-project-placeholder",
    role: "PROJECT_PLACEHOLDER",
    status: DEMO_STATUS,
    kind: "infrastructure-concept",
    src: "/media/demo/bukan-slide-04-inventory.webp",
    width: 1536,
    height: 1024,
    aspectRatio: "3:2",
    seo: {
      alt: "Abstract pipeline network concept render — design placeholder, not a named project site",
      title: "Project placeholder — infrastructure network visualization",
      description:
        "Conceptual network visual for case-study layouts. Not a client site or installation claim.",
      decorative: false,
    },
    replaceWith: "Named project photography with publication permission",
    notes: "AI-generated network concept. No geography, client marks, or installed pipe claims.",
  }),
];

export const temporaryVisualByRole: Record<
  VisualAssetRole,
  TemporaryVisualRecord
> = Object.fromEntries(
  temporaryVisuals.map((item) => [item.role, item]),
) as Record<VisualAssetRole, TemporaryVisualRecord>;

export function getTemporaryVisual(id: string): TemporaryVisualRecord | undefined {
  return temporaryVisuals.find((item) => item.id === id);
}

export function temporaryVisualForRole(
  role: VisualAssetRole,
): TemporaryVisualRecord {
  return temporaryVisualByRole[role];
}
