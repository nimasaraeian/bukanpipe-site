import type { AwardCategory } from "@/data/company/awards";

/**
 * The trophy archive: twenty studio photographs of the company's trophies
 * (تندیس), supplied by the factory on 2026-10-18 as one RAR of 20 JPEGs.
 *
 * This is a separate archive from the plaques in `awards.ts`. Where a trophy
 * matches a plaque already transcribed there, `awardId` points at it so the two
 * records describe one award, not two. Where it does not, the trophy is listed
 * on its own with the title and year read from the trophy itself (or, for two
 * undated ones, no year at all — a year is not invented).
 *
 * The level is read from the trophy, not the filename. The 1399 cooperative
 * trophy arrived in a file named "ملی", but the trophy says "پانزدهمین جشنواره
 * تعاونی‌های برتر" with no national wording, and the plaque record for the same
 * year (award-3) is provincial, so it is listed as provincial.
 */

export type Trophy = {
  id: string;
  slug: string;
  category: AwardCategory;
  /** Year as printed on the trophy; empty when the trophy carries no date. */
  year: string;
  level: "national" | "provincial";
  /** The plaque record in awards.ts for the same award, when one exists. */
  awardId?: string;
  title: { fa: string; en: string };
  issuer: { fa: string; en: string };
};

const COOP_PROV = {
  fa: "اداره کل تعاون، کار و رفاه اجتماعی آذربایجان غربی",
  en: "Directorate of Cooperatives, Labour and Social Welfare, West Azerbaijan",
};
const COOP_NAT = {
  fa: "وزارت تعاون، کار و رفاه اجتماعی",
  en: "Ministry of Cooperatives, Labour and Social Welfare",
};
const INSO_PROV = {
  fa: "اداره کل استاندارد آذربایجان غربی",
  en: "Iranian National Standards Organization — West Azerbaijan",
};
const INSO_NAT = {
  fa: "سازمان ملی استاندارد ایران",
  en: "Iranian National Standards Organization",
};
const SAMT_PROV = {
  fa: "سازمان صنعت، معدن و تجارت آذربایجان غربی",
  en: "Industry, Mine and Trade Organization, West Azerbaijan",
};
const GOV_PROV = {
  fa: "استانداری آذربایجان غربی",
  en: "Governorate of West Azerbaijan",
};

export const trophies: readonly Trophy[] = [
  { id: "trophy-coop-national-1405", slug: "coop-national-1405", category: "cooperative", year: "1405", level: "national", awardId: "award-8",
    title: { fa: "تعاونی برتر ملی", en: "Top national cooperative" }, issuer: COOP_NAT },
  { id: "trophy-quality-national-1393", slug: "quality-unit-national-1393", category: "quality", year: "1393", level: "national", awardId: "award-43",
    title: { fa: "واحد نمونه کیفی ملی", en: "National quality unit of the year" }, issuer: INSO_NAT },
  { id: "trophy-coop-provincial-1404", slug: "coop-provincial-1404", category: "cooperative", year: "1404", level: "provincial", awardId: "award-6",
    title: { fa: "تعاونی برتر استانی", en: "Top provincial cooperative" }, issuer: COOP_PROV },
  { id: "trophy-coop-provincial-1403", slug: "coop-provincial-1403", category: "cooperative", year: "1403", level: "provincial", awardId: "award-5",
    title: { fa: "تعاونی برتر استانی", en: "Top provincial cooperative" }, issuer: COOP_PROV },
  { id: "trophy-coop-provincial-1401", slug: "coop-provincial-1401", category: "cooperative", year: "1401", level: "provincial", awardId: "award-4",
    title: { fa: "تعاونی برتر استانی", en: "Top provincial cooperative" }, issuer: GOV_PROV },
  { id: "trophy-coop-provincial-1399", slug: "coop-provincial-1399", category: "cooperative", year: "1399", level: "provincial", awardId: "award-3",
    title: { fa: "تعاونی برتر استانی", en: "Top provincial cooperative" }, issuer: COOP_PROV },
  { id: "trophy-exporter-provincial-1399", slug: "exporter-provincial-1399", category: "export", year: "1399", level: "provincial",
    title: { fa: "صادرکننده برگزیده استانی", en: "Selected provincial exporter" }, issuer: GOV_PROV },
  { id: "trophy-coop-provincial-1398", slug: "coop-provincial-1398", category: "cooperative", year: "1398", level: "provincial", awardId: "award-2",
    title: { fa: "تعاونی برتر استانی", en: "Top provincial cooperative" }, issuer: COOP_PROV },
  { id: "trophy-entrepreneur-provincial-1398", slug: "entrepreneur-provincial-1398", category: "other", year: "1398", level: "provincial",
    title: { fa: "کارآفرین برتر استانی", en: "Top provincial entrepreneur" }, issuer: COOP_PROV },
  { id: "trophy-industrial-1397", slug: "industrial-unit-1397", category: "industrial", year: "1397", level: "provincial", awardId: "award-40",
    title: { fa: "واحد نمونه صنعتی استان", en: "Provincial model industrial unit" }, issuer: SAMT_PROV },
  { id: "trophy-quality-provincial-1396", slug: "quality-unit-provincial-1396", category: "quality", year: "1396", level: "provincial", awardId: "award-45",
    title: { fa: "واحد نمونه کیفی استانی", en: "Provincial quality unit of the year" }, issuer: INSO_PROV },
  { id: "trophy-quality-provincial-1395", slug: "quality-unit-provincial-1395", category: "quality", year: "1395", level: "provincial", awardId: "award-44",
    title: { fa: "واحد نمونه کیفی استانی", en: "Provincial quality unit of the year" }, issuer: INSO_PROV },
  { id: "trophy-coop-provincial-1394", slug: "coop-provincial-1394", category: "cooperative", year: "1394", level: "provincial",
    title: { fa: "تعاونی برتر استانی", en: "Top provincial cooperative" }, issuer: COOP_PROV },
  { id: "trophy-coop-provincial-1393", slug: "coop-provincial-1393", category: "cooperative", year: "1393", level: "provincial",
    title: { fa: "تعاونی برتر استانی", en: "Top provincial cooperative" }, issuer: COOP_PROV },
  { id: "trophy-coop-provincial-1391", slug: "coop-provincial-1391", category: "cooperative", year: "1391", level: "provincial",
    title: { fa: "تعاونی برتر استانی", en: "Top provincial cooperative" }, issuer: COOP_PROV },
  { id: "trophy-exporter-provincial-1391", slug: "exporter-provincial-1391", category: "export", year: "1391", level: "provincial", awardId: "award-18",
    title: { fa: "صادرکننده برتر استانی", en: "Top provincial exporter" }, issuer: GOV_PROV },
  { id: "trophy-quality-provincial-1390", slug: "quality-unit-provincial-1390", category: "quality", year: "1390", level: "provincial", awardId: "award-42",
    title: { fa: "واحد نمونه کیفی استانی", en: "Provincial quality unit of the year" }, issuer: INSO_PROV },
  { id: "trophy-industrial-1387", slug: "industrial-unit-1387", category: "industrial", year: "1387", level: "provincial",
    title: { fa: "واحد نمونه صنعتی استان", en: "Provincial model industrial unit" }, issuer: SAMT_PROV },
  { id: "trophy-export-day", slug: "export-day-bank", category: "export", year: "", level: "provincial",
    title: { fa: "تندیس روز ملی صادرات", en: "National Export Day trophy" },
    issuer: { fa: "بانک توسعه صادرات ایران", en: "Export Development Bank of Iran" } },
  { id: "trophy-sustainable-development", slug: "sustainable-development-forum", category: "other", year: "", level: "provincial",
    title: { fa: "همایش توسعه پایدار", en: "Sustainable Development Forum" },
    issuer: { fa: "همایش توسعه پایدار؛ چالش‌ها و راهکارها", en: "Sustainable Development Forum: Challenges and Solutions" } },
];

export type TrophyImage = {
  thumb: string;
  card: string;
  full: string;
  width: number;
  height: number;
};

/** Three renditions of one trophy photograph, all 3:4. */
export function trophyImage(trophy: Trophy): TrophyImage {
  const base = `/media/awards/bukan-pipe-trophy-${trophy.slug}`;
  return {
    thumb: `${base}-thumb.webp`,
    card: `${base}-card.webp`,
    full: `${base}-full.webp`,
    width: 1080,
    height: 1440,
  };
}

export function trophyAlt(trophy: Trophy, locale: "fa" | "en"): string {
  const title = trophy.title[locale];
  const year = trophy.year ? ` ${trophy.year}` : "";
  return locale === "fa"
    ? `تندیس ${title}${year} — شرکت تعاونی لوله پلی اتیلن بوکان`
    : `${title}${year} trophy — Bukan Polyethylene Pipe Company`;
}
