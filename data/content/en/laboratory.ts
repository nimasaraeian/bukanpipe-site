import type { ContentDocument } from "@/content/models/content-document";

function labPage(
  slug: string,
  title: string,
  seoTitle: string,
  seoDescription: string,
  description: string,
  primaryKeyword: string,
  secondaryKeywords: readonly string[],
  sections: ContentDocument["sections"],
  evidenceStatus: ContentDocument["evidenceStatus"] = "requires-verification",
): ContentDocument {
  const path = slug ? `/laboratory/${slug}` : "/laboratory";
  return {
    id: slug ? `laboratory-${slug}` : "laboratory-hub",
    slug: slug || "laboratory",
    path,
    locale: "en",
    kind: slug ? "laboratory" : "hub",
    title,
    seoTitle,
    seoDescription,
    description,
    primaryKeyword,
    secondaryKeywords,
    status: "published",
    evidenceStatus,
    verificationStatus: "legacy-claim",
    lastReviewed: "2026-09-03",
    references: ["https://bukanpipe.com/qc-and-laboratory/", "https://bukanpipe.com/lab-scope/"],
    breadcrumbs: slug
      ? [
          { label: "Home", path: "/" },
          { label: "Laboratory", path: "/laboratory" },
          { label: title, path },
        ]
      : [
          { label: "Home", path: "/" },
          { label: "Laboratory", path: "/laboratory" },
        ],
    sections,
    related: {
      laboratory: slug === "iso-17025" ? ["services", "test-scope"] : ["iso-17025"],
      products: ["water-supply-pipe", "gas-pipe"],
    },
  };
}

export const enLaboratoryHub = labPage(
  "",
  "Laboratory & Quality Control",
  "Polyethylene Pipe Testing Laboratory | Bukan Pipe",
  "Polymer and pipe testing — production QC and customer test services.",
  "Polymer and PE pipe testing unit.",
  "polyethylene pipe testing",
  ["PE pipe testing laboratory", "polymer testing laboratory", "hydrostatic pressure test"],
  [
    {
      type: "paragraph",
      text: "Bukan Pipe's quality-control and polymer laboratory supports production monitoring, pipe and polymer testing, and technical services. For accreditation status, current test scope, or certificate documentation, please contact the laboratory directly.",
    },
    { type: "heading", level: 2, text: "Services" },
    {
      type: "list",
      items: [
        "In-line production quality control",
        "Customer-commissioned pipe and polymer testing",
        "Technical training",
        "Tests executed to applicable national and international methods where specified",
      ],
    },
    {
      type: "paragraph",
      text: "Accreditation scope and certificate copies are available from the laboratory on request.",
    },
    {
      type: "internal-links",
      title: "Factory & production",
      links: [
        { label: "Factory Gallery", path: "/gallery" },
        { label: "About Bukan Pipe", path: "/about" },
        { label: "Quality Control & Laboratory", path: "/quality" },
        { label: "Certifications", path: "/certifications" },
      ],
    },
  ],
);

export const enLaboratoryPages: readonly ContentDocument[] = [
  enLaboratoryHub,
  labPage(
    "services",
    "Laboratory Services",
    "PE Pipe Testing Services | Bukan Pipe Laboratory",
    "Mechanical, thermal and pressure testing for production QC and customer projects.",
    "Pipe and polymer test services.",
    "PE pipe quality testing",
    ["hydrostatic pressure test", "polyethylene pipe testing"],
    [
      {
        type: "paragraph",
        text: "The laboratory provides production QC and externally commissioned testing. Exact test lists, sample requirements and lead times are confirmed with the laboratory unit before scheduling.",
      },
      {
        type: "list",
        items: [
          "Mechanical and thermal property tests",
          "Pressure and performance testing",
          "PE system and joint-related tests where in scope",
        ],
      },
    ],
  ),
  labPage(
    "iso-17025",
    "ISO/IEC 17025",
    "ISO/IEC 17025 Framework | Bukan Pipe Laboratory",
    "ISO 17025 competence framework — accreditation status requires verified certificate.",
    "ISO/IEC 17025 context.",
    "ISO/IEC 17025 laboratory",
    ["ISO 17025 pipe testing", "accredited polymer laboratory"],
    [
      {
        type: "paragraph",
        text: "ISO/IEC 17025 defines requirements for testing laboratory competence. Bukan Pipe does not publish current accreditation status on this website without an up-to-date certificate on file.",
      },
      {
        type: "paragraph",
        text: "For accreditation scope or certificate copies, contact lab@bukanpipe.com.",
      },
    ],
  ),
  labPage(
    "test-scope",
    "Test Scope",
    "HDPE Pipe Test Scope | Bukan Pipe Laboratory",
    "Mechanical, thermal, pressure and dimensional tests — scope confirmed per enquiry.",
    "Laboratory test scope.",
    "HDPE pipe testing laboratory",
    ["PE pipe quality testing", "hydrostatic pressure test"],
    [
      {
        type: "paragraph",
        text: "Test scope covers mechanical, thermal, pressure and dimensional evaluation of pipe and polymer materials. The full published scope list is issued by laboratory management on request.",
      },
      {
        type: "list",
        items: [
          "Hydrostatic / pressure testing",
          "MFR, Vicat, density",
          "OIT, carbon black dispersion",
          "ESCR, impact, ring stiffness",
          "Dimensional and PE system performance",
        ],
      },
    ],
  ),
  labPage(
    "standards",
    "Testing Standards",
    "PE Pipe Testing Standards | Bukan Pipe",
    "INSO and ISO references used in laboratory reporting.",
    "Test method standards.",
    "polyethylene pipe testing standards",
    ["INSO pipe testing", "ISO PE pipe test methods"],
    [
      {
        type: "paragraph",
        text: "Each test is reported against a defined method and reference standard. INSO and ISO are primary references in PE pipe production and testing for qualifying projects.",
      },
    ],
    "candidate",
  ),
  labPage(
    "training",
    "Technical Training",
    "HDPE Pipe Technical Training | Bukan Pipe",
    "Welding and QC training courses — schedule via factory contact.",
    "PE pipe training.",
    "HDPE pipe welding training",
    ["PE fusion training", "pipe QC training"],
    [
      {
        type: "paragraph",
        text: "The training unit runs technical courses related to PE pipe. Syllabus and registration are arranged through factory contact.",
      },
    ],
    "candidate",
  ),
];
