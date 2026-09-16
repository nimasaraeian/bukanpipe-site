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
      "کارخانه لوله پلی اتیلن",
      "بوکان پایپ",
      "تولید کننده لوله HDPE",
    ],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/about",
    primaryKeyword: "درباره بوکان پایپ",
    secondaryKeywords: [
      "تاریخچه کارخانه بوکان پایپ",
      "کارخانه بوکان آذربایجان غربی",
    ],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/products",
    primaryKeyword: "خرید لوله پلی اتیلن",
    secondaryKeywords: ["محصولات لوله پلی اتیلن", "انواع لوله پلی اتیلن", "کاتالوگ لوله HDPE"],
    intent: "commercial",
    cluster: "commercial",
  },
  {
    path: "/request-quote",
    primaryKeyword: "قیمت لوله پلی اتیلن",
    secondaryKeywords: ["استعلام قیمت لوله پلی اتیلن", "درخواست قیمت لوله PE", "پیش‌فاکتور لوله پلی اتیلن"],
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
    primaryKeyword: "لوله پلی اتیلن آبیاری",
    secondaryKeywords: ["لوله آبیاری تحت فشار", "لوله آبیاری پلی اتیلن"],
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
    secondaryKeywords: ["لوله HDPE PE100", "لوله فشار PE100", "تأمین لوله PE100"],
    intent: "commercial",
    cluster: "technical",
  },
  {
    path: "/polyethylene-pipe",
    primaryKeyword: "لوله پلی اتیلن چیست",
    secondaryKeywords: ["معرفی لوله پلی اتیلن", "کاربرد لوله پلی اتیلن", "مزایای لوله پلی اتیلن"],
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
    secondaryKeywords: ["SDR لوله پلی اتیلن", "PN لوله پلی اتیلن", "جدول قطر و سایز لوله PE"],
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
    primaryKeyword: "راهنمای فنی PE100",
    secondaryKeywords: ["MRS لوله PE100", "طراحی SDR برای PE100"],
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
    primaryKeyword: "کاربرد لوله پلی اتیلن در انتقال آب",
    secondaryKeywords: ["شبکه آبرسانی PE", "طراحی خط انتقال آب"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/applications/agriculture-irrigation",
    primaryKeyword: "لوله پلی اتیلن کشاورزی",
    secondaryKeywords: ["خط اصلی آبیاری مزرعه", "شبکه آبیاری فشار قوی"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/applications/gas-distribution",
    primaryKeyword: "کاربرد لوله پلی اتیلن در گازرسانی",
    secondaryKeywords: ["شبکه گاز PE", "الکتروفیوژن در گازرسانی"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/applications/industrial",
    primaryKeyword: "کاربرد صنعتی لوله پلی اتیلن",
    secondaryKeywords: ["انتقال سیالات PE", "خطوط فرآیند HDPE"],
    intent: "informational",
    cluster: "application",
  },
  {
    path: "/laboratory",
    primaryKeyword: "آزمایشگاه لوله پلی اتیلن",
    secondaryKeywords: ["تست لوله پلی اتیلن", "آزمایش لوله پلی اتیلن"],
    intent: "informational",
    cluster: "technical",
  },
  {
    path: "/technical-center/polyethylene-pipe-complete-guide",
    primaryKeyword: "راهنمای انتخاب لوله پلی اتیلن",
    secondaryKeywords: ["انتخاب لوله HDPE", "ارزیابی خرید لوله پلی اتیلن"],
    intent: "informational",
    cluster: "technical",
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
    primaryKeyword: "مرکز فنی لوله پلی اتیلن",
    secondaryKeywords: ["راهنماهای مهندسی لوله PE", "جوش و نصب لوله پلی اتیلن"],
    intent: "informational",
    cluster: "technical",
  },
];

export function getFaKeywordEntry(path: string): FaKeywordMapEntry | undefined {
  const normalized = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return faKeywordMap.find((entry) => entry.path === normalized);
}
