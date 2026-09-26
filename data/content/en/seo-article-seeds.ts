import type { SeoArticleSeed } from "@/lib/content/seo-content-model";
import { seoLandingPaths } from "@/lib/content/seo-content-model";

export const enPe100TechnicalGuideSeed: SeoArticleSeed = {
  slug: "pe100-technical-guide",
  title: "PE100 Technical Guide",
  seoTitle: "PE100 Technical Guide | MRS, SDR, PN & HDPE Pipe Selection | Bukan Pipe",
  seoDescription:
    "Engineering guide to PE100 HDPE pipe: MRS 10 MPa, SDR, PN marking, PE80 vs PE100, temperature derating and project selection.",
  description: "Technical reference for PE100 material grade, pressure design and pipe selection.",
  primaryKeyword: "PE100 technical guide",
  secondaryKeywords: ["PE100 MRS", "HDPE SDR", "PE pipe PN rating", "PE100 vs PE80"],
  definition:
    "PE100 is a polyethylene compound designation with Minimum Required Strength (MRS) of 10 MPa at 20 °C for 50 years — used to size HDPE pressure pipe wall thickness and PN class.",
  sections: [
    {
      type: "paragraph",
      text: "Designers specify PE100 when higher allowable stress enables thinner walls or higher pressure at the same outside diameter (SDR). Bukan Pipe produces PE100 HDPE pipes from 16 mm to 630 mm, pressure rating 2.5 to 25 bar (depending on grade and SDR) for water, gas and industrial networks.",
    },
    { type: "heading", level: 2, text: "MRS and hoop stress" },
    {
      type: "paragraph",
      text: "MRS is the long-term hydrostatic strength of the compound. PE100 (MRS 10 MPa) allows higher design stress than PE80 (MRS 8 MPa), which translates directly into PN class at a given SDR.",
    },
    { type: "heading", level: 2, text: "SDR and PN" },
    {
      type: "paragraph",
      text: "Standard Dimension Ratio (SDR) relates outside diameter to wall thickness. PN marked on water pipe is the nominal pressure at 20 °C reference temperature — not necessarily the field operating pressure.",
    },
    {
      type: "spec-table",
      title: "Key design parameters",
      rows: [
        { label: "PE100 MRS", value: "10 MPa" },
        { label: "PE80 MRS", value: "8 MPa" },
        { label: "PN reference temperature", value: "20 °C for marked PN on supply pipe" },
        { label: "Production range (Bukan Pipe)", value: "Single-wall HDPE, from 16 mm to 630 mm, pressure rating 2.5 to 25 bar (depending on grade and SDR)" },
      ],
      note: "Project-specific diameter, SDR and PN tables are issued on request.",
    },
    { type: "heading", level: 2, text: "PE100 vs PE80 in practice" },
    {
      type: "list",
      items: [
        "Same SDR: PE100 typically allows higher PN or thinner wall",
        "Material grade must match the project specification — not automatic substitution",
        "Temperature derating applies to both grades (MOP = fT × PN)",
      ],
    },
    { type: "heading", level: 2, text: "Standards context" },
    {
      type: "paragraph",
      text: "Qualifying water supply production references INSO 14427-2. Gas projects may reference EN 1555, INSO 11223 and utility documents such as IGS-M-PL-014-1. Always follow the engineer's basis of design.",
    },
  ],
  related: {
    products: ["pe100-pipe", "water-supply-pipe", "gas-pipe", "industrial-pipe"],
    articles: ["polyethylene-pipe-temperature-pressure", "hdpe-installation-guide"],
  },
  references: ["https://bukanpipe.com/about_us/", "https://bukanpipe.com/temp-cooficient/"],
  faqs: [
    {
      question: "Does PE100 eliminate temperature derating?",
      answer: "No. MOP must still include the temperature factor fT at service temperature.",
    },
    {
      question: "Where do I get diameter and weight tables?",
      answer: "Request a project specification sheet from Bukan Pipe sales — tables are issued per diameter, SDR and PN.",
    },
  ],
  curatedLinks: [
    { label: "PE100 HDPE Pipes", path: seoLandingPaths.pe100 },
    { label: "Water HDPE Pipes", path: seoLandingPaths.water },
    { label: "Temperature & MOP", path: seoLandingPaths.temperature },
    { label: "HDPE Pipe Guide", path: seoLandingPaths.pillar },
  ],
};

export const enHdpeInstallationGuideSeed: SeoArticleSeed = {
  slug: "hdpe-installation-guide",
  title: "HDPE Installation Guide",
  seoTitle: "HDPE Installation Guide | Trench, Fusion, Testing & Commissioning | Bukan Pipe",
  seoDescription:
    "Field installation guide for HDPE pipe: trench preparation, bedding, butt fusion and electrofusion, pressure testing and commissioning checklist.",
  description: "Practical installation sequence for PE pipe networks in water, gas and irrigation projects.",
  primaryKeyword: "HDPE installation guide",
  secondaryKeywords: ["PE pipe installation", "HDPE trenching", "PE pipe pressure test", "butt fusion site"],
  definition:
    "HDPE installation covers trenching, bedding, pipe handling, fusion jointing, ancillary equipment (valves, vents) and pressure testing before commissioning a polyethylene pipeline.",
  sections: [
    {
      type: "paragraph",
      text: "Correct installation protects the hydraulic and structural performance designed into HDPE networks. This guide summarises common field steps — the project ITP and engineer's specification always govern.",
    },
    { type: "heading", level: 2, text: "Trench and bedding" },
    {
      type: "list",
      items: [
        "Excavate to line and level per drawing; protect adjacent utilities",
        "Provide stable bedding free of rock and sharp objects",
        "Allow sidefill compaction without point loading on the pipe",
        "Maintain minimum cover per traffic load and frost depth (project-specific)",
      ],
    },
    { type: "heading", level: 2, text: "Handling and storage" },
    {
      type: "list",
      items: [
        "Do not drag pipe on rough ground — use fabric slings or rollers",
        "Store coils and sticks off the ground; protect fusion ends with caps",
        "Limit UV exposure duration for above-ground staging unless specified",
      ],
    },
    { type: "heading", level: 2, text: "Fusion jointing" },
    {
      type: "paragraph",
      text: "Butt fusion is common on water and irrigation mains. Electrofusion is the approved method for gas distribution in Iran. Qualified personnel, calibrated equipment and parameter records are mandatory.",
    },
    {
      type: "spec-table",
      title: "Jointing methods by service",
      rows: [
        { label: "Water / irrigation mains", value: "Butt fusion (typical); electrofusion for repairs and fittings" },
        { label: "Gas distribution (Iran)", value: "Electrofusion — approved utility method" },
        { label: "Quality records", value: "Welder qualification, PQR, fusion log and visual bead inspection" },
      ],
    },
    { type: "heading", level: 2, text: "Ancillary equipment" },
    {
      type: "paragraph",
      text: "Air release valves at high points, check valves on descending profiles and thrust restraint at bends reduce vacuum collapse and transient events — especially on PE100 thin-wall segments.",
    },
    { type: "heading", level: 2, text: "Testing and commissioning" },
    {
      type: "list",
      items: [
        "Hydrostatic pressure test per project specification before backfill where required",
        "Hold test duration and acceptance criteria per engineer / utility",
        "Flush and disinfect potable lines per local health requirements",
        "As-built survey and fusion record handover",
      ],
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe"],
    articles: ["polyethylene-pipe-welding", "air-vent-valve"],
    laboratory: ["test-scope"],
  },
  references: ["https://bukanpipe.com/welding/"],
  faqs: [
    {
      question: "Can HDPE be backfilled before pressure test?",
      answer: "Follow the project ITP. Many specifications require testing before full backfill on critical segments.",
    },
    {
      question: "Who can perform gas electrofusion?",
      answer: "Only qualified welders with approved procedures and utility acceptance — gas networks are regulated.",
    },
  ],
  curatedLinks: [
    { label: "HDPE pipe welding guide", path: seoLandingPaths.welding },
    { label: "Water HDPE Pipes", path: seoLandingPaths.water },
    { label: "Gas HDPE Pipes", path: seoLandingPaths.gas },
    { label: "Air release valves", path: "/technical-center/air-vent-valve" },
  ],
};
