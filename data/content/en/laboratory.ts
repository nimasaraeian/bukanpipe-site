import type { ContentDocument } from "@/content/models/content-document";

function labPage(
  slug: string,
  title: string,
  seoTitle: string,
  seoDescription: string,
  description: string,
  primaryKeyword: string,
  secondaryKeywords: readonly string[],
  sections: ContentDocument["sections"],
  evidenceStatus: ContentDocument["evidenceStatus"] = "requires-verification",
  faqs?: ContentDocument["faqs"],
): ContentDocument {
  const path = slug ? `/laboratory/${slug}` : "/laboratory";
  return {
    id: slug ? `laboratory-${slug}` : "laboratory-hub",
    slug: slug || "laboratory",
    path,
    locale: "en",
    kind: slug ? "laboratory" : "hub",
    title,
    seoTitle,
    seoDescription,
    description,
    primaryKeyword,
    secondaryKeywords,
    status: "published",
    evidenceStatus,
    verificationStatus: "legacy-claim",
    lastReviewed: "2026-09-03",
    references: ["https://bukanpipe.com/qc-and-laboratory/", "https://bukanpipe.com/lab-scope/"],
    breadcrumbs: slug
      ? [
          { label: "Home", path: "/" },
          { label: "Laboratory", path: "/laboratory" },
          { label: title, path },
        ]
      : [
          { label: "Home", path: "/" },
          { label: "Laboratory", path: "/laboratory" },
        ],
    sections,
    faqs,
    related: {
      laboratory: slug === "iso-17025" ? ["services", "test-scope"] : ["iso-17025"],
      products: ["water-supply-pipe", "gas-pipe"],
    },
  };
}

export const enLaboratoryHub = labPage(
  "",
  "Laboratory & Quality Control",
  "Polyethylene Pipe Testing Laboratory | Bukan Pipe",
  "Polyethylene pipe testing at Bukan Pipe — an independent QC and polymer laboratory holding ISO/IEC 17025, serving production and external customers.",
  "Polymer and PE pipe testing unit.",
  "polyethylene pipe testing",
  ["PE pipe testing laboratory", "polymer testing laboratory", "hydrostatic pressure test"],
  [
    {
      type: "paragraph",
      text: "Luleh Bukan Laboratory is the factory's independent polymer and pipe testing unit. It performs 16 tests across three product families — polyolefin pipes and fittings up to 630 mm, polyethylene pipe, and unplasticized PVC pipe — each to a named national and international method standard. It both monitors production and tests samples commissioned from outside.",
    },
    {
      type: "document-table",
      table: "lab-scope",
      caption: "Laboratory testing scope",
      summary:
        "Each test with its equipment range and method standard. What each test actually catches is explained on the test scope page.",
    },
    { type: "heading", level: 2, text: "Services" },
    {
      type: "list",
      items: [
        "In-line production quality control",
        "Customer-commissioned pipe and polymer testing",
        "Technical training",
        "Tests executed to applicable national and international methods where specified",
      ],
    },
    {
      type: "paragraph",
      text: "Accreditation scope and certificate copies are available from the laboratory on request.",
    },
    {
      type: "internal-links",
      title: "Factory & production",
      links: [
        { label: "Factory Gallery", path: "/gallery" },
        { label: "About Bukan Pipe", path: "/about" },
        { label: "Quality Control & Laboratory", path: "/quality" },
        { label: "Certifications", path: "/certifications" },
      ],
    },
  ],
);

export const enLaboratoryPages: readonly ContentDocument[] = [
  enLaboratoryHub,
  labPage(
    "services",
    "Laboratory Services",
    "PE Pipe Testing Services | Bukan Pipe Laboratory",
    "PE pipe quality testing at Bukan Pipe — mechanical, thermal and pressure tests for production QC and for customer samples, with a test report.",
    "Pipe and polymer test services.",
    "PE pipe quality testing",
    ["hydrostatic pressure test", "polyethylene pipe testing"],
    [
      {
        type: "paragraph",
        text: "The laboratory does two jobs: monitoring the factory's own production, and testing samples commissioned by customers and projects. Both rest on the same basis — the same 16 tests to the same method standards.",
      },
      { type: "heading", level: 2, text: "Testing for external customers" },
      {
        type: "paragraph",
        text: "If you are a contractor, consultant or client wanting an independent check on a delivery, the laboratory accepts samples. The available tests are the ones listed on the test scope page, each with its equipment range and method standard.",
      },
      { type: "heading", level: 2, text: "Before sending a sample" },
      {
        type: "list",
        items: [
          "Material: polyethylene, general polyolefin or unplasticized PVC",
          "Outside diameter and wall thickness of the sample",
          "Which tests you need, or which product standard is to be checked against",
          "The purpose: delivery acceptance, dispute resolution, or supplier assessment",
        ],
      },
      {
        type: "paragraph",
        text: "Sample quantity, storage conditions and lead time depend on the test. Resistance to internal pressure is inherently slow and not comparable with a dimensional check, so confirm with the laboratory before sending anything.",
      },
      {
        type: "internal-links",
        title: "Related",
        links: [
          {
            label: "Test scope",
            path: "/laboratory/test-scope",
            hint: "The full list with ranges and methods",
          },
          { label: "Testing standards", path: "/laboratory/standards" },
          { label: "Technical training", path: "/laboratory/training" },
          { label: "Contact the laboratory", path: "/contact" },
        ],
      },
    ],
  ),
  labPage(
    "iso-17025",
    "ISO/IEC 17025",
    "ISO/IEC 17025 Framework | Bukan Pipe Laboratory",
    "ISO 17025 competence framework — accreditation status requires verified certificate.",
    "ISO/IEC 17025 context.",
    "ISO/IEC 17025 laboratory",
    ["ISO 17025 pipe testing", "accredited polymer laboratory"],
    [
      {
        type: "paragraph",
        text: "ISO/IEC 17025 is the standard for the competence of testing and calibration laboratories. It differs from ISO 9001: ISO 9001 is about how an organisation is run, while 17025 addresses directly whether a laboratory is technically competent to produce a valid result.",
      },
      { type: "heading", level: 2, text: "What 17025 examines" },
      {
        type: "list",
        items: [
          "Technical competence of laboratory staff",
          "Calibration and metrological traceability of measuring equipment",
          "Validation of test methods and estimation of measurement uncertainty",
          "Laboratory environmental conditions and sample handling",
          "Impartiality and confidentiality of results",
        ],
      },
      { type: "heading", level: 2, text: "The point a buyer should know" },
      {
        type: "paragraph",
        text: "17025 accreditation always comes with a scope. No laboratory is accredited in general; it is accredited for a defined list of tests, on defined products, within a defined equipment range. So the right question to ask any laboratory is not \"are you 17025 accredited?\" but \"send me your scope\" — and then check whether the test you actually need is inside it.",
      },
      {
        type: "paragraph",
        text: "The scope of Luleh Bukan Laboratory, with the equipment range and method standard for every test, is published on the test scope page.",
      },
      { type: "heading", level: 2, text: "Accreditation status" },
      {
        type: "paragraph",
        text: "Current accreditation status and a copy of the valid certificate are available from the laboratory at lab@bukanpipe.com. This page does not publish a claim of accreditation without a current certificate on file.",
      },
      {
        type: "internal-links",
        title: "Related",
        links: [
          {
            label: "Test scope",
            path: "/laboratory/test-scope",
            hint: "Every test with its range and method",
          },
          { label: "Testing standards", path: "/laboratory/standards" },
          { label: "Certifications and licences", path: "/certifications" },
        ],
      },
    ],
  ),
  labPage(
    "test-scope",
    "Test Scope",
    "HDPE Pipe Test Scope | Bukan Pipe Laboratory",
    "The HDPE pipe testing laboratory scope at Bukan Pipe — mechanical, thermal, pressure and dimensional tests available on pipe, fittings and raw material.",
    "Laboratory test scope.",
    "HDPE pipe testing laboratory",
    ["PE pipe quality testing", "hydrostatic pressure test"],
    [
      {
        type: "paragraph",
        text: "The laboratory works on three product families — polyolefin pipes and fittings from 16 to 630 mm, polyethylene pipe, and unplasticized PVC pipe — performing 16 tests in total, each to a named national and international method standard. The table gives every test with its equipment range and reference.",
      },
      {
        type: "document-table",
        table: "lab-scope",
        caption: "Accreditation scope of Luleh Bukan Laboratory",
        summary:
          "The ranges are the real capability of the equipment: internal pressure to 100 bar and dimensional measurement to 850 mm outside diameter, beyond the largest diameter the factory produces.",
      },
      { type: "heading", level: 2, text: "What each test catches" },
      {
        type: "paragraph",
        text: "The list is not arbitrary; each test targets a specific failure. Dimensional measurement and resistance to internal pressure check that the pipe matches the pressure class it claims. MFR and density show the raw material is what it was said to be. Carbon black content and dispersion only mean something together — black that is not evenly dispersed does not protect the pipe against UV even at the right percentage. OIT measures the thermal stability of the compound and therefore its long-term life, and longitudinal reversion shows whether extrusion stresses were properly relieved or are still locked in the pipe.",
      },
      { type: "heading", level: 2, text: "What to ask of a test report" },
      {
        type: "paragraph",
        text: "For any delivery, request the test report for that production batch. A report giving only the test name and the word \"pass\" cannot be assessed; it needs the method (standard number), the test conditions and the numerical result.",
      },
      {
        type: "internal-links",
        title: "Related",
        links: [
          { label: "Laboratory services", path: "/laboratory/services" },
          { label: "Testing standards", path: "/laboratory/standards" },
          { label: "Quality control", path: "/quality" },
          { label: "Contact the laboratory", path: "/contact" },
        ],
      },
    ],
  ),
  labPage(
    "standards",
    "Testing Standards",
    "PE Pipe Testing Standards | Bukan Pipe",
    "Polyethylene pipe testing standards — the INSO and ISO references the Bukan Pipe laboratory works to in test method and reporting.",
    "Test method standards.",
    "polyethylene pipe testing standards",
    ["INSO pipe testing", "ISO PE pipe test methods"],
    [
      {
        type: "paragraph",
        text: "Every test is reported against a defined method and reference standard — and that distinction matters: a product standard says what properties the pipe must have, a method standard says how to measure that property. The laboratory works with the second kind.",
      },
      { type: "heading", level: 2, text: "Two kinds of standard, routinely confused" },
      {
        type: "spec-table",
        title: "Product standard versus test method standard",
        rows: [
          {
            label: "Product standard",
            value: "Such as INSO 14427-2 for water supply or INSO 11223 for gas. It fixes the dimensions, strength and marking the pipe must have. The standard mark licence rests on this — mandatory for water supply, an incentive (voluntary) mark for gas.",
          },
          {
            label: "Test method standard",
            value: "Such as ISO 1167 for internal pressure or ISO 1133 for MFR. It fixes the apparatus, conditions and calculation by which the property is measured. A test report cites these.",
          },
        ],
        note: "A usable test report cites the method standard number, not just the name of the test.",
      },
      { type: "heading", level: 2, text: "The references the laboratory works to" },
      {
        type: "paragraph",
        text: "The laboratory's tests cite Iranian national standards (INSO and ISIRI) and their international equivalents in ISO, with one EN reference. In most cases the national standard is a transposition of the ISO one and both numbers appear in the report — INSO 6980-1 and ISO 1133-1 for MFR, for example.",
      },
      {
        type: "document-table",
        table: "lab-scope",
        caption: "Method standard for each test, by product",
        summary:
          "The last column is the method standard the result is reported against. Those same numbers should appear on the test report for your own delivery.",
      },
      { type: "heading", level: 2, text: "Why one test carries two numbers" },
      {
        type: "paragraph",
        text: "Where the table shows two or more numbers together, one is usually the national standard and the other its international equivalent, or the method is published in parts. Resistance to internal pressure has two: ISO 1167-1 for the general method and ISO 1167-2 for pipes specifically. Both appear on the report.",
      },
      {
        type: "internal-links",
        title: "Related",
        links: [
          { label: "Test scope", path: "/laboratory/test-scope" },
          {
            label: "Water supply pipe guide",
            path: "/technical-center/water-supply-polyethylene-pipe-guide",
            hint: "Product standards, not methods",
          },
          { label: "Certifications and licences", path: "/certifications" },
        ],
      },
    ],
    "candidate",
  ),
  labPage(
    "training",
    "Technical Training",
    "HDPE Pipe Technical Training | Bukan Pipe",
    "HDPE pipe welding training — butt fusion, electrofusion and quality control courses at the Bukan Pipe laboratory; arranged through the factory.",
    "PE pipe training.",
    "HDPE pipe welding training",
    ["PE fusion training", "pipe QC training"],
    [
      {
        type: "paragraph",
        text: "The Bukan Pipe training unit holds an inter-workshop training centre licence, number 14/11221, from the Technical and Vocational Training Organization (Ministry of Cooperatives, Labour and Social Welfare). It was issued on 1404/07/23 in the Iranian calendar and runs for five years. Its legal basis is Note 2 of Article 110 of the Labour Law and the regulations governing adjacent-workshop and inter-workshop training centres.",
      },
      { type: "heading", level: 2, text: "What an inter-workshop centre means" },
      {
        type: "paragraph",
        text: "An adjacent-workshop centre trains the staff of its own factory. An inter-workshop licence permits training for employees of other industrial units in the province as well. The practical difference is that another contractor or employer can send their own people here.",
      },
      { type: "heading", level: 2, text: "Why welding training is taken seriously in polyethylene" },
      {
        type: "paragraph",
        text: "On a PE line the joint is where failure starts, and a defective weld usually looks sound. The commonest cause is releasing the clamp before the cooling time has elapsed — the joint appears correct but fusion is incomplete. This is why, in gas networks, welder qualification and a weld record are part of the requirements for handing over the line rather than a formality.",
      },
      { type: "heading", level: 2, text: "Related subject matter" },
      {
        type: "list",
        items: [
          "Butt fusion: parameters, surface preparation, alignment and cooling time",
          "Electrofusion: scraping the oxide layer, seating the fitting and keeping the assembly undisturbed",
          "Visual inspection of joints and recognition of common defects",
          "Pipe quality control: dimensional inspection and laboratory testing",
          "Safety around fusion equipment and in the trench",
        ],
      },
      {
        type: "paragraph",
        text: "Syllabus, course length and enrolment terms depend on the group and are arranged through factory contact.",
      },
      {
        type: "internal-links",
        title: "Related",
        links: [
          { label: "HDPE pipe welding", path: "/technical-center/polyethylene-pipe-welding" },
          { label: "HDPE installation guide", path: "/technical-center/hdpe-installation-guide" },
          { label: "Certifications and licences", path: "/certifications" },
          { label: "Contact the factory", path: "/contact" },
        ],
      },
    ],
    "candidate",
    [
      {
        question: "Is Bukan Pipe's training licensed?",
        answer:
          "Yes. The training unit holds inter-workshop training centre licence 14/11221 from the Technical and Vocational Training Organization, issued on 1404/07/23 with a five-year validity.",
      },
      {
        question: "Can staff from other companies attend?",
        answer:
          "Yes. The licence is of the inter-workshop type, which permits training for employees of other industrial units in the province, not only the factory's own staff.",
      },
      {
        question: "What does a polyethylene welding course cover?",
        answer:
          "Butt fusion and electrofusion, surface preparation and cooling time, visual inspection of joints and recognition of common defects, pipe quality control, and safety. Exact syllabus and course length depend on the group.",
      },
    ],
  ),
];
