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
    "Bukan Pipe makes single-wall HDPE and PE100 pipe from 16 mm to 630 mm, pressure rating 2.5 to 25 bar, for water, gas, agriculture and industry in West Azerbaijan.",
  description:
    "Single-wall HDPE and PE100 polyethylene pipe for water, gas, agriculture and industrial networks — manufactured in Bukan, West Azerbaijan.",
  primaryKeyword: "HDPE pipe manufacturer",
  secondaryKeywords: ["polyethylene pipe manufacturer", "PE pipe manufacturer", "Bukan Pipe"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-26",
  references: ["https://bukanpipe.com/about_us/"],
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "The company was registered in 1373 in the Iranian calendar (1994) under registration number 121, and the factory was established in 1376 (1997) with machinery purchased from Cincinnati of Austria, starting out on two production lines. It has grown steadily since, and today runs seven production lines with a nominal capacity of 14,000 tonnes a year, manufacturing single-wall polyethylene pipe in Bukan, West Azerbaijan, from 16 mm to 630 mm, pressure rating 2.5 to 25 bar (depending on grade and SDR), in PE80 and PE100.",
    },
    {
      type: "paragraph",
      text: "That growth has been recognised by the bodies that assess the industry. The Agricultural Jihad Organization ranks Bukan Pipe in grade A among polyethylene pipe producers; it has been recognised at national level too, most recently as a top national cooperative in 1405 (2026). The full list of titles and licences is set out under Quality record below. Pipe is supplied directly from the factory to contractors, consulting engineers and infrastructure project owners.",
    },
    { type: "heading", level: 2, text: "Registration details" },
    {
      type: "spec-table",
      title: "Official identifiers",
      rows: [
        { label: "Founded", value: "1373 (1994) — registration 121, dated 1373/06/26" },
        { label: "Operations began", value: "1376 (1997)" },
        { label: "National ID", value: "10220007922" },
        { label: "Industrial operating licence", value: "113/7/256493 — Ministry of Industry, Mine and Trade" },
        { label: "Trademark", value: "LB Bukan Pipe — registration 370560" },
        { label: "Factory address", value: "10th km of Bukan–Miandoab road, Bukan, West Azerbaijan" },
        { label: "Postal code", value: "5955164341" },
      ],
      note: "These identifiers appear on the industrial operating licence and the company's other official documents, and can be verified independently.",
    },
    { type: "heading", level: 2, text: "Licensed capacity" },
    {
      type: "paragraph",
      text: "Production today runs on seven extrusion lines with a nominal capacity of 14,000 tonnes a year — the same total the industrial operating licence sets out per product, on three shifts. This is the capacity ceiling rather than output in any particular year.",
    },
    {
      type: "document-table",
      table: "capacity",
      caption: "Annual capacity stated on the industrial operating licence",
    },
    { type: "heading", level: 2, text: "Ministry of Agriculture producer ranking" },
    {
      type: "paragraph",
      text: "On the official list of heavy-duty HD polyethylene water supply pipe producers published by the Ministry of Agriculture's modern irrigation systems programme, Bukan Pipe holds rank A with a score of 92 out of 100, for 20 to 630 mm, valid to 1406/10/12. The list, as reported on 1404/04/17, covered 126 producers, 62 of which held rank A.",
    },
    { type: "heading", level: 2, text: "Quality record" },
    {
      type: "definition",
      term: "Latest national title — 1405 (2026)",
      text: "In Shahrivar 1405 (September 2026) the Ministry of Cooperatives, Labour and Social Welfare named Bukan Pipe a top national cooperative.",
    },
    {
      type: "paragraph",
      text: "Bukan Pipe's quality record is not one plaque; it has been repeated over two decades by different assessing bodies. At national level, the latest title is top national cooperative, awarded by the Ministry of Cooperatives, Labour and Social Welfare in 1405 (2026). Before that, in 1393 (2014) the Iranian National Standards Organization named the factory both a national model quality unit and the maker of a superior-quality polyethylene pipe; in 1397 (2018) the same ministry commended it as a cooperative at national level; and in 1381 (2002) the National Petrochemical Company named it a model customer. At provincial level it was named a model quality unit in 1388, 1390, 1395, 1396 and 1397, and a model industrial unit in 1384, 1385, 1386, 1387 and 1388 and again in 1397; in 1391 its quality control manager was named the province's model quality control manager. It is that repetition across successive inspections that shows quality holding steady.",
    },
    {
      type: "paragraph",
      text: "Alongside quality, the company was a top provincial cooperative in 1388, 1392, 1398 and 1399, and a provincial model exporter in 1389, 1391 and 1393. Behind that record are the factory's licences: the mandatory standard mark licence to INSO 7607 (lateral irrigation) since 1380 (2001), the mandatory standard mark licence to INSO 14427-2 (pressure water supply, sewerage and drainage) since 1390 (2011) and the incentive (voluntary) standard mark licence for gas to INSO 11223 since 1391 (2012); together with a research and development licence from the Ministry of Industry, Mine and Trade since 1396 (2017) and membership of the Polyethylene Pipe and Fittings Manufacturers' Association. The full list of awards and documents, with issuer and year, is on the certifications page.",
    },
    { type: "heading", level: 2, text: "Primary applications" },
    {
      type: "list",
      items: [
        "Lateral irrigation — mandatory standard mark licence to INSO 7607, since 1380 (2001)",
        "Municipal and rural water supply, pressurised irrigation and industrial water transfer — mandatory standard mark licence to INSO 14427-2, since 1390 (2011)",
        "Gas service connections and distribution networks — incentive (voluntary) standard mark licence to INSO 11223, since 1391 (2012)",
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
        {
          label: "Complete polyethylene pipe guide",
          path: "/technical-center/polyethylene-pipe-complete-guide",
          hint: "Grade, SDR, standards and buying",
        },
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
      text: "ISO 9001 certifies that the production and control process is documented, followed and audited. It says nothing about whether a particular pipe conforms to the standard for its application — that is the job of the standard mark licence and the batch test report. Ask for both separately when ordering.",
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
        {
          label: "Complete polyethylene pipe guide",
          path: "/technical-center/polyethylene-pipe-complete-guide",
          hint: "Grade, SDR, standards and buying",
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
        "ISO 9001 covers the factory's management system and certifies that production and control are documented and audited. Conformity of a given pipe to the standard for its application is shown by the standard mark licence and the batch test report. Ask for both separately when ordering.",
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
    "Bukan Pipe certifications with numbers and issuers — INSO 14427-2, 11223 and 7607 standard mark licences, ISO 9001, 14001, 45001 and the industrial operating licence.",
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
      text: "For drinking water networks in Iran, the document that actually decides whether a pipe may be used is the mandatory standard mark licence for that specific application — not a management system certificate. For gas, the standard mark is an incentive (voluntary) one and sits alongside qualification with the National Iranian Gas Company. The tables below give both, each with its number, issuing body and exact scope, so any of them can be verified independently.",
    },
    { type: "heading", level: 2, text: "Standard mark licences" },
    {
      type: "paragraph",
      text: "These are issued by the Iranian National Standards Organization: two mandatory licences — INSO 7607 for lateral irrigation since 1380 (2001), and INSO 14427-2 for pressure water supply, sewerage and drainage since 1390 (2011) — and one incentive (voluntary) licence, INSO 11223 for gas, since 1391 (2012). Each covers only the application named in its scope. A water supply licence is not an authorisation to produce gas pipe, and the reverse is equally true.",
    },
    {
      type: "document-table",
      table: "standard-mark",
      caption: "Standard mark licences — two mandatory, one incentive",
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
      type: "definition",
      term: "Latest national title — 1405 (2026)",
      text: "In Shahrivar 1405 (September 2026) the Ministry of Cooperatives, Labour and Social Welfare named Bukan Pipe a top national cooperative.",
    },
    {
      type: "paragraph",
      text: "Alongside the licences, the factory has been recognised by government bodies over two decades. The national titles, newest first: top national cooperative from the Ministry of Cooperatives, Labour and Social Welfare (1405, 2026); commended cooperative at national level from the same ministry (1397); national model quality unit and superior product quality for polyethylene pipe from the Iranian National Standards Organization (both 1393); and model customer of the National Petrochemical Company (1381). The one that carries most weight for a pipe buyer is the Iranian National Standards Organization's \"model quality unit\" award — national in 1393 and provincial in 1388, 1390, 1395, 1396 and 1397. Provincial model industrial unit (1384–1388 and 1397), top provincial cooperative (1388, 1392, 1398 and 1399) and provincial model quality control manager (1391) complete the list. A title repeated across consecutive years says something a single plaque does not: that quality held up across successive inspections.",
    },
    {
      type: "paragraph",
      text: "The archive holds 48 plaques. The table lists the 27 whose year and issuing body are printed on the document and legible. The rest are deliberately absent — a year inferred from a filename is not a date, and a second scan of the same plaque is not a second award. Seven further titles — model industrial unit 1385 to 1388, top provincial cooperative 1388 and 1392, and model quality control manager 1391 — appear in the company's official catalogue but their plaques are not in the archive; the table marks them as such.",
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
          hint: "What INSO 11223 requires",
        },
        {
          label: "Complete polyethylene pipe guide",
          path: "/technical-center/polyethylene-pipe-complete-guide",
          hint: "Grade, SDR, standards and buying",
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
        "Two mandatory licences and one incentive licence: the mandatory standard mark licence to INSO 7607 for lateral irrigation (since 1380); the mandatory licence to INSO 14427-2 for pressure water supply, sewerage and drainage (since 1390); and the incentive (voluntary) standard mark licence for gas to INSO 11223 (since 1391). Each licence covers only its own application.",
    },
    {
      question: "How is a standard mark licence different from ISO 9001?",
      answer:
        "The standard mark licence is about the product — it certifies conformity to the national standard for that application; it is mandatory for water supply and an incentive (voluntary) mark for gas. ISO 9001 is about the factory's management system and does not substitute for it.",
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
        { label: "Postal code", value: "5955164341" },
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
        "On the 10th km of the Bukan–Miandoab road, Bukan, West Azerbaijan province, Iran, postal code 5955164341.",
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
