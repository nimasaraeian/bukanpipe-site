import type { ContentDocument } from "@/content/models/content-document";

export const enAbout: ContentDocument = {
  id: "about",
  slug: "about",
  path: "/about",
  locale: "en",
  kind: "company",
  title: "Engineering Reliable Flow Systems Since 1997",
  seoTitle: "About Bukan Pipe | HDPE Pipe Manufacturer Since 1997",
  seoDescription:
    "Bukan Pipe manufactures single-wall HDPE and PE100 polyethylene pipe up to 630 mm OD for water, gas, agriculture and industrial networks since 1997.",
  description:
    "Single-wall HDPE and PE100 polyethylene pipe for water, gas, agriculture and industrial networks — manufactured in Bukan, West Azerbaijan.",
  primaryKeyword: "HDPE pipe manufacturer",
  secondaryKeywords: ["polyethylene pipe manufacturer", "PE pipe manufacturer", "Bukan Pipe"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/about_us/"],
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "Bukan Pipe has manufactured single-wall polyethylene pipe since 1997 (Persian calendar 1376) and is established in Iran's PE pipe industry. The factory produces pipe up to 630 mm outside diameter (25 in) in a range of wall thicknesses and pressure classes.",
    },
    { type: "heading", level: 2, text: "Primary applications" },
    {
      type: "list",
      items: [
        "Municipal and rural water supply, pressurised irrigation and industrial water transfer",
        "Gas service connections and distribution networks",
        "Sewerage, drainage and cable protection",
        "Industrial fluid transfer where PE is specified",
      ],
    },
    { type: "heading", level: 2, text: "Why polyethylene" },
    {
      type: "paragraph",
      text: "Polyethylene pipe combines strength, light weight, flexibility and long service life in buried networks — a practical alternative to metallic, GRP, PVC and cast iron in many project types.",
    },
    { type: "heading", level: 2, text: "Factory location" },
    {
      type: "paragraph",
      text: "West Azerbaijan Province — Bukan, 10 km Miandoab Road. Postal code: 5955164341, Iran.",
    },
    {
      type: "internal-links",
      title: "Explore the factory",
      links: [
        { label: "Factory Gallery", path: "/gallery", hint: "Real manufacturing photographs" },
        { label: "Products", path: "/products" },
        { label: "Laboratory", path: "/laboratory" },
        { label: "Request quote", path: "/request-quote" },
      ],
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe"],
    laboratory: ["services"],
  },
};

export const enQuality: ContentDocument = {
  id: "quality",
  slug: "quality",
  path: "/quality",
  locale: "en",
  kind: "company",
  title: "Quality Control & Laboratory",
  seoTitle: "Quality Control & Laboratory | Bukan Pipe",
  seoDescription:
    "Production quality control, in-line inspection and laboratory testing for polyethylene pipe.",
  description: "Quality control and laboratory testing.",
  primaryKeyword: "HDPE pipe quality control",
  secondaryKeywords: ["PE pipe QC", "polyethylene pipe inspection"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/quality-policy/"],
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Quality Control & Laboratory", path: "/quality" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "Product quality at Bukan Pipe rests on incoming material control, extrusion process monitoring, dimensional inspection and final mechanical and pressure tests in the QC unit and laboratory.",
    },
    { type: "heading", level: 2, text: "Control stages" },
    {
      type: "list",
      items: [
        "Raw material and production input control",
        "In-process inspection (dimensions, appearance, uniformity)",
        "Mechanical, thermal and pressure tests in the laboratory",
        "Batch traceability and result documentation",
      ],
    },
    {
      type: "paragraph",
      text: "For sensitive projects, coordination on laboratory test scope and QC documentation is available through sales.",
    },
    {
      type: "internal-links",
      title: "Related",
      links: [
        { label: "Factory Gallery", path: "/gallery" },
        { label: "Laboratory", path: "/laboratory" },
        { label: "About Bukan Pipe", path: "/about" },
      ],
    },
  ],
  related: { laboratory: ["services", "test-scope", "iso-17025"] },
};

export const enCertifications: ContentDocument = {
  id: "certifications",
  slug: "certifications",
  path: "/certifications",
  locale: "en",
  kind: "company",
  title: "Certifications & Awards",
  seoTitle: "Certifications & Awards | Bukan Pipe",
  seoDescription:
    "HDPE pipe certifications held by Bukan Pipe — ISO 9001, ISO 14001, ISO 45001, ISO/IEC 17025, the mandatory standard mark and CE conformity.",
  description: "Certificates and company awards.",
  primaryKeyword: "HDPE pipe certifications",
  secondaryKeywords: ["INSO pipe standard", "PE pipe manufacturer awards"],
  status: "published",
  evidenceStatus: "requires-verification",
  verificationStatus: "verify-before-production",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/about_us/", "https://bukanpipe.com/certificates/"],
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Certifications", path: "/certifications" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "Bukan Pipe has received recognition from Iran's Ministry of Industry, Mine and Trade and grade A ranking among polyethylene pipe producers from the Ministry of Agriculture. Certificate copies and validity dates are available on request from sales or quality control.",
    },
    {
      type: "paragraph",
      text: "Contact sales or QC for project-specific certificate copies.",
    },
  ],
  related: { laboratory: ["iso-17025"] },
};

export const enContact: ContentDocument = {
  id: "contact",
  slug: "contact",
  path: "/contact",
  locale: "en",
  kind: "company",
  title: "Contact",
  seoTitle: "Contact Bukan Pipe | Sales & Factory",
  seoDescription:
    "Contact the Bukan Pipe polyethylene pipe factory — sales numbers, laboratory contact and the factory address in Bukan, West Azerbaijan, Iran.",
  description: "Contact factory and sales.",
  primaryKeyword: "contact Bukan Pipe",
  secondaryKeywords: ["Bukan Pipe factory address", "HDPE pipe supplier contact"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/about_us/"],
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" },
  ],
  sections: [
    { type: "heading", level: 2, text: "Phone" },
    {
      type: "list",
      items: ["+98 44 4643 3444–5", "+98 44 4150"],
    },
    { type: "heading", level: 2, text: "Sales" },
    {
      type: "list",
      items: ["+98 914 482 2511", "+98 914 382 0556", "info@bukanpipe.com"],
    },
    { type: "heading", level: 2, text: "Quality control & laboratory" },
    {
      type: "list",
      items: ["+98 901 341 4979", "lab@bukanpipe.com"],
    },
  ],
};

export const enCompanyPages: readonly ContentDocument[] = [
  enAbout,
  enQuality,
  enCertifications,
  enContact,
];
