import type { ContentDocument } from "@/content/models/content-document";

export const enAbout: ContentDocument = {
  id: "about",
  slug: "about",
  path: "/about",
  locale: "en",
  kind: "company",
  title: "The Bukan Polyethylene Pipe Factory",
  seoTitle: "About Bukan Pipe | HDPE Pipe Manufacturer, Iran",
  seoDescription:
    "Bukan Pipe manufactures single-wall HDPE and PE100 polyethylene pipe up to 630 mm OD for water, gas, agriculture and industrial networks in West Azerbaijan.",
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
      text: "The company was registered under number 121 on 1373/06/26 in the Iranian calendar, and manufactures single-wall polyethylene pipe in Bukan, West Azerbaijan. The factory produces pipe up to 630 mm outside diameter (25 in) across a range of wall thicknesses and pressure classes, in PE80 and PE100.",
    },
    { type: "heading", level: 2, text: "Registration details" },
    {
      type: "spec-table",
      title: "Official identifiers",
      rows: [
        { label: "Registration number", value: "121, dated 1373/06/26" },
        { label: "National ID", value: "10220007922" },
        { label: "Industrial operating licence", value: "113/7/256493 — Ministry of Industry, Mine and Trade" },
        { label: "Trademark", value: "LB Bukan Pipe — registration 370560" },
        { label: "Factory address", value: "10th km of Bukan–Miandoab road, Bukan, West Azerbaijan" },
        { label: "Postal code", value: "5955116757" },
      ],
      note: "These identifiers appear on the industrial operating licence and the company's other official documents, and can be verified independently.",
    },
    { type: "heading", level: 2, text: "Licensed capacity" },
    {
      type: "paragraph",
      text: "The industrial operating licence sets a permitted annual capacity per product: 14,000 tonnes per year in total, on three shifts. This is the licence ceiling rather than output in any particular year.",
    },
    {
      type: "document-table",
      table: "capacity",
      caption: "Annual capacity stated on the industrial operating licence",
    },
    { type: "heading", level: 2, text: "Quality record" },
    {
      type: "paragraph",
      text: "Between 1388 and 1397 in the Iranian calendar (2009–2018), the Iranian National Standards Organization named the factory a model quality unit seven times, twice at national level. What distinguishes that from a single plaque is the repetition across successive inspections. The full list, with issuer and year, is on the certifications page.",
    },
    { type: "heading", level: 2, text: "Primary applications" },
    {
      type: "list",
      items: [
        "Municipal and rural water supply, pressurised irrigation and industrial water transfer — mandatory standard mark licence to INSO 14427-2",
        "Gas service connections and distribution networks — licence to INSO 11233-2",
        "Irrigation — licence to INSO 7607",
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
      text: "West Azerbaijan Province — Bukan, 10 km Miandoab Road. Postal code: 5955116757, Iran.",
    },
    {
      type: "internal-links",
      title: "Explore the factory",
      links: [
        { label: "Factory Gallery", path: "/gallery", hint: "Real manufacturing photographs" },
        { label: "Products", path: "/products" },
        {
          label: "Certifications and licences",
          path: "/certifications",
          hint: "Standard marks, ISO certificates and awards",
        },
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
    { type: "heading", level: 2, text: "The documented framework" },
    {
      type: "paragraph",
      text: "The factory's quality management system has been certified to ISO 9001 since 2008; the current certificate is CH08/0870 from SGS Switzerland, with a scope covering pressure water pipe from 2 to 40 atm in 16 to 630 mm. ISO 14001 (environmental), ISO 45001 (occupational health and safety) and ISO 10002 (complaints handling) are held alongside it.",
    },
    {
      type: "document-table",
      table: "management-system",
      caption: "Management system certificates",
      summary:
        "Each certificate's number and issuing body are given so it can be verified directly. The full list of licences and approvals is on the certifications page.",
    },
    { type: "heading", level: 2, text: "What ISO 9001 says, and what it does not" },
    {
      type: "paragraph",
      text: "ISO 9001 certifies that the production and control process is documented, followed and audited. It says nothing about whether a particular pipe conforms to the standard for its application — that is the job of the mandatory standard mark licence and the batch test report. Ask for both separately when ordering.",
    },
    {
      type: "paragraph",
      text: "For sensitive projects, coordination on laboratory test scope and QC documentation is available through sales.",
    },
    {
      type: "internal-links",
      title: "Related",
      links: [
        {
          label: "Certifications and licences",
          path: "/certifications",
          hint: "Standard mark numbers and certificates",
        },
        { label: "Factory Gallery", path: "/gallery" },
        { label: "Laboratory", path: "/laboratory" },
        { label: "About Bukan Pipe", path: "/about" },
      ],
    },
  ],
  faqs: [
    {
      question: "How does ISO 9001 differ from a standard mark licence?",
      answer:
        "ISO 9001 covers the factory's management system and certifies that production and control are documented and audited. Conformity of a given pipe to the standard for its application is shown by the mandatory standard mark licence and the batch test report. Ask for both separately when ordering.",
    },
    {
      question: "How do I obtain the test report for my shipment?",
      answer:
        "From the quality control and laboratory unit, at lab@bukanpipe.com or +98 901 341 4979. Reports are tied to a production batch and issued per shipment.",
    },
    {
      question: "How can I check pipe quality before acceptance?",
      answer:
        "Three things: compare wall thickness against the dimensions chart for that diameter and SDR, read the marking printed on the pipe (manufacturer, diameter, SDR or PN, material grade and standard), and request the batch test report.",
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
    { type: "heading", level: 2, text: "Awards and commendations" },
    {
      type: "paragraph",
      text: "Alongside the licences, the factory has been recognised by government bodies over two decades. The one that carries most weight for a pipe buyer is the Iranian National Standards Organization's own \"model quality unit\" award, held seven times between 1388 and 1397 (2009–2018), twice at national level. A title repeated across consecutive years says something a single plaque does not: that quality held up across successive inspections.",
    },
    {
      type: "paragraph",
      text: "The archive holds 48 plaques. The table lists the 27 whose year and issuing body are printed on the document and legible. The rest are deliberately absent — a year inferred from a filename is not a date, and a second scan of the same plaque is not a second award.",
    },
    {
      type: "document-table",
      table: "awards",
      caption: "Awards and commendations",
      summary:
        "Years are quoted as printed, in the Iranian calendar where the document uses it. The Erbil and Sulaymaniyah exhibition entries evidence export activity into Iraq.",
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
    {
      type: "paragraph",
      text: "Contact the factory directly for orders, quotations or technical questions. If the question is about diameter, pressure class or the standard governing your application, the technical unit answers it; for price and availability, sales.",
    },
    { type: "heading", level: 2, text: "Factory phone" },
    {
      type: "list",
      items: ["+98 44 4643 3444–5", "+98 44 4150", "Fax: +98 44 4643 3455"],
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
    { type: "heading", level: 2, text: "Factory address" },
    {
      type: "spec-table",
      title: "Address and registration",
      rows: [
        { label: "Address", value: "10th km of Bukan–Miandoab road, Bukan, West Azerbaijan, Iran" },
        { label: "Postal code", value: "5955116757" },
        { label: "National ID", value: "10220007922" },
        { label: "Registration number", value: "121" },
      ],
      note: "Postal code and national ID are as printed on the industrial operating licence and the company's other official documents.",
    },
    { type: "heading", level: 2, text: "To get a faster answer" },
    {
      type: "paragraph",
      text: "An enquiry giving only a diameter cannot be priced, because one diameter covers several pressure classes of different weight and cost. State these five items in the first message and the answer comes back in one round trip:",
    },
    {
      type: "list",
      items: [
        "Application: water supply, gas, irrigation, sewerage or industrial",
        "Outside diameter in millimetres",
        "Pressure class: SDR or PN",
        "Material grade: PE80 or PE100",
        "Length, supply form (straight lengths or coil) and delivery destination",
      ],
    },
    {
      type: "internal-links",
      title: "Other routes",
      links: [
        { label: "Request a quote", path: "/request-quote", hint: "The fastest route" },
        { label: "Products", path: "/products" },
        {
          label: "HDPE pipe dimensions chart",
          path: "/technical-center/hdpe-pipe-dimensions-chart",
          hint: "Settle the pressure class before calling",
        },
        { label: "Certifications and licences", path: "/certifications" },
      ],
    },
  ],
  faqs: [
    {
      question: "Where is the Bukan Pipe factory?",
      answer:
        "On the 10th km of the Bukan–Miandoab road, Bukan, West Azerbaijan province, Iran, postal code 5955116757.",
    },
    {
      question: "Which number should I call for a quotation?",
      answer:
        "Sales: +98 914 482 2511 or +98 914 382 0556, or email info@bukanpipe.com. The factory switchboard is +98 44 4643 3444–5. The website's quote form reaches the same unit.",
    },
    {
      question: "Who do I contact for a technical question or a test report?",
      answer:
        "Quality control and laboratory: +98 901 341 4979 or lab@bukanpipe.com. Request the batch test report for a shipment from the same unit.",
    },
  ],
  related: { products: ["water-supply-pipe", "gas-pipe"] },
};

export const enCompanyPages: readonly ContentDocument[] = [
  enAbout,
  enQuality,
  enCertifications,
  enContact,
];
