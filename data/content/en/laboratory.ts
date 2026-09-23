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
  faqs?: ContentDocument["faqs"],
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
    faqs,
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
  "Polyethylene pipe testing at Bukan Pipe — an independent QC and polymer laboratory holding ISO/IEC 17025, serving production and external customers.",
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
    "PE pipe quality testing at Bukan Pipe — mechanical, thermal and pressure tests for production QC and for customer samples, with a test report.",
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
    "The HDPE pipe testing laboratory scope at Bukan Pipe — mechanical, thermal, pressure and dimensional tests available on pipe, fittings and raw material.",
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
    "Polyethylene pipe testing standards — the INSO and ISO references the Bukan Pipe laboratory works to in test method and reporting.",
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
    "HDPE pipe welding training — butt fusion, electrofusion and quality control courses at the Bukan Pipe laboratory; arranged through the factory.",
    "PE pipe training.",
    "HDPE pipe welding training",
    ["PE fusion training", "pipe QC training"],
    [
      {
        type: "paragraph",
        text: "The Bukan Pipe training unit holds an inter-workshop training centre licence, number 14/11221, from the Technical and Vocational Training Organization (Ministry of Cooperatives, Labour and Social Welfare). It was issued on 1404/07/23 in the Iranian calendar and runs for five years. Its legal basis is Note 2 of Article 110 of the Labour Law and the regulations governing adjacent-workshop and inter-workshop training centres.",
      },
      { type: "heading", level: 2, text: "What an inter-workshop centre means" },
      {
        type: "paragraph",
        text: "An adjacent-workshop centre trains the staff of its own factory. An inter-workshop licence permits training for employees of other industrial units in the province as well. The practical difference is that another contractor or employer can send their own people here.",
      },
      { type: "heading", level: 2, text: "Why welding training is taken seriously in polyethylene" },
      {
        type: "paragraph",
        text: "On a PE line the joint is where failure starts, and a defective weld usually looks sound. The commonest cause is releasing the clamp before the cooling time has elapsed — the joint appears correct but fusion is incomplete. This is why, in gas networks, welder qualification and a weld record are part of the requirements for handing over the line rather than a formality.",
      },
      { type: "heading", level: 2, text: "Related subject matter" },
      {
        type: "list",
        items: [
          "Butt fusion: parameters, surface preparation, alignment and cooling time",
          "Electrofusion: scraping the oxide layer, seating the fitting and keeping the assembly undisturbed",
          "Visual inspection of joints and recognition of common defects",
          "Pipe quality control: dimensional inspection and laboratory testing",
          "Safety around fusion equipment and in the trench",
        ],
      },
      {
        type: "paragraph",
        text: "Syllabus, course length and enrolment terms depend on the group and are arranged through factory contact.",
      },
      {
        type: "internal-links",
        title: "Related",
        links: [
          { label: "HDPE pipe welding", path: "/technical-center/polyethylene-pipe-welding" },
          { label: "HDPE installation guide", path: "/technical-center/hdpe-installation-guide" },
          { label: "Certifications and licences", path: "/certifications" },
          { label: "Contact the factory", path: "/contact" },
        ],
      },
    ],
    "candidate",
    [
      {
        question: "Is Bukan Pipe's training licensed?",
        answer:
          "Yes. The training unit holds inter-workshop training centre licence 14/11221 from the Technical and Vocational Training Organization, issued on 1404/07/23 with a five-year validity.",
      },
      {
        question: "Can staff from other companies attend?",
        answer:
          "Yes. The licence is of the inter-workshop type, which permits training for employees of other industrial units in the province, not only the factory's own staff.",
      },
      {
        question: "What does a polyethylene welding course cover?",
        answer:
          "Butt fusion and electrofusion, surface preparation and cooling time, visual inspection of joints and recognition of common defects, pipe quality control, and safety. Exact syllabus and course length depend on the group.",
      },
    ],
  ),
];
