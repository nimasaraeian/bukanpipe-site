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
  primaryKeyword: "HDPE pipe",
  secondaryKeywords: ["polyethylene pipe", "PE100 pipe", "PE pipe manufacturer"],
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
      text: "Each product line has its own specification page. Contact sales for diameter, SDR, PN and weight-per-metre tables.",
    },
    {
      type: "internal-links",
      title: "Guides and enquiry",
      links: [
        { label: "Request a quote", path: "/request-quote" },
        { label: "Technical Center", path: "/technical-center" },
        { label: "Laboratory", path: "/laboratory" },
        { label: "Certifications", path: "/certifications" },
      ],
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
      text: "Application guides explain project use cases and selection factors. Product pages list specifications and supply options for each pipe family.",
    },
  ],
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
