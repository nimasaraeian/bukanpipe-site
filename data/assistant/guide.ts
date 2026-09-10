import { assertAssistantPath } from "./routes";
import type { Locale } from "@/lib/i18n/config";

export type GuideDestination = {
  id: string;
  path: string;
  labelFa: string;
  labelEn: string;
  keywords: readonly string[];
};

export type GuideSection = {
  id: "products" | "technical" | "company" | "sales";
  titleFa: string;
  titleEn: string;
  destinations: readonly GuideDestination[];
};

function dest(
  id: string,
  path: string,
  labelFa: string,
  labelEn: string,
  keywords: readonly string[],
): GuideDestination {
  assertAssistantPath(path);
  return { id, path, labelFa, labelEn, keywords };
}

export const guideSections: readonly GuideSection[] = [
  {
    id: "products",
    titleFa: "محصولات",
    titleEn: "Products",
    destinations: [
      dest("water", "/products/water-supply-pipe", "لوله آبرسانی", "Water Supply Pipes", [
        "water",
        "supply",
        "آبرسانی",
        "آب",
      ]),
      dest("gas", "/products/gas-pipe", "لوله گاز", "Gas Pipes", ["gas", "گاز", "گازرسانی"]),
      dest("irrigation", "/products/irrigation-pipe", "لوله آبیاری", "Irrigation Pipes", [
        "irrigation",
        "agriculture",
        "آبیاری",
        "کشاورزی",
      ]),
      dest("industrial", "/products/industrial-pipe", "لوله صنعتی", "Industrial Pipes", [
        "industrial",
        "صنعتی",
        "صنعت",
      ]),
    ],
  },
  {
    id: "technical",
    titleFa: "مرکز فنی",
    titleEn: "Technical Center",
    destinations: [
      dest("pe100-guide", "/technical-center/pe100-technical-guide", "راهنمای PE100", "PE100 Guide", [
        "pe100",
        "pe 100",
        "راهنمای فنی",
        "mrs",
      ]),
      dest("install", "/technical-center/hdpe-installation-guide", "راهنمای نصب", "Installation Guide", [
        "installation",
        "install",
        "welding",
        "نصب",
        "جوش",
      ]),
      dest("tools", "/calculator", "ابزار مهندسی", "Engineering Tools", [
        "calculator",
        "tools",
        "engineering",
        "ماشین حساب",
        "محاسبات",
      ]),
    ],
  },
  {
    id: "company",
    titleFa: "شرکت",
    titleEn: "Company",
    destinations: [
      dest("about", "/about", "درباره بوکان پایپ", "About Bukan Pipe", ["about", "company", "factory", "درباره", "کارخانه"]),
      dest("quality", "/laboratory", "کیفیت و آزمایشگاه", "Quality & Laboratory", [
        "quality",
        "laboratory",
        "lab",
        "کیفیت",
        "آزمایشگاه",
      ]),
      dest("certs", "/certifications", "گواهینامه‌ها", "Certifications", [
        "certification",
        "certificate",
        "iso",
        "گواهینامه",
      ]),
    ],
  },
  {
    id: "sales",
    titleFa: "فروش",
    titleEn: "Sales",
    destinations: [
      dest("quote", "/request-quote", "استعلام قیمت", "Request Quote", ["quote", "rfq", "استعلام", "قیمت"]),
      dest("contact", "/contact", "تماس با فروش", "Contact Sales", ["contact", "sales", "phone", "تماس", "فروش"]),
      dest("catalog", "/downloads", "دانلود کاتالوگ", "Download Catalog", [
        "catalog",
        "download",
        "brochure",
        "کاتالوگ",
        "دانلود",
      ]),
    ],
  },
] as const;

/** First-click destinations after opening the guide (max two clicks from launcher). */
export const priorityDestinations: readonly GuideDestination[] = [
  dest("quick-products", "/products", "محصولات", "Products", ["products", "catalog", "محصولات"]),
  dest("quick-tech", "/technical-center", "مرکز فنی", "Technical Center", ["technical", "guide", "فنی"]),
  dest("quick-quote", "/request-quote", "استعلام قیمت", "Request Quote", ["quote", "rfq", "استعلام", "قیمت"]),
  dest("quick-contact", "/contact", "تماس با فروش", "Contact Sales", [
    "contact",
    "sales",
    "phone",
    "تماس",
    "فروش",
  ]),
];

/** Extra searchable destinations that should surface for queries like PE100. */
export const extraSearchDestinations: readonly GuideDestination[] = [
  dest("pe100-product", "/products/pe100-pipe", "لوله PE100", "PE100 Pipe Product Page", [
    "pe100",
    "pe 100",
    "hdpe",
  ]),
  dest(
    "pe-pillar",
    "/polyethylene-pipe",
    "راهنمای لوله پلی‌اتیلن",
    "Polyethylene Pipe Guide",
    ["pe100", "polyethylene", "hdpe", "پلی اتیلن"],
  ),
  dest("standards", "/standards", "استانداردها", "Standards Page", ["pe100", "standard", "iso", "استاندارد"]),
  dest("tech-hub", "/technical-center", "مرکز فنی", "Technical Center", ["technical", "guide", "فنی"]),
  dest("products-hub", "/products", "همه محصولات", "All Products", ["products", "catalog", "محصولات"]),
];

export function getGuideSections(): readonly GuideSection[] {
  return guideSections;
}

export function getPriorityDestinations(): readonly GuideDestination[] {
  return priorityDestinations;
}

export function getGuideDestinationLabel(destination: GuideDestination, locale: Locale): string {
  return locale === "fa" ? destination.labelFa : destination.labelEn;
}

export function getGuideSectionTitle(section: GuideSection, locale: Locale): string {
  return locale === "fa" ? section.titleFa : section.titleEn;
}

export function getAllGuideDestinations(): GuideDestination[] {
  return [
    ...priorityDestinations,
    ...guideSections.flatMap((section) => section.destinations),
    ...extraSearchDestinations,
  ];
}
