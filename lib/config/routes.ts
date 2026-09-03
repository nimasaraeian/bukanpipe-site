import type { CtaType } from "@/lib/config/cta";
import type { EvidenceStatus } from "@/content/models/shared";

export type RouteLifecycle = "implemented" | "planned" | "deferred";

export type RouteDefinition = {
  path: string;
  title: string;
  purpose: string;
  seoDescription: string;
  lifecycle: RouteLifecycle;
  includeInSitemap: boolean;
  primaryCta: CtaType;
};

export type PlannedRoute = {
  path: string;
  title: string;
  parentPath: string;
  evidenceStatus: EvidenceStatus;
  primaryCta: CtaType;
  notes: string;
};

export const routes = {
  home: {
    path: "/",
    title: "Home",
    purpose:
      "Platform entry point. Future phases: positioning, proof, product and engineering paths, and quote conversion.",
    seoDescription:
      "Bukan Pipe digital platform foundation. This is a development build, not the final factory site.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  products: {
    path: "/products",
    title: "Products",
    purpose:
      "Product discovery hub and technical specifications. Product records are added only after factory data is verified.",
    seoDescription:
      "Bukan Pipe products development route. Verified catalog and specifications are not published yet.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  solutions: {
    path: "/solutions",
    title: "Solutions",
    purpose:
      "Integrated HDPE system packages — pipe supply, fusion readiness, engineering support and project-scale delivery.",
    seoDescription:
      "Bukan Pipe engineered HDPE solutions for water, agriculture and industrial pipeline networks.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  industries: {
    path: "/industries",
    title: "Industries",
    purpose:
      "Industry-specific pipeline applications — water infrastructure, agriculture, industrial process and distribution networks.",
    seoDescription:
      "HDPE pipe applications by industry sector. Content publishes after product and market verification.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VIEW_PRODUCT",
  },
  applications: {
    path: "/applications",
    title: "Applications",
    purpose:
      "Legacy applications hub — redirects to industry sectors. Subsections publish only for verified use cases.",
    seoDescription:
      "Bukan Pipe polyethylene pipe applications. See Industries for sector-specific content.",
    lifecycle: "implemented",
    includeInSitemap: false,
    primaryCta: "VIEW_PRODUCT",
  },
  laboratory: {
    path: "/laboratory",
    title: "Quality",
    purpose:
      "Laboratory as a trust asset and intake channel. Accreditation claims publish only after certificate verification.",
    seoDescription:
      "Bukan Pipe laboratory development route. Accreditation status and test scope are not published as fact yet.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_LAB_TEST",
  },
  projects: {
    path: "/projects",
    title: "Projects",
    purpose:
      "Case studies with publication permission. No project or client name is created without evidence.",
    seoDescription:
      "Bukan Pipe projects development route. Case studies are added only after evidence and publication approval.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  engineering: {
    path: "/engineering",
    title: "Engineering",
    purpose:
      "Evergreen technical decision reference: SDR, PN, PE80/PE100, welding and installation. Separate from product and knowledge pages.",
    seoDescription:
      "Bukan Pipe engineering reference development route. Technical guides publish after source verification.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VIEW_PRODUCT",
  },
  standards: {
    path: "/standards",
    title: "Standards",
    purpose:
      "Standards and product compliance documents. Lists are populated only from verified sources.",
    seoDescription:
      "Bukan Pipe standards development route. No unverified standards or certificates are listed in this phase.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VIEW_STANDARD",
  },
  knowledge: {
    path: "/knowledge",
    title: "Knowledge Center",
    purpose:
      "Supporting articles that do not own product or engineering search intent. Thin content is not permitted.",
    seoDescription:
      "Bukan Pipe knowledge center development route. Articles are added after classification and source approval.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VIEW_PRODUCT",
  },
  pricing: {
    path: "/pricing",
    title: "Pricing",
    purpose:
      "Pricing transparency hub (factors affecting price), not a stale price table. Primary conversion is quote request.",
    seoDescription:
      "Bukan Pipe pricing information development route. No price figures are published in this phase.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  tools: {
    path: "/tools",
    title: "Engineering Tools",
    purpose:
      "Calculator and selection hub. Tools are built in later phases and link to engineering guides.",
    seoDescription:
      "Bukan Pipe engineering tools development route. Calculators are not implemented yet.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "USE_TOOL",
  },
  requestQuote: {
    path: "/request-quote",
    title: "Request a Quote",
    purpose:
      "Sales engine: structured inquiry. Backend and final form are built in the RFQ phase.",
    seoDescription:
      "Bukan Pipe request quote development route. The commercial form is not active yet.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "REQUEST_QUOTE",
  },
  dealers: {
    path: "/dealers",
    title: "Dealers",
    purpose:
      "Official sales channel directory. Listing publishes only after factory approval. Verification at /verify.",
    seoDescription:
      "Bukan Pipe dealers development route. Official dealer list has not been received from the factory yet.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VERIFY_DEALER",
  },
  verify: {
    path: "/verify",
    title: "Verify Dealer",
    purpose:
      "Future dealer identity or authorization verification experience. Verification logic and database are not implemented in this phase.",
    seoDescription:
      "Bukan Pipe dealer verification development route. The verification system is not active yet.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "VERIFY_DEALER",
  },
  about: {
    path: "/about",
    title: "Company",
    purpose:
      "Factory identity after legal name, history and documents are verified. Fabricated statistics are not used.",
    seoDescription:
      "About Bukan Pipe development route. Legal and historical details are not verified yet.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "CONTACT_SALES",
  },
  contact: {
    path: "/contact",
    title: "Contact",
    purpose:
      "Verified contact channels. Phone, address and form are added only after factory approval.",
    seoDescription:
      "Bukan Pipe contact development route. Operational contact details are not registered in this phase.",
    lifecycle: "implemented",
    includeInSitemap: true,
    primaryCta: "CONTACT_SALES",
  },
} as const satisfies Record<string, RouteDefinition>;

export const publicRoutes: readonly RouteDefinition[] = [
  routes.home,
  routes.products,
  routes.solutions,
  routes.industries,
  routes.applications,
  routes.laboratory,
  routes.projects,
  routes.engineering,
  routes.standards,
  routes.knowledge,
  routes.pricing,
  routes.tools,
  routes.requestQuote,
  routes.dealers,
  routes.verify,
  routes.about,
  routes.contact,
];

export const sitemapRoutes: readonly RouteDefinition[] = publicRoutes.filter(
  (route) => route.includeInSitemap,
);

export const plannedRoutes: readonly PlannedRoute[] = [
  {
    path: "/products/gas-pipe",
    title: "Gas distribution pipe",
    parentPath: "/products",
    evidenceStatus: "candidate",
    primaryCta: "REQUEST_QUOTE",
    notes: "Legacy /gas-pipe/ URL confirmed. Current production, standard and gas license not verified yet.",
  },
  {
    path: "/products/water-pipe",
    title: "Water supply pipe",
    parentPath: "/products",
    evidenceStatus: "candidate",
    primaryCta: "REQUEST_QUOTE",
    notes: "Referenced in strategy and legacy about page. Current catalog not verified.",
  },
  {
    path: "/products/irrigation-pipe",
    title: "Irrigation pipe",
    parentPath: "/products",
    evidenceStatus: "candidate",
    primaryCta: "REQUEST_QUOTE",
    notes: "Strategic agriculture cluster. Page builds only after product verification.",
  },
  {
    path: "/products/pe100",
    title: "PE100 pipe",
    parentPath: "/products",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_QUOTE",
    notes: "Strategic keyword destination. PE100 production must be confirmed by factory.",
  },
  {
    path: "/products/sewer-pipe",
    title: "Sewer pipe",
    parentPath: "/products",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_QUOTE",
    notes: "Build only if real product is verified.",
  },
  {
    path: "/applications/water-supply",
    title: "Water supply",
    parentPath: "/applications",
    evidenceStatus: "candidate",
    primaryCta: "VIEW_PRODUCT",
    notes: "Application intent, not catalog. Related product must be verified separately.",
  },
  {
    path: "/applications/agriculture",
    title: "Agriculture",
    parentPath: "/applications",
    evidenceStatus: "candidate",
    primaryCta: "VIEW_PRODUCT",
    notes: "Regional vertical hub in strategy. Current product capability not verified.",
  },
  {
    path: "/applications/irrigation",
    title: "Pressurized irrigation",
    parentPath: "/applications",
    evidenceStatus: "candidate",
    primaryCta: "VIEW_PRODUCT",
    notes: "Merge with agriculture if no distinct content.",
  },
  {
    path: "/applications/gas-distribution",
    title: "Gas distribution",
    parentPath: "/applications",
    evidenceStatus: "candidate",
    primaryCta: "VIEW_PRODUCT",
    notes: "Gas network application intent. Commercial product keyword owner is /products/gas-pipe.",
  },
  {
    path: "/applications/industrial",
    title: "Industrial",
    parentPath: "/applications",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "Page depends on verified industrial application and product.",
  },
  {
    path: "/applications/sewage",
    title: "Sewage and drainage",
    parentPath: "/applications",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "Only after related product is verified.",
  },
  {
    path: "/engineering/sdr",
    title: "What is SDR",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "Evergreen guide. Technical source must be specified; product claim not required.",
  },
  {
    path: "/engineering/pn",
    title: "What is PN",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "Working pressure covered on this page. No separate pressure route.",
  },
  {
    path: "/engineering/pe80-vs-pe100",
    title: "PE80 vs PE100",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "Comparison intent owner. Commercial PE100 owner is product page.",
  },
  {
    path: "/engineering/pipe-sizing",
    title: "Pipe diameter selection",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "USE_TOOL",
    notes: "Informational intent. Calculation intent goes to /tools/pipe-sizing.",
  },
  {
    path: "/engineering/pressure-loss",
    title: "Pressure loss",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "USE_TOOL",
    notes: "Guide. Separate calculator at /tools/pressure-loss.",
  },
  {
    path: "/engineering/welding",
    title: "Polyethylene welding",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "Welding hub includes butt fusion and electrofusion as sections.",
  },
  {
    path: "/engineering/installation",
    title: "Installation",
    parentPath: "/engineering",
    evidenceStatus: "requires-verification",
    primaryCta: "VIEW_PRODUCT",
    notes: "Installation and storage can remain in this cluster.",
  },
  {
    path: "/laboratory/services",
    title: "Laboratory services",
    parentPath: "/laboratory",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_LAB_TEST",
    notes: "External services only after scope and customer access are verified.",
  },
  {
    path: "/laboratory/tests",
    title: "Tests",
    parentPath: "/laboratory",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_LAB_TEST",
    notes: "Test list. Individual pages only for verified tests.",
  },
  {
    path: "/laboratory/accreditation",
    title: "Accreditation",
    parentPath: "/laboratory",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_LAB_TEST",
    notes: "Certificate, number, reference, validity and scope must be current.",
  },
  {
    path: "/laboratory/request-test",
    title: "Request a test",
    parentPath: "/laboratory",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_LAB_TEST",
    notes: "Laboratory service conversion. Form in next phase.",
  },
  {
    path: "/tools/pipe-sizing",
    title: "Diameter calculator",
    parentPath: "/tools",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_QUOTE",
    notes: "Tool intent owner for diameter calculation.",
  },
  {
    path: "/tools/pressure-loss",
    title: "Pressure loss calculator",
    parentPath: "/tools",
    evidenceStatus: "requires-verification",
    primaryCta: "REQUEST_QUOTE",
    notes: "Tool intent owner for pressure loss calculation.",
  },
];

export const deferredRoutes = {
  export: {
    path: "/export",
    reason:
      "Export after commercial capability is verified and after the English layer is complete. No public page is built.",
  },
  exportIraq: {
    path: "/export/iraq",
    reason: "Iraq landing only after commercial validation and export documentation.",
  },
} as const;
