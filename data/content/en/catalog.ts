import { enProducts } from "@/data/content/en/products";
import { enApplications } from "@/data/content/en/applications";
import { enLaboratoryPages } from "@/data/content/en/laboratory";
import { enTechnicalArticles } from "@/data/content/en/technical";
import { enCompanyPages } from "@/data/content/en/company";
import {
  enDownloadsHub,
  enCalculatorHub,
  enCalculatorIndex,
} from "@/data/content/en/downloads";
import type { ContentDocument } from "@/content/models/content-document";

export const enProductsHub: ContentDocument = {
  id: "products-hub",
  slug: "products",
  path: "/products",
  locale: "en",
  kind: "hub",
  title: "Products",
  seoTitle: "HDPE Pipe Products | Water, Gas, Irrigation & PE100 | Bukan Pipe",
  seoDescription:
    "HDPE pipe for water supply, gas, sewerage, drainage, irrigation and PE100 — Bukan Pipe product catalog.",
  description: "HDPE and PE100 pipe product catalog.",
  // The pillar guide at /polyethylene-pipe owns the generic "HDPE pipe"
  // intent; this hub owns the catalogue/commercial one, mirroring the FA map
  // where /products owns "خرید لوله پلی اتیلن" rather than the generic term.
  primaryKeyword: "HDPE pipe products",
  secondaryKeywords: ["buy HDPE pipe", "HDPE pipe catalog", "PE pipe range"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "Choose the product family by application, not by diameter. Water, gas, irrigation and industrial pipe are extruded from the same base material but carry different standards, different quality control requirements and different marking — and for gas and drinking water, that difference is a legal requirement rather than a preference.",
    },
    { type: "heading", level: 2, text: "What an enquiry has to state" },
    {
      type: "paragraph",
      text: "An enquiry that says only \"I need 110\" cannot be priced, because at one diameter there are several products with different wall thickness, weight and cost. These five items turn an enquiry into something that can be quoted:",
    },
    {
      type: "list",
      items: [
        "Application: water supply, gas, irrigation, sewerage or industrial — this fixes which standard governs",
        "Outside diameter in millimetres",
        "Pressure class: SDR or PN — and the operating temperature if the line runs warm",
        "Material grade: PE80 or PE100",
        "Length, supply form (straight lengths or coil) and delivery destination",
      ],
    },
    { type: "heading", level: 2, text: "How to compare quotations" },
    {
      type: "paragraph",
      text: "Comparing price per metre is the most misleading way to buy polyethylene pipe. Weight per metre follows from outside diameter, wall thickness and material density — so pipe that is lighter at the same diameter and pressure class simply has a thinner wall. It is not a discount; it is missing material, and it shows up in the life of the line.",
    },
    {
      type: "list",
      items: [
        "Compare on weight or on wall thickness, not on metres",
        "Check the quoted wall thickness against the catalogue dimensions chart for that diameter and SDR",
        "Read the marking printed on the pipe: manufacturer, diameter, SDR or PN, material grade and standard",
        "For potable water and gas, ask for the approval covering that application — not a certificate for a different product from the same factory",
        "Request the test report for the production batch you are being supplied",
      ],
    },
    {
      type: "internal-links",
      title: "Guides and enquiry",
      links: [
        {
          label: "Complete polyethylene pipe guide",
          path: "/technical-center/polyethylene-pipe-complete-guide",
          hint: "Grade, SDR, standards and buying",
        },
        { label: "Request a quote", path: "/request-quote" },
        {
          label: "HDPE pipe dimensions chart",
          path: "/technical-center/hdpe-pipe-dimensions-chart",
          hint: "Check wall thickness before ordering",
        },
        { label: "Technical Center", path: "/technical-center" },
        { label: "Laboratory", path: "/laboratory" },
        { label: "Certifications", path: "/certifications" },
      ],
    },
  ],
  faqs: [
    {
      question: "What information is needed to buy HDPE pipe?",
      answer:
        "Application, outside diameter in millimetres, pressure class (SDR or PN), material grade (PE80 or PE100), quantity and supply form. Without a pressure class, one diameter covers several products of different weight and price and the enquiry cannot be quoted.",
    },
    {
      question: "How do I judge pipe quality?",
      answer:
        "Check three things: wall thickness against the dimensions chart for that diameter and SDR, the marking printed on the pipe, and the batch test report. Price per metre is not a quality signal — lighter pipe at the same diameter and class has a thinner wall.",
    },
    {
      question: "What sizes does Bukan Pipe produce?",
      answer:
        "Up to 630 mm outside diameter, in PE80 and PE100. The full catalogue table of diameter, wall thickness and SDR is published in the technical centre.",
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe", "pe100-pipe"],
    articles: ["pe100-technical-guide", "hdpe-installation-guide", "polyethylene-pipe"],
  },
};

export const enApplicationsHub: ContentDocument = {
  id: "applications-hub",
  slug: "applications",
  path: "/applications",
  locale: "en",
  kind: "hub",
  title: "Applications",
  seoTitle: "HDPE Pipe Applications | Water, Gas, Irrigation & Industry",
  seoDescription:
    "Application guides for PE pipe in water transfer, gas, agriculture, sewerage, drainage and industry.",
  description: "PE pipe application areas.",
  primaryKeyword: "HDPE pipe applications",
  secondaryKeywords: ["polyethylene piping systems", "PE pipe use cases"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Applications", path: "/applications" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "Polyethylene pipe is not one product but a family, and in each application a different standard and a different selection logic applies. This page shows what each application asks of the pipe and what actually drives the choice. Specifications and supply options are on the product pages.",
    },
    { type: "heading", level: 2, text: "What drives the choice in each application" },
    {
      type: "spec-table",
      title: "Selection logic by application",
      rows: [
        {
          label: "Water transfer and distribution",
          value: "Pressure class comes from the hydraulic grade line plus a surge allowance; diameter from flow and permissible velocity. The potable-contact requirement governs.",
        },
        {
          label: "Agricultural irrigation",
          value: "Beyond flow, distribution uniformity across the block is decisive and usually drives diameter up a size. Pressure class is set by the pump's shut-off head, not its duty point.",
        },
        {
          label: "Gas distribution",
          value: "The standard and the gas company approval govern. Electrofusion jointing and post-burial traceability are requirements, not options.",
        },
        {
          label: "Sewerage",
          value: "First establish whether the line is gravity or pumped. On gravity, the criteria are external load capacity and self-cleansing velocity; on a rising main, pressure class.",
        },
        {
          label: "Drainage",
          value: "Separating the perforated section from the solid section, and matching the filter to soil texture. Diameter comes from peak runoff.",
        },
        {
          label: "Industrial",
          value: "Chemical compatibility against the actual composition and concentration, and operating temperature. On industrial lines temperature causes more premature failures than pressure.",
        },
        {
          label: "Cable protection",
          value: "Fill ratio of duct to cable, route bend radius, and the installation method — pulling or blowing — which fixes the required bore finish.",
        },
      ],
    },
    { type: "heading", level: 2, text: "What every application has in common" },
    {
      type: "list",
      items: [
        "A continuously fused line, with no joint to leak through and none to infiltrate through",
        "Resistance to soil and fluid corrosion — the main reason it replaces metal and concrete",
        "Flexibility that accommodates ground settlement, provided the bedding is properly executed",
        "One requirement common to every project: the order must state SDR and material grade, not just diameter",
      ],
    },
    {
      type: "internal-links",
      title: "Application guides",
      links: [
        {
          label: "Complete polyethylene pipe guide",
          path: "/technical-center/polyethylene-pipe-complete-guide",
          hint: "Grade, SDR, standards and buying",
        },
        { label: "Water transfer", path: "/applications/water-transfer" },
        { label: "Agricultural irrigation", path: "/applications/agriculture-irrigation" },
        { label: "Gas distribution", path: "/applications/gas-distribution" },
        { label: "Sewerage", path: "/applications/sewage" },
        { label: "Drainage", path: "/applications/drainage" },
        { label: "Industrial", path: "/applications/industrial" },
        { label: "Cable protection", path: "/applications/cable-protection" },
      ],
    },
  ],
  faqs: [
    {
      question: "What are the main applications of HDPE pipe?",
      answer:
        "Potable water transfer and distribution, agricultural irrigation, gas distribution, sewage collection, drainage, industrial fluid lines and cable protection ducting. The base material is common to all; the standard, quality control requirements and selection logic are not.",
    },
    {
      question: "Can one pipe be used across several applications?",
      answer:
        "Not freely. Potable water pipe and gas pipe each carry their own standard and approval, and substituting one for the other is not permitted. In non-mandatory applications such as irrigation or drainage, using a higher class is technically fine but usually more than the project needs.",
    },
    {
      question: "How do I know which application fits my project?",
      answer:
        "Start from the fluid and the line conditions: what is being conveyed, at what pressure, at what temperature, and whether the line is gravity or pressurised. Those four answers fix both the application and the governing standard.",
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe"],
    articles: ["pe100-technical-guide", "hdpe-installation-guide"],
  },
};

export const contentCatalogEn: readonly ContentDocument[] = [
  enProductsHub,
  ...enProducts,
  enApplicationsHub,
  ...enApplications,
  ...enLaboratoryPages,
  ...enTechnicalArticles,
  ...enCompanyPages,
  enDownloadsHub,
  enCalculatorIndex,
  enCalculatorHub,
];
