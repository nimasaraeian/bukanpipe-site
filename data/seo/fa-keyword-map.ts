/** Persian keyword map — URL → primary → secondary → search intent. FA SEO only. */
export type FaSearchIntent = "commercial" | "informational" | "transactional" | "navigational";

export type FaKeywordMapEntry = {
  path: string;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  intent: FaSearchIntent;
  cluster: "commercial" | "technical" | "application" | "brand";
};

export const faKeywordMap: readonly FaKeywordMapEntry[] = [
  {
    path: "/",
    primaryKeyword: "تولید کننده لوله پلی اتیلن",
    secondaryKeywords: [
      "کارخانه تولید لوله پلی اتیلن",
      "تولید کننده لوله HDPE",
      "تولید کننده لوله PE100",
    ],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/about",
    primaryKeyword: "کارخانه تولید لوله پلی اتیلن",
    secondaryKeywords: [
      "تولید کننده لوله پلی اتیلن",
      "تامین کننده لوله پلی اتیلن",
      "خرید لوله پلی اتیلن از کارخانه",
    ],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/products",
    primaryKeyword: "خرید لوله پلی اتیلن از کارخانه",
    secondaryKeywords: ["تامین کننده لوله پلی اتیلن", "تولید کننده لوله HDPE", "لوله پلی اتیلن PE100"],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/request-quote",
    primaryKeyword: "قیمت لوله پلی اتیلن",
    secondaryKeywords: ["خرید لوله پلی اتیلن", "سفارش لوله پلی اتیلن", "استعلام لوله پلی اتیلن"],
    intent: "transactional",
    cluster: "commercial",
  },
  {
    path: "/products/water-supply-pipe",
    primaryKeyword: "لوله پلی اتیلن آبرسانی",
    secondaryKeywords: ["لوله انتقال آب پلی اتیلن", "لوله HDPE آبرسانی", "INSO 14427-2"],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/products/gas-pipe",
    primaryKeyword: "لوله پلی اتیلن گاز",
    secondaryKeywords: ["لوله گازرسانی پلی اتیلن", "لوله PE گاز", "INSO 11233"],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/products/irrigation-pipe",
    primaryKeyword: "لوله آبیاری پلی اتیلن",
    secondaryKeywords: ["لوله پلی اتیلن کشاورزی", "لوله آبیاری فشار قوی"],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/products/industrial-pipe",
    primaryKeyword: "لوله پلی اتیلن صنعتی",
    secondaryKeywords: ["لوله HDPE صنعتی", "لوله فرآیند پلی اتیلن"],
    intent: "commercial",
    cluster: "application",
  },
  {
    path: "/products/pe100-pipe",
    primaryKeyword: "لوله پلی اتیلن PE100",
    secondaryKeywords: ["تولید کننده لوله PE100", "لوله HDPE PE100"],
    intent: "commercial",
    cluster: "technical",
  },
  {
    path: "/polyethylene-pipe",
    primaryKeyword: "لوله پلی اتیلن",
    secondaryKeywords: ["لوله HDPE چیست", "SDR لوله پلی اتیلن", "PN لوله پلی اتیلن", "خرید لوله پلی اتیلن"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/hdpe-pipe-what-is",
    primaryKeyword: "لوله HDPE چیست",
    secondaryKeywords: ["تفاوت HDPE و PE", "لوله پلی اتیلن چگونه کار می‌کند"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/pe80-vs-pe100",
    primaryKeyword: "تفاوت PE80 و PE100",
    secondaryKeywords: ["PE80 یا PE100", "MRS لوله پلی اتیلن"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/polyethylene-pipe-specifications",
    primaryKeyword: "مشخصات فنی لوله پلی اتیلن",
    secondaryKeywords: ["جدول قطر و SDR", "وزن لوله PE"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/polyethylene-pipe-standards",
    primaryKeyword: "استاندارد لوله پلی اتیلن",
    secondaryKeywords: ["INSO 14427", "INSO 11233", "EN 1555"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/pe100-technical-guide",
    primaryKeyword: "لوله پلی اتیلن PE100",
    secondaryKeywords: ["SDR لوله پلی اتیلن", "PN لوله پلی اتیلن"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/hdpe-installation-guide",
    primaryKeyword: "نصب لوله پلی اتیلن",
    secondaryKeywords: ["جوش لوله HDPE", "آزمون فشار لوله PE"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/applications/water-transfer",
    primaryKeyword: "لوله انتقال آب پلی اتیلن",
    secondaryKeywords: ["شبکه آبرسانی PE", "کاربرد لوله آبرسانی"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/applications/agriculture-irrigation",
    primaryKeyword: "لوله پلی اتیلن کشاورزی",
    secondaryKeywords: ["لوله آبیاری پلی اتیلن", "خط اصلی آبیاری"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/applications/gas-distribution",
    primaryKeyword: "لوله گازرسانی پلی اتیلن",
    secondaryKeywords: ["شبکه گاز PE", "لوله پلی اتیلن گاز"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/applications/industrial",
    primaryKeyword: "لوله پلی اتیلن صنعتی",
    secondaryKeywords: ["لوله HDPE صنعتی", "انتقال سیالات PE"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/solutions",
    primaryKeyword: "تامین کننده لوله پلی اتیلن",
    secondaryKeywords: ["راهکار خط لوله HDPE", "تأمین پروژه‌ای لوله PE"],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/technical-center",
    primaryKeyword: "راهنمای لوله پلی اتیلن",
    secondaryKeywords: ["مرکز فنی HDPE", "مهندسی لوله PE"],
    intent: "informational",
    cluster: "technical",
  },
];

export function getFaKeywordEntry(path: string): FaKeywordMapEntry | undefined {
  const normalized = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return faKeywordMap.find((entry) => entry.path === normalized);
}
