import type { ContentDocument } from "@/content/models/content-document";
import { buildSeoArticleDocument } from "@/lib/content/seo-content-model";
import { enGasPillarArticle } from "@/data/content/en/pillar-gas-article";
import { enHdpePillarArticle } from "@/data/content/en/pillar-hdpe-article";
import { enWaterPillarArticle } from "@/data/content/en/pillar-water-article";
import {
  enHdpeInstallationGuideSeed,
  enPe100TechnicalGuideSeed,
} from "@/data/content/en/seo-article-seeds";

function article(
  slug: string,
  title: string,
  seoTitle: string,
  seoDescription: string,
  description: string,
  primaryKeyword: string,
  secondaryKeywords: readonly string[],
  sections: ContentDocument["sections"],
  related: ContentDocument["related"],
  references?: readonly string[],
  faqs?: ContentDocument["faqs"],
): ContentDocument {
  return {
    id: `article-${slug}`,
    slug,
    path: `/technical-center/${slug}`,
    locale: "en",
    kind: "article",
    title,
    seoTitle,
    seoDescription,
    description,
    primaryKeyword,
    secondaryKeywords,
    status: "published",
    evidenceStatus: "candidate",
    verificationStatus: "legacy-claim",
    lastReviewed: "2026-09-03",
    references,
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Technical Center", path: "/technical-center" },
      { label: title, path: `/technical-center/${slug}` },
    ],
    sections,
    related,
    faqs,
  };
}

export const enTechnicalHub: ContentDocument = {
  id: "technical-center-hub",
  slug: "technical-center",
  path: "/technical-center",
  locale: "en",
  kind: "hub",
  title: "Technical Center",
  seoTitle: "HDPE Pipe Technical Resources | Bukan Pipe",
  seoDescription:
    "Engineering guides on PE welding, pressure/temperature, air valves and irrigation for designers and contractors.",
  description: "Technical resources for PE network design and installation.",
  primaryKeyword: "HDPE pipe technical guide",
  secondaryKeywords: ["PE pipe welding", "HDPE pipe pressure rating", "PE100 pipe design"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Technical Center", path: "/technical-center" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "Articles in this section support engineering, installation and maintenance decisions for PE pipe networks. For product selection and quotes, see the Products section.",
    },
    {
      type: "internal-links",
      title: "High-demand guides",
      links: [
        {
          label: "Complete polyethylene pipe selection guide",
          path: "/technical-center/polyethylene-pipe-complete-guide",
        },
        {
          label: "Water supply polyethylene pipe guide",
          path: "/technical-center/water-supply-polyethylene-pipe-guide",
        },
        {
          label: "Gas polyethylene pipe standards and production",
          path: "/technical-center/gas-polyethylene-pipe-guide",
        },
        { label: "PE100 technical guide", path: "/technical-center/pe100-technical-guide" },
        { label: "HDPE installation guide", path: "/technical-center/hdpe-installation-guide" },
        { label: "HDPE pipe welding", path: "/technical-center/polyethylene-pipe-welding" },
        {
          label: "Temperature and pressure derating",
          path: "/technical-center/polyethylene-pipe-temperature-pressure",
        },
        { label: "HDPE pipe overview (pillar)", path: "/polyethylene-pipe" },
        { label: "Request a quote", path: "/request-quote" },
      ],
    },
  ],
  related: {
    articles: [
      "polyethylene-pipe-complete-guide",
      "water-supply-polyethylene-pipe-guide",
      "gas-polyethylene-pipe-guide",
      "pe100-technical-guide",
      "hdpe-installation-guide",
      "polyethylene-pipe-welding",
      "polyethylene-pipe-temperature-pressure",
    ],
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe"],
  },
};

export const enPillarPolyethylene: ContentDocument = {
  id: "pillar-polyethylene-pipe",
  slug: "polyethylene-pipe",
  path: "/polyethylene-pipe",
  locale: "en",
  kind: "pillar",
  title: "HDPE Pipe Guide",
  seoTitle:
    "HDPE Pipe Guide: PE100, SDR, Pressure Ratings, Applications and Selection | Bukan Pipe",
  seoDescription:
    "Independent guide to HDPE / PE pipe: PE100, SDR, PN, water, gas, irrigation, sewerage, fusion and selection — links to Bukan Pipe products.",
  description: "Guide for engineers, contractors and procurement teams.",
  primaryKeyword: "HDPE pipe",
  secondaryKeywords: [
    "polyethylene pipe",
    "PE100 pipe",
    "HDPE pipe SDR",
    "PE pipe pressure rating",
    "polyethylene piping systems",
  ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/about_us/"],
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "HDPE Pipe Guide", path: "/polyethylene-pipe" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "High-density polyethylene (HDPE) pipe is widely used in water supply, gas distribution, irrigation, sewerage, drainage and industrial networks. Bukan Pipe has manufactured single-wall PE pipe since 1997, up to 630 mm outside diameter.",
    },
    { type: "heading", level: 2, text: "PE and HDPE terminology" },
    {
      type: "paragraph",
      text: "Polyethylene (PE) is the polymer family; HDPE denotes high density grade used for pressure pipe. In procurement documents you may see PE, HDPE, PE80 or PE100 — the grade affects pressure design at a given SDR.",
    },
    { type: "heading", level: 2, text: "Application overview" },
    {
      type: "list",
      items: [
        "Water supply — INSO 14427-2 for qualifying Bukan Pipe production",
        "Gas distribution branches — EN 1555, INSO 11233, IGS-M-PL-014-1 where applicable",
        "Pressurised irrigation and agricultural mains",
        "Sewerage and surface drainage",
        "Cable protection and industrial transfer where specified",
      ],
    },
    { type: "heading", level: 2, text: "PE80 and PE100" },
    {
      type: "paragraph",
      text: "Material grade (PE80, PE100) sets MRS and wall thickness for a given pressure. PE100 allows thinner walls or higher pressure at the same SDR. See the PE100 product page for specifications and supply options for that grade.",
    },
    { type: "heading", level: 2, text: "SDR and PN / pressure rating" },
    {
      type: "paragraph",
      text: "SDR is the ratio of outside diameter to wall thickness. PN is the nominal pressure marked on pipe at 20 °C reference temperature. At higher fluid or ambient temperatures, apply derating to obtain maximum operating pressure (MOP).",
    },
    { type: "heading", level: 2, text: "Connection methods" },
    {
      type: "paragraph",
      text: "Butt fusion is common in water supply; electrofusion is the approved method for gas distribution in Iran. Joint quality depends on operator qualification, equipment parameters and inspection.",
    },
    { type: "heading", level: 2, text: "Selection checklist" },
    {
      type: "list",
      items: [
        "Application and fluid (water, gas, wastewater, drainage)",
        "Design pressure and operating temperature",
        "Project standard and engineer approval",
        "Jointing method and ancillaries (air valves, check valves)",
      ],
    },
    {
      type: "spec-cta",
      text: "Contact sales or request a quote for diameter, SDR, PN and weight-per-metre tables for your project.",
    },
  ],
  related: {
    products: [
      "water-supply-pipe",
      "gas-pipe",
      "irrigation-pipe",
      "sewage-pipe",
      "drainage-pipe",
      "pe100-pipe",
    ],
    applications: [
      "water-transfer",
      "gas-distribution",
      "agriculture-irrigation",
      "sewage",
      "drainage",
    ],
    articles: [
      "polyethylene-pipe-welding",
      "polyethylene-pipe-temperature-pressure",
      "air-vent-valve",
    ],
  },
  faqs: [
    {
      question: "How is HDPE pipe priced?",
      answer:
        "Price depends on diameter, SDR, PN, quantity and delivery terms. Request a current quote from sales.",
    },
    {
      question: "What is the difference between water and gas PE pipe?",
      answer:
        "Each application has distinct standards, pressure class and jointing requirements. See the relevant product pages for pipe specifications.",
    },
  ],
};

export const enTechnicalArticles: readonly ContentDocument[] = [
  buildSeoArticleDocument("en", enHdpePillarArticle),
  buildSeoArticleDocument("en", enWaterPillarArticle),
  buildSeoArticleDocument("en", enGasPillarArticle),
  enTechnicalHub,
  enPillarPolyethylene,
  article(
    "polyethylene-pipe-welding",
    "HDPE Pipe Welding: Butt Fusion and Electrofusion",
    "HDPE Pipe Welding | Butt Fusion & Electrofusion Guide",
    "Engineering guide to butt fusion and electrofusion for PE pipe — INSO 18648 context.",
    "Standard PE pipe jointing methods.",
    "HDPE pipe welding",
    ["butt fusion", "electrofusion", "PE pipe fusion"],
    [
      {
        type: "paragraph",
        text: "In PE pipeline construction, joint quality determines network durability. Proper fusion minimises leakage, controls pressure loss and avoids flow disturbance at joints.",
      },
      { type: "heading", level: 2, text: "Electrofusion" },
      {
        type: "paragraph",
        text: "In electrofusion, pipe ends are inserted into a socket fitting with embedded heating coils. Current melts the interface; after cooling a monolithic joint forms. This method is approved for gas distribution in Iran and offers high joint factor when parameters and inspection are correct.",
      },
      { type: "heading", level: 2, text: "Butt fusion" },
      {
        type: "paragraph",
        text: "Per INSO 18648, prepared pipe ends are heated on a facing plate to specified temperature and joined under controlled force. Steps include cleaning, clamping, facing, alignment, heating, joining and controlled cooling under pressure.",
      },
      { type: "heading", level: 2, text: "Quality control" },
      {
        type: "list",
        items: [
          "Qualified welders and approved procedure (PQR) before production welding",
          "Parameter logging and visual bead inspection",
          "Non-destructive testing on sensitive projects where specified",
        ],
      },
    ],
    { products: ["water-supply-pipe", "gas-pipe"], laboratory: ["test-scope"] },
    ["https://bukanpipe.com/welding/"],
    [
      {
        question: "Which welding method is used for municipal gas?",
        answer: "Electrofusion is the approved method for gas in Iran. Butt fusion is more common in water supply.",
      },
    ],
  ),
  article(
    "air-vent-valve",
    "Air Release Valves in PE Water Pipelines",
    "Air Release Valves in HDPE Water Pipes | Pipeline Design",
    "Role of air vents in preventing vacuum, flow reduction and pipe collapse on PE lines.",
    "Air valve design for PE water transfer.",
    "air release valve pipeline",
    ["HDPE pipe vacuum", "water hammer PE pipe", "air vent valve"],
    [
      {
        type: "paragraph",
        text: "In water transfer lines, trapped air at high points or vacuum during draining can impair network performance. Air release and check valves are essential design elements — not optional accessories.",
      },
      { type: "heading", level: 2, text: "Vacuum and pipe collapse" },
      {
        type: "paragraph",
        text: "On descending profiles, rapid pump shutdown without a check valve can create negative pressure and inward deflection of the pipe wall. With PE100 and thinner walls, air/vacuum protection becomes more critical.",
      },
      { type: "heading", level: 2, text: "Flow reduction and water hammer" },
      {
        type: "paragraph",
        text: "Air pockets at line peaks reduce effective flow area, cut delivered flow and can contribute to transient pressure events.",
      },
      { type: "heading", level: 2, text: "Installation practice" },
      {
        type: "list",
        items: [
          "Mount air valves vertically at high points",
          "Typical spacing near 600 m on long horizontal runs (project-specific)",
          "Inspect and service valves periodically (e.g. every six months)",
        ],
      },
    ],
    { applications: ["water-transfer"], products: ["water-supply-pipe", "pe100-pipe"] },
    ["https://bukanpipe.com/air-vent-valve/"],
  ),
  article(
    "polyethylene-pipe-temperature-pressure",
    "Temperature Effects on PE Pipe Working Pressure",
    "HDPE Pipe Temperature Derating & MOP | PE Pressure Rating",
    "Temperature factor fT and MOP calculation — INSO 14427 and INSO 14563-1 context.",
    "Operating temperature and allowable pressure.",
    "HDPE pipe temperature derating",
    ["PE pipe pressure rating", "MOP", "PN derating"],
    [
      {
        type: "paragraph",
        text: "PN marked on water supply pipe is defined at 20 °C. At higher temperatures, maximum operating pressure (MOP) must include a temperature factor fT: MOP = fT × PN.",
      },
      { type: "heading", level: 2, text: "Practical example" },
      {
        type: "paragraph",
        text: "If direct solar exposure raises pipe temperature to 40 °C, allowable pressure on PN10 pipe may be approximately 7.4 bar — operating at 10 bar risks damage.",
      },
      { type: "heading", level: 2, text: "Responsible design" },
      {
        type: "paragraph",
        text: "The design engineer must account for line temperature, fT and service factors. For preliminary diameter and pump estimates, use the pipeline design calculator — not as a substitute for full hydraulic design.",
      },
    ],
    {
      products: ["pe100-pipe", "water-supply-pipe"],
      articles: ["polyethylene-pipe-welding"],
    },
    ["https://bukanpipe.com/temp-cooficient/"],
    [
      {
        question: "Does buried pipe need temperature derating?",
        answer:
          "Soil temperature is usually more stable than above-ground exposure, but the engineer must assess actual project conditions.",
      },
    ],
  ),
  article(
    "subsurface-drip-irrigation",
    "Subsurface Drip Irrigation Systems",
    "Subsurface Drip Irrigation with HDPE Pipe | Farm Water Networks",
    "Role of PE mains in subsurface irrigation and water-efficiency context.",
    "PE feeder mains for subsurface irrigation.",
    "subsurface drip irrigation",
    ["HDPE irrigation pipe", "agricultural PE pipe"],
    [
      {
        type: "paragraph",
        text: "Subsurface drip irrigation reduces surface evaporation and can improve water use efficiency. HDPE pipe typically forms pressurised feeder mains between the water source and the subsurface emitter network.",
      },
      { type: "heading", level: 2, text: "Network design" },
      {
        type: "list",
        items: [
          "Diameter and pressure matched to field area and crop",
          "Filtration and control valves upstream of emitters",
          "Coordination with crop-specific subsurface tubing products",
        ],
      },
    ],
    { applications: ["agriculture-irrigation"], products: ["irrigation-pipe"] },
    ["https://bukanpipe.com/"],
  ),
  buildSeoArticleDocument("en", enPe100TechnicalGuideSeed),
  buildSeoArticleDocument("en", enHdpeInstallationGuideSeed),
];
