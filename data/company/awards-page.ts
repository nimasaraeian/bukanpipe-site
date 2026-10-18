import type { Locale } from "@/lib/i18n/config";
import { awardCategoryLabels, type AwardCategory } from "@/data/company/awards";
import { trophies } from "@/data/company/trophies";

export type AwardsPageCopy = {
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  h1: string;
  heroDescription: string;
  stats: { value: string; label: string }[];
  showcaseLabel: string;
  autoSpin: string;
  previous: string;
  next: string;
  openLarge: string;
  gridHeading: string;
  gridIntro: string;
  filterAll: string;
  filterLabel: string;
  levelNational: string;
  levelProvincial: string;
  issuer: string;
  year: string;
  undated: string;
  close: string;
  archiveNote: string;
  relatedHeading: string;
  related: { label: string; path: string; hint: string }[];
};

const nationalCount = trophies.filter((t) => t.level === "national").length;
const years = trophies.map((t) => t.year).filter(Boolean).sort();
const first = years[0]!;
const last = years[years.length - 1]!;

const toFa = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]!);

export const awardsPageCopy: Record<Locale, AwardsPageCopy> = {
  fa: {
    seoTitle: "تندیس‌ها و افتخارات بوکان پایپ | تعاونی برتر ملی، واحد نمونه کیفی",
    seoDescription:
      "بیست تندیس شرکت تعاونی لوله پلی اتیلن بوکان از ۱۳۸۷ تا ۱۴۰۵: تعاونی برتر ملی و استانی، واحد نمونه کیفی ملی سازمان استاندارد، واحد نمونه صنعتی و صادرکننده برگزیده آذربایجان غربی.",
    kicker: "افتخارات",
    h1: "تندیس‌ها و افتخارات بوکان پایپ",
    heroDescription:
      "بیست تندیس از سه دهه تولید لوله پلی اتیلن در بوکان — از واحد نمونه کیفی ملی سازمان استاندارد تا تعاونی برتر ملی. هر تندیس را از نزدیک ببینید؛ عنوان، سال و مرجع اعطاکننده روی خود تندیس خوانده شده است.",
    stats: [
      { value: toFa(String(trophies.length)), label: "تندیس" },
      { value: toFa(String(nationalCount)), label: "عنوان ملی" },
      { value: `${toFa(first)}–${toFa(last)}`, label: "بازه سال‌ها" },
    ],
    showcaseLabel: "ویترین چرخان تندیس‌ها",
    autoSpin: "چرخش خودکار",
    previous: "قبلی",
    next: "بعدی",
    openLarge: "برای نمای بزرگ کلیک کنید",
    gridHeading: "همه تندیس‌ها",
    gridIntro: "ابتدا عناوین ملی، سپس استانی‌ها از جدیدترین به قدیمی‌ترین. برای دیدن مرجع اعطاکننده، روی هر تندیس بزنید.",
    filterAll: "همه",
    filterLabel: "فیلتر بر اساس دسته",
    levelNational: "ملی",
    levelProvincial: "استانی",
    issuer: "اعطاکننده",
    year: "سال",
    undated: "بدون تاریخ روی تندیس",
    close: "بستن",
    archiveNote:
      "عکس‌ها از آرشیو تندیس‌های شرکت است. عنوان، سال و مرجع هر تندیس از روی خود تندیس خوانده شده؛ دو تندیس تاریخ ندارند و برایشان سالی حدس زده نشده است. فهرست کامل لوح‌های تقدیر، با شماره و تاریخ، در صفحه گواهی‌ها آمده است.",
    relatedHeading: "در همین زمینه",
    related: [
      { label: "گواهی‌ها و پروانه‌های استاندارد", path: "/certifications", hint: "پروانه‌های ۱۴۴۲۷-۲، ۷۶۰۷ و ۱۱۲۲۳ و جدول کامل لوح‌های تقدیر" },
      { label: "درباره بوکان پایپ", path: "/about", hint: "تاریخچه کارخانه از ۱۳۷۶، خطوط تولید و ظرفیت" },
      { label: "آزمایشگاه کنترل کیفیت", path: "/laboratory", hint: "آزمون‌هایی که پشت عنوان واحد نمونه کیفی است" },
      { label: "گالری کارخانه", path: "/gallery", hint: "عکس‌های واقعی خط تولید، آزمایشگاه و انبار" },
    ],
  },
  en: {
    seoTitle: "Bukan Pipe Awards & Trophies | Top National Cooperative, Quality Unit",
    seoDescription:
      "Twenty trophies of Bukan Polyethylene Pipe Company, 2008 to 2026: top national and provincial cooperative, national quality unit of the Standards Organization, model industrial unit and selected exporter of West Azerbaijan.",
    kicker: "Awards",
    h1: "Bukan Pipe Awards and Trophies",
    heroDescription:
      "Twenty trophies from three decades of polyethylene pipe manufacturing in Bukan — from the Standards Organization's national quality unit to top national cooperative. See each one up close; the title, year and awarding body are read from the trophy itself.",
    stats: [
      { value: String(trophies.length), label: "trophies" },
      { value: String(nationalCount), label: "national titles" },
      { value: `${first}–${last}`, label: "Iranian years" },
    ],
    showcaseLabel: "Rotating trophy showcase",
    autoSpin: "Auto-rotate",
    previous: "Previous",
    next: "Next",
    openLarge: "Click to view large",
    gridHeading: "All trophies",
    gridIntro: "National titles first, then provincial, newest to oldest. Select a trophy to see the awarding body.",
    filterAll: "All",
    filterLabel: "Filter by category",
    levelNational: "National",
    levelProvincial: "Provincial",
    issuer: "Awarded by",
    year: "Year",
    undated: "No date on the trophy",
    close: "Close",
    archiveNote:
      "Photographs are from the company's trophy archive. Each title, year and awarding body is read from the trophy; two trophies carry no date and none has been guessed. The full list of commendation plaques, with numbers and dates, is on the certifications page.",
    relatedHeading: "Related",
    related: [
      { label: "Certifications and standard mark licences", path: "/certifications", hint: "INSO 14427-2, 7607 and 11223 licences and the full plaque table" },
      { label: "About Bukan Pipe", path: "/about", hint: "Factory history since 1997, production lines and capacity" },
      { label: "Quality control laboratory", path: "/laboratory", hint: "The tests behind the quality unit title" },
      { label: "Factory gallery", path: "/gallery", hint: "Real photographs of production, laboratory and warehouse" },
    ],
  },
};

export function categoryLabel(category: AwardCategory, locale: Locale): string {
  return awardCategoryLabels[category][locale];
}
