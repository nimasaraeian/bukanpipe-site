import type { ContentDocument } from "@/content/models/content-document";
import type { DownloadItem } from "@/data/content/fa/downloads";

export const enDownloadsPublic: readonly DownloadItem[] = [];

export const enDownloadsInternalQueue: readonly DownloadItem[] = [
  {
    id: "catalogue-en",
    title: "Company catalogue",
    description: "Product catalogue — published after design approval.",
    category: "company-catalogue",
    fileType: "PDF",
    verificationStatus: "verify-before-production",
  },
  {
    id: "water-ins-14427-en",
    title: "INSO 14427 — Water supply pipe",
    description: "Water supply standard reference.",
    category: "water-standards",
    verificationStatus: "missing-source",
  },
  {
    id: "gas-ins-11233-en",
    title: "INSO 11233 — Gas pipe",
    description: "Gas pipe standard reference.",
    category: "gas-standards",
    verificationStatus: "missing-source",
  },
  {
    id: "irrigation-ins-13477-en",
    title: "INSO 13477 — Irrigation",
    description: "Irrigation standard reference.",
    category: "irrigation-standards",
    verificationStatus: "missing-source",
  },
  {
    id: "welding-guide-en",
    title: "PE welding guide",
    description: "Technical PDF aligned with welding article.",
    category: "technical-publications",
    verificationStatus: "missing-source",
  },
  {
    id: "lab-scope-pdf-en",
    title: "Laboratory test scope",
    description: "Test scope PDF.",
    category: "laboratory-resources",
    verificationStatus: "verify-before-production",
  },
];

export const enDownloadsHub: ContentDocument = {
  id: "downloads-hub",
  slug: "downloads",
  path: "/downloads",
  locale: "en",
  kind: "hub",
  title: "Downloads",
  seoTitle: "HDPE Pipe Catalogues & Standards Downloads | Bukan Pipe",
  seoDescription:
    "Catalogues, standards and technical PDFs — files published after preparation and rights clearance.",
  description: "Downloadable resources.",
  primaryKeyword: "HDPE pipe catalogue download",
  secondaryKeywords: ["PE pipe technical documents", "polyethylene pipe standards PDF"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Downloads", path: "/downloads" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "Catalogue and standard PDFs will be listed here when available. Until then, contact sales for specifications and catalogue requests.",
    },
  ],
  related: { products: ["water-supply-pipe", "gas-pipe"] },
};

export const enCalculatorHub: ContentDocument = {
  id: "calculator-pipeline-design",
  slug: "pipeline-design",
  path: "/calculator/pipeline-design",
  locale: "en",
  kind: "calculator",
  title: "Pipeline Design Calculator",
  seoTitle: "HDPE Pipeline Design Calculator | Water Transfer Pre-Design",
  seoDescription:
    "Preliminary diameter, velocity, head loss and pump power estimates for water transfer lines.",
  description: "Pre-design tool for water transfer networks.",
  primaryKeyword: "HDPE pipe pressure loss",
  secondaryKeywords: ["pipeline design calculator", "PE pipe diameter calculation"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/pipeline_design/"],
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Calculator", path: "/calculator" },
    { label: "Pipeline design", path: "/calculator/pipeline-design" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "This tool supports preliminary design of water transfer lines from source to destination. Results do not replace engineering calculation with actual elevation profile and pump curves.",
    },
  ],
};

export const enCalculatorIndex: ContentDocument = {
  id: "calculator-hub",
  slug: "calculator",
  path: "/calculator",
  locale: "en",
  kind: "hub",
  title: "Engineering Calculators",
  seoTitle: "HDPE Pipe Engineering Calculators | Bukan Pipe",
  seoDescription: "Tools for preliminary diameter, head loss and pump sizing estimates.",
  description: "Engineering calculation tools.",
  primaryKeyword: "HDPE pipe calculator",
  secondaryKeywords: ["PE pipe head loss calculator"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Calculator", path: "/calculator" },
  ],
  sections: [],
  related: { articles: ["polyethylene-pipe-temperature-pressure"] },
};
