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
    "HDPE pipe technical guides for designers and contractors — welding, pressure and temperature derating, air valves, dimensions and irrigation.",
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
      text: "This section is for engineering decisions: material grade and pressure class, the standard governing each application, jointing method, and network installation. If you are here to get a price, the products page is the shorter route.",
    },
    { type: "heading", level: 2, text: "Where to start" },
    {
      type: "paragraph",
      text: "Most enquiries that reach us are one of four cases. Pick your route:",
    },
    {
      type: "list",
      items: [
        "New to polyethylene: start with the pipe overview, then PE100",
        "You know what you want and need a number: go straight to the dimensions chart",
        "You are designing a line: estimate diameter with the calculator, then fix the class with the temperature and pressure guide",
        "You are building: read the installation guide, the welding guide and the air valve article",
      ],
    },
    { type: "heading", level: 2, text: "Three mistakes that cost the most" },
    {
      type: "list",
      items: [
        "Ordering on diameter alone, without SDR and material grade — one diameter covers several quite different products",
        "Selecting pressure class from ordinary working pressure instead of maximum pressure plus a surge allowance",
        "Ignoring the line's real temperature — the PN marked on the pipe applies at 20 °C",
      ],
    },
    {
      type: "internal-links",
      title: "High-demand guides",
      links: [
        {
          label: "HDPE pipe dimensions chart",
          path: "/technical-center/hdpe-pipe-dimensions-chart",
          hint: "Full catalogue chart for water supply, gas and drip irrigation",
        },
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
        {
          label: "Air valves in a water transmission line",
          path: "/technical-center/air-vent-valve",
          hint: "Preventing pipe collapse and flow loss",
        },
        {
          label: "Subsurface drip irrigation",
          path: "/technical-center/subsurface-drip-irrigation",
        },
        {
          label: "Pipeline design calculator",
          path: "/calculator/pipeline-design",
          hint: "Diameter, velocity, head loss and pump power",
        },
        { label: "HDPE pipe overview (pillar)", path: "/polyethylene-pipe" },
        { label: "Request a quote", path: "/request-quote" },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between SDR and PN?",
      answer:
        "SDR is the ratio of outside diameter to wall thickness — a geometric number. PN is the working pressure corresponding to that SDR for a given material grade at 20 °C. Because PN shifts when the grade changes, quote both in an order.",
    },
    {
      question: "Where do I start when designing a line?",
      answer:
        "From design flow and the route profile. Estimate diameter from flow and permissible velocity, then fix pressure class from maximum static head plus a surge allowance, with the temperature derating applied. Finally take the matching outside diameter and SDR from the dimensions chart.",
    },
    {
      question: "Which standard governs my project?",
      answer:
        "The application decides, not the pipe. Potable water, gas and irrigation each have their own national standard, and for water and gas compliance is mandatory. The water supply and gas guides cover that split.",
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
      type: "internal-links",
      title: "Dimension reference",
      links: [
        {
          label: "HDPE pipe dimensions chart",
          path: "/technical-center/hdpe-pipe-dimensions-chart",
          hint: "Full catalogue chart for water supply, gas and drip irrigation",
        },
        { label: "Pipeline design calculator", path: "/calculator/pipeline-design" },
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

/**
 * Catalogue dimension tables. Every number is rendered from
 * bukanpipe-dimension-tables.json, transcribed from the factory catalogue —
 * nothing on this page is computed or estimated.
 */
export const enPipeDimensionsChart: ContentDocument = {
  id: "article-hdpe-pipe-dimensions-chart",
  slug: "hdpe-pipe-dimensions-chart",
  path: "/technical-center/hdpe-pipe-dimensions-chart",
  locale: "en",
  kind: "article",
  title: "HDPE Pipe Dimensions Chart",
  seoTitle: "HDPE Pipe Dimensions Chart (PE100/PE80, 16–630 mm) | Bukan Pipe",
  seoDescription:
    "Full HDPE pipe dimensions chart: outer diameter, wall thickness and SDR for water supply, gas and drip irrigation pipe, 16–630 mm, from the Bukan Pipe catalogue.",
  description:
    "Catalogue dimension charts for Bukan Pipe water supply, gas and drip irrigation pipe.",
  primaryKeyword: "HDPE pipe dimensions chart",
  secondaryKeywords: [
    "PE100 pipe dimensions",
    "HDPE pipe wall thickness chart",
    "SDR pipe chart",
    "polyethylene pipe size chart",
  ],
  status: "published",
  evidenceStatus: "verified",
  verificationStatus: "verified",
  lastReviewed: "2026-09-22",
  references: ["Bukan Pipe Polyethylene Company catalogue"],
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Technical centre", path: "/technical-center" },
    {
      label: "HDPE pipe dimensions chart",
      path: "/technical-center/hdpe-pipe-dimensions-chart",
    },
  ],
  sections: [
    {
      type: "paragraph",
      text: "This page publishes the Bukan Pipe catalogue dimension tables as they stand: outer diameter, wall thickness and SDR for water supply, gas and drip irrigation pipe. No figure is calculated or rounded, and a dash means that diameter is not produced in that SDR.",
    },
    { type: "heading", level: 2, text: "How SDR, PN and wall thickness relate" },
    {
      type: "paragraph",
      text: "SDR is the ratio of outer diameter to wall thickness: SDR = DN ÷ en. The smaller the SDR, the thicker the wall relative to the diameter, and the more pressure the pipe carries. That is why SDR 6 is the thickest wall and the highest PN in the water table, and SDR 51 the thinnest.",
    },
    {
      type: "paragraph",
      text: "PN is the nominal pressure in bar at the 20 °C reference temperature. For a given SDR the material grade also moves the rating: PE100 has the higher long-term strength, so at the same SDR it rates one PN step above PE80. The water table shows this directly — SDR 11 is PN 12.5 in PE80 and PN 16 in PE100.",
    },
    {
      type: "paragraph",
      text: "Above 20 °C the allowable pressure is corrected by a temperature derating factor. Choose the SDR from the design pressure, operating temperature and installation conditions — not from the chart alone.",
    },
    { type: "heading", level: 2, text: "Water supply pipe" },
    { type: "dimension-table", table: "water-supply" },
    { type: "heading", level: 2, text: "Gas supply pipe" },
    {
      type: "paragraph",
      text: "Gas pipe is produced in SDR 11 up to DN 90 and in SDR 13.6 from DN 63 upwards; a dash in the table means that size is not made in that SDR. The tabulated wall thickness is a minimum and the bracketed figure is the plus tolerance.",
    },
    { type: "dimension-table", table: "gas-supply" },
    { type: "heading", level: 2, text: "Drip irrigation pipe" },
    { type: "dimension-table", table: "drip-irrigation" },
    {
      type: "internal-links",
      title: "Next steps",
      links: [
        {
          label: "Pipeline design calculator",
          path: "/calculator/pipeline-design",
          hint: "Size the diameter and head loss from flow and route length",
        },
        {
          label: "PE100 technical guide",
          path: "/technical-center/pe100-technical-guide",
          hint: "MRS, SDR and grade selection",
        },
        { label: "Water supply pipe", path: "/products/water-supply-pipe" },
        { label: "Gas supply pipe", path: "/products/gas-pipe" },
      ],
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "pe100-pipe", "irrigation-pipe"],
    articles: ["pe100-technical-guide"],
  },
  faqs: [
    {
      question: "What does SDR mean on a polyethylene pipe?",
      answer:
        "SDR is the standard dimension ratio — the outer diameter divided by the wall thickness (SDR = DN ÷ en). A lower SDR means a thicker wall and a higher pressure rating.",
    },
    {
      question: "What is the difference between PE80 and PE100 in the chart?",
      answer:
        "At a given SDR the wall thickness is the same for both grades, but the pressure rating differs. PE100 has the higher long-term strength, so it rates one PN step above PE80 — SDR 11 is PN 12.5 in PE80 and PN 16 in PE100.",
    },
    {
      question: "Which diameters does Bukan Pipe produce?",
      answer:
        "The water supply chart covers 16 to 630 mm, gas pipe 25 to 225 mm and drip irrigation pipe 12 to 32 mm. Not every diameter and SDR combination is made; a dash in the chart means that combination is not produced.",
    },
    {
      question: "Why is there no weight column?",
      answer:
        "The factory catalogue publishes no kg/m figures. The weight column stays hidden until the technical department confirms those numbers, so that an unverified figure is never presented as a specification.",
    },
    {
      question: "Can I select a pipe straight from this chart?",
      answer:
        "The chart is a starting point, not a selection. The SDR has to follow from the design pressure, operating temperature and installation conditions. Use the pipeline design calculator for a first pass and confirm with the technical department.",
    },
  ],
};

export const enTechnicalArticles: readonly ContentDocument[] = [
  buildSeoArticleDocument("en", enHdpePillarArticle),
  buildSeoArticleDocument("en", enWaterPillarArticle),
  buildSeoArticleDocument("en", enGasPillarArticle),
  enTechnicalHub,
  enPillarPolyethylene,
  enPipeDimensionsChart,
  article(
    "polyethylene-pipe-welding",
    "HDPE Pipe Welding: Butt Fusion and Electrofusion",
    "HDPE Pipe Welding | Butt Fusion & Electrofusion Guide",
    "HDPE pipe welding guide — butt fusion and electrofusion to INSO 18648: procedure steps, the parameters that matter and how joint quality is inspected.",
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
    "Air Valves in HDPE Pipelines | Selection, Placement, Installation",
    "What an air valve does in a polyethylene pipeline, how the three types differ, why vacuum collapse is SDR-dependent, and where valves belong on the route.",
    "Air valve design, selection and installation for PE water transfer.",
    "air release valve pipeline",
    ["HDPE pipe vacuum", "water hammer PE pipe", "air vent valve"],
    [
      {
        type: "paragraph",
        text: "An air valve does three jobs: during filling it expels the large volume of air in the pipe; in service it releases the air that comes out of solution under pressure and collects at high points; and during draining or a sudden pump trip it admits air so that a vacuum cannot form. Its absence usually announces itself as reduced flow, a line that vibrates, or — at worst — a collapsed pipe.",
      },
      {
        type: "definition",
        term: "Air valve",
        text: "A valve mounted vertically at a high point on the line which, depending on its type, either expels air from the line or admits air into it. It is not a pressure control device and does not replace a relief valve.",
      },
      { type: "heading", level: 2, text: "Three types, and the real difference between them" },
      {
        type: "paragraph",
        text: "Most field problems start here: one type is bought and the work of another is expected from it. The difference is the size of the orifice and the conditions under which the valve stays open.",
      },
      {
        type: "spec-table",
        title: "Air valve types and what each one does",
        rows: [
          {
            label: "Air release valve (small orifice)",
            value: "Opens under working pressure and vents air that has accumulated at high points during operation. Not sufficient for initial filling or for vacuum protection.",
          },
          {
            label: "Air/vacuum valve (large orifice)",
            value: "Expels a large volume of air as the line fills, and admits air on draining or pressure loss. Once the line is full its float seats and it will not reopen under pressure.",
          },
          {
            label: "Combination (double orifice)",
            value: "Both functions in one body. The default choice for high points on a water transmission main, because it covers all three duties.",
          },
        ],
        note: "Type and size must be confirmed against the manufacturer's air flow curves and the project's filling and draining conditions.",
      },
      { type: "heading", level: 2, text: "Why vacuum matters more in polyethylene" },
      {
        type: "paragraph",
        text: "Polyethylene pipe is extremely tolerant of internal pressure but behaves differently under net external pressure — when the pressure inside falls below the pressure outside. Rather than bursting, it buckles: the section goes oval and then flattens. That failure is generally irreversible.",
      },
      {
        type: "paragraph",
        text: "Resistance to that buckling is a direct function of wall thickness, so the higher the SDR — the thinner the wall — the less negative pressure it takes to start. Soil load and groundwater add to the same external load. The practical conclusion: on high-SDR lines, or lines buried below the water table, air/vacuum valve placement is not optional.",
      },
      { type: "heading", level: 2, text: "How trapped air eats flow" },
      {
        type: "paragraph",
        text: "A stationary air pocket at a high point occupies part of the flow area. The flow has to squeeze through a smaller section, which acts exactly like a local constriction: head loss rises, the pump moves to a different duty point and energy consumption goes up. If the pocket suddenly shifts or releases, the rapid movement of the water column can itself generate a surge. Meters and flow instruments also read incorrectly in the presence of air.",
      },
      { type: "heading", level: 2, text: "Where the line needs air valves" },
      {
        type: "list",
        items: [
          "Every high point on the longitudinal profile — the primary, non-negotiable location",
          "Points where the grade changes, even if they are not true peaks (a break in grade toward a descent)",
          "At regular intervals on long horizontal runs — around every 600 m is common on water supply projects",
          "Upstream and downstream of in-line isolation valves, since closing them splits the line into two separate sections",
          "At the pump discharge, where a power failure drops pressure quickly",
          "At the end of the line and on dead-end branches, where air has nowhere else to go",
        ],
      },
      { type: "heading", level: 2, text: "Mounting on polyethylene specifically" },
      {
        type: "list",
        items: [
          "The valve must sit truly vertical on the pipe crown; mounted at an angle, the float will not seat correctly",
          "Take the branch with an electrofusion saddle or a stub end and backing flange, not by threading directly into the PE wall",
          "Support the weight of the valve and its metallic fittings independently, so that load does not bear on the pipe wall",
          "Install it in a chamber with drainage; if the chamber floods, the valve draws dirty water into the line instead of air during a vacuum event",
          "Fit an isolation valve beneath it for servicing — and record that it must be left open afterwards",
          "The valve's vent must sit above any likely flood level and carry an insect screen",
        ],
      },
      { type: "heading", level: 2, text: "The failure modes that keep recurring" },
      {
        type: "list",
        items: [
          "Fitting only an air release valve and expecting vacuum protection from it",
          "Filling too fast, so the water column hits the float and generates a surge — filling must be controlled and slow",
          "Closing the isolation valve beneath the air valve after servicing and forgetting it; the line then runs with no air valve at all",
          "A flooded chamber that blocks the air inlet path",
          "Using an air valve in place of a relief or pressure-reducing valve",
        ],
      },
      { type: "heading", level: 2, text: "Maintenance" },
      {
        type: "paragraph",
        text: "An air valve is the component nobody visits until the day the line fails. A periodic inspection — in practice around every six months — should cover draining and cleaning the chamber, checking the seat and float, confirming the isolation valve below is open, and confirming the vent is clear. Sediment and suspended particles are the commonest cause of a leaking or stuck float.",
      },
      {
        type: "internal-links",
        title: "Related",
        links: [
          {
            label: "Temperature and pressure derating",
            path: "/technical-center/polyethylene-pipe-temperature-pressure",
            hint: "Calculating MOP",
          },
          {
            label: "HDPE pipe dimensions chart",
            path: "/technical-center/hdpe-pipe-dimensions-chart",
            hint: "How SDR relates to wall thickness",
          },
          {
            label: "Pipeline design calculator",
            path: "/calculator/pipeline-design",
          },
          { label: "Water supply pipe", path: "/products/water-supply-pipe" },
        ],
      },
    ],
    { applications: ["water-transfer"], products: ["water-supply-pipe", "pe100-pipe"] },
    ["https://bukanpipe.com/air-vent-valve/"],
    [
      {
        question: "How far apart should air valves be?",
        answer:
          "Spacing is not the primary basis — the longitudinal profile is. Every peak and every break in grade needs one. On long horizontal runs with no defined peak, regular intervals around every 600 m are common on water supply projects. The final figure comes from the project specification.",
      },
      {
        question: "What is the difference between an air release valve and an air/vacuum valve?",
        answer:
          "An air release valve has a small orifice and vents accumulated air under working pressure during operation. An air/vacuum valve has a large orifice and handles filling and air admission during draining; once the line is full it stays shut. A combination valve does both.",
      },
      {
        question: "Why does polyethylene pipe collapse?",
        answer:
          "When the pressure inside falls below the pressure outside — draining without air admission, or a sudden pump trip — the wall buckles under net external load and the section flattens. The higher the SDR and the thinner the wall, the less negative pressure it takes.",
      },
      {
        question: "Does an air valve prevent water hammer?",
        answer:
          "It is part of transient management, not all of it. Admitting air during a pressure drop reduces the severity of the negative wave, but the sudden release of trapped air can itself be a source of surge. Full surge control needs a separate calculation and sometimes additional equipment.",
      },
      {
        question: "How is an air valve mounted on polyethylene pipe?",
        answer:
          "Take the branch with an electrofusion saddle or a stub end and backing flange, never by threading into the wall. The valve sits vertical on the pipe crown, its weight is supported independently, and an isolation valve for servicing goes beneath it.",
      },
    ],
  ),
  article(
    "polyethylene-pipe-temperature-pressure",
    "Temperature Effects on PE Pipe Working Pressure",
    "HDPE Pipe Temperature Derating & MOP | PE Pressure Rating",
    "HDPE pipe pressure above the 20 °C reference — the temperature derating factor, calculating MOP, and selecting SDR from the line's real temperature.",
    "Operating temperature and allowable pressure.",
    "HDPE pipe temperature derating",
    ["PE pipe pressure rating", "MOP", "PN derating"],
    [
      {
        type: "paragraph",
        text: "The number printed on polyethylene pipe — PN10, PN16 and so on — is not an absolute. It is the allowable working pressure for water at 20 °C over a 50-year design life. If your line runs warmer, the real allowable pressure is lower than the number on the pipe and has to be calculated with a temperature derating factor.",
      },
      {
        type: "definition",
        term: "MOP",
        text: "Maximum operating pressure at the line's actual working temperature, from MOP = fT × PN, where fT is the derating factor for that temperature and that material grade. MOP, not the printed PN, is the design basis.",
      },
      { type: "heading", level: 2, text: "Why temperature reduces allowable pressure" },
      {
        type: "paragraph",
        text: "Polyethylene is viscoelastic: its behaviour depends on time and temperature. The PN figure derives from the material's long-term strength (MRS) at the reference temperature, and that strength is resistance to slow crack growth over 50 years, not instantaneous burst resistance. As temperature rises, molecular chains slide past one another more readily and the same stress produces more strain in less time. The result is that a hotter line reaches the end of its design life sooner — not that it necessarily bursts that day. Which is exactly why temperature-related failure usually appears years later and without warning.",
      },
      { type: "heading", level: 2, text: "A worked example" },
      {
        type: "paragraph",
        text: "Take a line laid on the surface in direct sun, where the water inside reaches 40 °C in summer. The derating factor at that temperature is around 0.74. So PN10 pipe has an allowable working pressure of roughly 7.4 bar under those conditions. Run it at 10 bar and it is being loaded beyond its design capacity.",
      },
      {
        type: "paragraph",
        text: "The practical consequence is to invert the order of selection: instead of choosing PN and then worrying about temperature, start from the required working pressure and the line's real temperature, and derive the PN you need from PN = working pressure ÷ fT. In the example above, delivering an effective 10 bar at 40 °C requires a class above PN10.",
      },
      { type: "heading", level: 2, text: "Where to get the factor" },
      {
        type: "paragraph",
        text: "The derating table depends on the material grade (PE80 or PE100) and on the fluid, and is published in the standard governing your project. Do not take it from a generic table found online, and do not apply one grade's factor to another. For water supply lines the basis is the national standard for that product; on projects with a client specification, the client's approved table.",
      },
      { type: "heading", level: 2, text: "Transient and continuous temperature are not the same" },
      {
        type: "paragraph",
        text: "What counts is the temperature the line operates at, not an instantaneous maximum. A short peak lasting a few hours a year is not the same as continuous operation at that temperature. Equally, if the line runs hot for months every summer, that is no longer transient and should be the design basis. For lines that cycle hot and cold, the designer has to weight the time spent in each condition.",
      },
      { type: "heading", level: 2, text: "Buried versus above ground" },
      {
        type: "list",
        items: [
          "Buried line: soil temperature at depth is stable and usually close to the local annual mean — daily swings do not reach it",
          "Surface line: wall temperature in direct sun runs above air temperature, especially when flow stops and water stands in the pipe",
          "Line in an unventilated duct or culvert: can run hotter than a surface line",
          "Warm process fluid: the fluid temperature governs, not the ambient",
        ],
      },
      { type: "heading", level: 2, text: "Below 20 °C" },
      {
        type: "paragraph",
        text: "Below the reference temperature the factor exceeds one, so in long-term strength terms a cold pipe is better off. In practice that gain is usually not taken in design, because cold introduces a different problem: polyethylene becomes stiffer and more notch-sensitive at low temperature. Unloading, handling and welding pipe in cold weather calls for more care, not less.",
      },
      {
        type: "internal-links",
        title: "Related",
        links: [
          {
            label: "HDPE pipe dimensions chart",
            path: "/technical-center/hdpe-pipe-dimensions-chart",
            hint: "Selecting SDR after calculating MOP",
          },
          {
            label: "PE100 technical guide",
            path: "/technical-center/pe100-technical-guide",
            hint: "Why the factor depends on material grade",
          },
          { label: "Pipeline design calculator", path: "/calculator/pipeline-design" },
          { label: "Water supply pipe", path: "/products/water-supply-pipe" },
        ],
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
          "Soil temperature at burial depth is more stable than air and usually stays near the local annual mean, so on most buried water mains the design temperature is close to the reference. That is not an automatic exemption: a shallow line, a hot climate, or a line carrying warm fluid has to be checked at its real temperature.",
      },
      {
        question: "How do I calculate MOP?",
        answer:
          "MOP = fT × PN. Take PN from the pipe specification and fT from the derating table for that material grade at the line's operating temperature. If you are working toward a required working pressure, invert it: the PN you need is working pressure divided by fT.",
      },
      {
        question: "What happens to pipe at high temperature?",
        answer:
          "It usually does not burst immediately. What happens is that design life shortens: slow crack growth proceeds faster and failure appears years earlier than intended, without prior warning. That is what makes a temperature error so hard to detect in service.",
      },
      {
        question: "Does pipe colour affect its temperature?",
        answer:
          "Black pipe runs hotter in direct sun, but the carbon black responsible is also what protects it against UV. The right answer for a surface line is not to avoid black; it is to apply the temperature factor in selecting the pressure class, and to shade or bury the line where possible.",
      },
      {
        question: "Can I apply more pressure in cold weather?",
        answer:
          "In long-term strength terms the factor below 20 °C is greater than one, but that gain is usually not taken in design. In cold conditions polyethylene becomes stiffer and more impact-sensitive, and that is the governing constraint for handling, installation and welding.",
      },
    ],
  ),
  article(
    "subsurface-drip-irrigation",
    "Subsurface Drip Irrigation Systems",
    "Subsurface Drip Irrigation (SDI) with HDPE Pipe | Design & Maintenance",
    "What subsurface drip irrigation is, burial depth for dripline, preventing root intrusion and soil suction, and the role of the polyethylene main.",
    "PE mains and design for subsurface irrigation.",
    "subsurface drip irrigation",
    ["HDPE irrigation pipe", "agricultural PE pipe"],
    [
      {
        type: "paragraph",
        text: "Subsurface drip irrigation, or SDI, is ordinary drip irrigation with one difference: the emitter line is buried in the root zone instead of lying on the surface. Water reaches the roots directly and the soil surface stays dry. The result is that most surface evaporation disappears, weed growth falls, and field operations can be carried out without working around irrigation lines. In exchange, it is a system you cannot diagnose by eye — which is why its design and maintenance are held to a stricter standard.",
      },
      { type: "heading", level: 2, text: "Network structure and where the PE pipe sits" },
      {
        type: "paragraph",
        text: "The network has three layers. The main line runs from well or reservoir to the control and filtration station and carries the highest flow and pressure. The manifold or submain distributes between field blocks. The emitter laterals are buried. Pressure-rated polyethylene pipe makes up the first two layers; the third is a separate product. The point that is often understood too late is that the durability and uniformity of the whole system are set by those first two layers, not by the emitter.",
      },
      { type: "heading", level: 2, text: "Burial depth" },
      {
        type: "paragraph",
        text: "Lateral burial depth is determined by crop rooting, soil texture and tillage practice. On row crops a range of roughly 20 to 40 cm is usually chosen. Shallower than that exposes the line to damage from implements and brings moisture to the surface; deeper puts water below the root zone of young plants and disrupts germination and establishment. The final figure has to come from an irrigation specialist familiar with the crop and the region.",
      },
      { type: "heading", level: 2, text: "The three things that kill an SDI system" },
      {
        type: "paragraph",
        text: "In surface drip you can see a blockage. In SDI the first symptom is usually a yellow patch in the field — by which time the damage is done. The three main failure mechanisms are:",
      },
      {
        type: "list",
        items: [
          "Root intrusion into the emitter passage — roots grow toward moisture and block it",
          "Soil suction when the system shuts down — as pressure falls the line tends to empty, and instead of air it draws soil and silt in through the emitters",
          "Chemical and biological scaling — calcium carbonate, iron and microbial slime progressively narrowing the passage",
        ],
      },
      { type: "heading", level: 2, text: "The answers belong in design, not in operation" },
      {
        type: "list",
        items: [
          "Root-resistant emitters, or a periodic injection programme per the emitter manufacturer's recommendation",
          "Air/vacuum valves on the manifold and at high points — the component that prevents soil being drawn into the emitters, and the cheapest insurance this system has",
          "A flush manifold at the ends of the laterals, so the line can be flushed at velocity periodically; without one, accumulated particles have nowhere to leave",
          "A filtration station matched to the water source: screen or disc for clean water, sand for water carrying algae and organic matter",
          "Pressure-compensating emitters on sloping ground or long laterals",
          "Pressure gauges at the head and tail of each block — a change in the differential is the first sign of clogging, and appears before the field goes yellow",
        ],
      },
      { type: "heading", level: 2, text: "Distribution uniformity is the real measure of success" },
      {
        type: "paragraph",
        text: "In SDI you cannot assess uniformity by looking, so it has to be guaranteed in design. The conventional criterion is that pressure variation between the head and the tail of an irrigation block should not exceed about 20 per cent of emitter operating pressure. Meeting it usually makes the manifold and main larger than flow alone would have required — and this is exactly where saving on main-line diameter reappears later as an uneven crop.",
      },
      { type: "heading", level: 2, text: "Where it makes sense" },
      {
        type: "paragraph",
        text: "SDI carries a higher capital cost and expects more disciplined maintenance. It earns its place where the planting is perennial or the crop is high-value, where water is expensive or limited, where strong wind undermines the efficiency of sprinkler irrigation, or where you want to carry out field operations and harvest without lifting irrigation lines. For a low-value annual crop with abundant water, it usually does not pay.",
      },
      {
        type: "internal-links",
        title: "Related",
        links: [
          {
            label: "Agricultural irrigation",
            path: "/applications/agriculture-irrigation",
            hint: "Main line and submain design",
          },
          {
            label: "Air valves in a transmission line",
            path: "/technical-center/air-vent-valve",
            hint: "Preventing soil suction into emitters",
          },
          { label: "Pipeline design calculator", path: "/calculator/pipeline-design" },
          { label: "Irrigation pipe", path: "/products/irrigation-pipe" },
        ],
      },
    ],
    { applications: ["agriculture-irrigation"], products: ["irrigation-pipe"] },
    ["https://bukanpipe.com/"],
    [
      {
        question: "How deep should subsurface dripline be buried?",
        answer:
          "Depending on crop, soil texture and tillage, usually somewhere between about 20 and 40 cm. Shallower exposes the line to implements; deeper puts water below the root zone of young plants. The exact figure should come from an irrigation specialist for that crop and region.",
      },
      {
        question: "How do I prevent root intrusion into emitters?",
        answer:
          "With root-resistant emitters, or a periodic injection programme following the emitter manufacturer's recommendation. Short, frequent irrigations that keep the soil around the emitter continuously moist also reduce the root's incentive to enter it.",
      },
      {
        question: "Why does a subsurface system need air valves?",
        answer:
          "When the system shuts down, line pressure falls and the line tends to empty. If air cannot enter elsewhere, the line draws air through the emitters — and soil and silt with it. An air/vacuum valve on the manifold closes that path.",
      },
      {
        question: "How long does an SDI system last?",
        answer:
          "Its life depends far less on the pipe than on filtration quality, the periodic flushing programme and scale control. A system with no flush manifold, or one that is never flushed, fails early regardless of pipe quality.",
      },
      {
        question: "Can SDI be used with saline well water?",
        answer:
          "It can, but water with high hardness or iron greatly increases the risk of scaling inside the emitter passage. In that case water quality analysis, appropriate filtration and an acid flushing programme per the emitter manufacturer are an inseparable part of the design.",
      },
    ],
  ),
  buildSeoArticleDocument("en", enPe100TechnicalGuideSeed),
  buildSeoArticleDocument("en", enHdpeInstallationGuideSeed),
];
