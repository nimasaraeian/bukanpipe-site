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
    { type: "heading", level: 2, text: "What the inputs mean" },
    {
      type: "list",
      items: [
        "Flow rate — the volume to be moved per unit time",
        "Route length — the real pipe length, not the straight-line distance on a map",
        "Elevation difference — the lift the pump has to overcome",
        "SDR and PN — the pipe class, which sets wall thickness and therefore the bore",
      ],
    },
    { type: "heading", level: 2, text: "What the calculation rests on" },
    {
      type: "paragraph",
      text: "Friction head loss uses Hazen-Williams with a roughness coefficient C of 145 for polyethylene — the smooth bore of PE is what justifies a value that high. Total head is the elevation difference plus friction loss, and motor power follows from total head and flow rate with a reserve percentage applied.",
    },
    { type: "heading", level: 2, text: "Why velocity is the constraint" },
    {
      type: "paragraph",
      text: "The tool computes velocity for each candidate diameter and flags anything outside roughly 0.5 to 2.5 m/s. Below 0.5 there is a risk of suspended solids settling out. Above 2.5, head loss climbs quickly, pumping energy gets expensive and surge on rapid valve closure becomes a more serious concern. The recommended diameter is the smallest one that keeps velocity inside that band.",
    },
    { type: "heading", level: 2, text: "What it does not calculate" },
    {
      type: "list",
      items: [
        "The real elevation profile and any high points along the route",
        "The pump curve and its actual duty point",
        "Surge and transient pressure",
        "Local losses at fittings, valves and bends",
        "Temperature derating above the 20 °C reference",
      ],
    },
    { type: "heading", level: 2, text: "From result to order" },
    {
      type: "paragraph",
      text: "The output is an effective internal diameter and a pipe class. To enquire, take the outer diameter and SDR from the catalogue dimensions chart and quote those. If the operating temperature is above 20 °C, apply the derating factor before fixing the SDR.",
    },
    {
      type: "internal-links",
      title: "Next steps",
      links: [
        {
          label: "HDPE pipe dimensions chart",
          path: "/technical-center/hdpe-pipe-dimensions-chart",
          hint: "Catalogue outer diameter and wall thickness",
        },
        {
          label: "Temperature derating",
          path: "/technical-center/polyethylene-pipe-temperature-pressure",
        },
        { label: "Water supply pipe", path: "/products/water-supply-pipe" },
        { label: "Request a quote", path: "/request-quote" },
      ],
    },
  ],
  faqs: [
    {
      question: "Which formula is used for HDPE pipe head loss?",
      answer:
        "Hazen-Williams with a roughness coefficient C of 145 for polyethylene. For tighter work, or for fluids other than water, Darcy-Weisbach with a computed friction factor is the better basis.",
    },
    {
      question: "Why are several diameters offered for one flow rate?",
      answer:
        "Because diameter selection is a trade. A larger bore cuts head loss and pumping energy but costs more in pipe. The tool shows every option with its velocity and loss so the trade is visible.",
    },
    {
      question: "Is the calculated pump power the motor I should buy?",
      answer:
        "No. It is an estimate from total head and flow with a reserve applied. Final motor selection has to come from the pump curve, the real efficiency at the duty point and the starting conditions.",
    },
    {
      question: "Does it check for surge?",
      answer:
        "No. Surge needs a separate calculation and depends on valve closure speed, line length and flow velocity. On long lines or at higher velocities, check it separately.",
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
  seoDescription:
    "Online HDPE pipe calculator — estimate diameter, flow velocity, head loss and pump power for a water transfer line, using Hazen-Williams.",
  description: "Engineering tools for preliminary pipeline design.",
  primaryKeyword: "HDPE pipe calculator",
  secondaryKeywords: [
    "PE pipe head loss calculator",
    "pipe diameter calculator online",
    "pump power calculator",
  ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Calculator", path: "/calculator" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "These tools exist so that a diameter and pump range is in hand before the technical department is contacted, and the enquiry can be made against real numbers rather than a guess.",
    },
    { type: "heading", level: 2, text: "Pipeline design calculator" },
    {
      type: "paragraph",
      text: "It takes flow rate, route length, elevation difference and SDR, and returns flow velocity, friction head loss, total head and approximate motor power for each candidate diameter. It recommends the diameter that keeps velocity inside an acceptable engineering band.",
    },
    {
      type: "internal-links",
      title: "Tools",
      links: [
        {
          label: "Pipeline design calculator",
          path: "/calculator/pipeline-design",
          hint: "Diameter, velocity, head loss and pump power",
        },
      ],
    },
    { type: "heading", level: 2, text: "What to do with the diameter" },
    {
      type: "paragraph",
      text: "The tool works in effective internal diameter. To order, you need the outer diameter and SDR — the wall thickness follows from SDR and sets the bore. The full catalogue chart of diameter, wall thickness and SDR is published in the technical centre.",
    },
    {
      type: "internal-links",
      title: "Next steps",
      links: [
        {
          label: "HDPE pipe dimensions chart",
          path: "/technical-center/hdpe-pipe-dimensions-chart",
          hint: "Catalogue outer diameter and wall thickness",
        },
        {
          label: "Temperature derating",
          path: "/technical-center/polyethylene-pipe-temperature-pressure",
        },
        { label: "Request a quote", path: "/request-quote" },
      ],
    },
  ],
  faqs: [
    {
      question: "How do I calculate HDPE pipe diameter?",
      answer:
        "Start from the required flow rate and route length. The pipeline design calculator computes velocity and head loss for each candidate diameter and recommends one that keeps velocity in range. Then take the matching outer diameter and SDR from the dimensions chart.",
    },
    {
      question: "What flow velocity is acceptable in a pipe?",
      answer:
        "This tool treats roughly 0.5 to 2.5 m/s as acceptable. Too slow risks settlement of suspended solids; too fast drives up head loss, pumping energy and surge risk. The final band is set by the project specification.",
    },
    {
      question: "Can I order from this result?",
      answer:
        "No. It is a preliminary estimate. The final calculation needs the actual elevation profile, the pump curve, operating conditions and a surge check.",
    },
  ],
  related: {
    articles: ["polyethylene-pipe-temperature-pressure", "pe100-technical-guide"],
  },
};
