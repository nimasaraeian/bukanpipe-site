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
  title: "Certifications & Licences",
  seoTitle: "HDPE Pipe Certifications | INSO Standard Marks & ISO 9001 | Bukan Pipe",
  seoDescription:
    "Bukan Pipe certifications with numbers and issuers — INSO 14427-2, 11233-2 and 7607 standard mark licences, ISO 9001, 14001, 45001 and the industrial operating licence.",
  description: "Certificates, licences and registrations with their numbers and issuing bodies.",
  primaryKeyword: "HDPE pipe certifications",
  secondaryKeywords: ["INSO pipe standard", "PE pipe manufacturer awards"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "verified",
  lastReviewed: "2026-09-23",
  references: ["https://bukanpipe.com/certificates/"],
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Certifications", path: "/certifications" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "For drinking water and gas networks in Iran, the document that actually decides whether a pipe may be used is the mandatory standard mark licence for that specific application — not a management system certificate. The tables below give both, each with its number, issuing body and exact scope, so any of them can be verified independently.",
    },
    { type: "heading", level: 2, text: "Mandatory standard mark licences" },
    {
      type: "paragraph",
      text: "These are issued by the Iranian National Standards Organization, and each covers only the application named in its scope. A water supply licence is not an authorisation to produce gas pipe, and the reverse is equally true.",
    },
    {
      type: "document-table",
      table: "standard-mark",
      caption: "Mandatory standard mark licences",
      summary:
        "Dates are quoted as printed on the licence. \"Last renewed\" is a renewal date, not an expiry; verify current validity with the issuing body.",
    },
    { type: "heading", level: 2, text: "Management system certificates" },
    {
      type: "paragraph",
      text: "These describe how the factory is run, not whether one particular pipe conforms. ISO 9001 says the production and control process is documented and audited; conformity of a given pipe to its application standard is shown by the standard mark licence and the batch test report.",
    },
    {
      type: "document-table",
      table: "management-system",
      caption: "Management system certificates",
      summary:
        "The ISO 9001 scope also fixes the production range: pressure water pipe from 16 to 630 mm.",
    },
    { type: "heading", level: 2, text: "Sector approvals" },
    {
      type: "document-table",
      table: "sector-approval",
      caption: "Sector approvals",
    },
    { type: "heading", level: 2, text: "Registration and operating licence" },
    {
      type: "document-table",
      table: "registration",
      caption: "Operating licence and trademark",
      summary:
        "Company registration number 121, national ID 10220007922, recurring across several of these documents.",
    },
    { type: "heading", level: 2, text: "Licensed annual capacity" },
    {
      type: "paragraph",
      text: "The industrial operating licence sets a permitted annual capacity per product. This is the licence ceiling, not output in any particular year.",
    },
    {
      type: "document-table",
      table: "capacity",
      caption: "Annual capacity stated on the industrial operating licence",
    },
    { type: "heading", level: 2, text: "How to verify these documents" },
    {
      type: "list",
      items: [
        "Standard mark licences: through the Iranian National Standards Organization, using the licence number",
        "ISO 9001: through the SGS certificate directory, using CH08/0870",
        "QMS certificates: with the certificate number, through the issuing body",
        "Trademark: through the Intellectual Property Center, using registration 370560",
        "For each shipment, request the test report for that production batch separately",
      ],
    },
    {
      type: "internal-links",
      title: "Related",
      links: [
        {
          label: "Water supply pipe guide",
          path: "/technical-center/water-supply-polyethylene-pipe-guide",
          hint: "What INSO 14427-2 requires",
        },
        {
          label: "Gas pipe guide",
          path: "/technical-center/gas-polyethylene-pipe-guide",
          hint: "What INSO 11233-2 requires",
        },
        { label: "Quality control", path: "/quality" },
        { label: "Laboratory", path: "/laboratory" },
        { label: "The factory", path: "/about" },
        { label: "Request a quote", path: "/request-quote" },
      ],
    },
  ],
  faqs: [
    {
      question: "Which standards does Bukan Pipe hold?",
      answer:
        "Three mandatory standard mark licences: INSO 14427-2 for pressure water supply, sewerage and drainage; INSO 11233-2 for gas supply; and INSO 7607 for irrigation. Each licence covers only its own application.",
    },
    {
      question: "How is a standard mark licence different from ISO 9001?",
      answer:
        "The standard mark licence is about the product — it certifies conformity to the national standard for that application and is mandatory for water and gas networks. ISO 9001 is about the factory's management system and does not substitute for it.",
    },
    {
      question: "What should I ask for on a drinking water project?",
      answer:
        "The standard mark licence whose scope names INSO 14427-2, plus the test report for the batch you are being supplied. A management system certificate alone is not sufficient for this purpose.",
    },
    {
      question: "What is the factory's production capacity?",
      answer:
        "The industrial operating licence permits 14,000 tonnes per year in total: 6,375 t water pipe, 4,775 t sewage pipe, 2,550 t gas pipe and 300 t irrigation tape. That is the licensed ceiling rather than output in a given year.",
    },
  ],
  related: {
    laboratory: ["iso-17025"],
    articles: ["water-supply-polyethylene-pipe-guide", "gas-polyethylene-pipe-guide"],
  },
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
