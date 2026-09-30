import { awards, type Award } from "@/data/company/awards";

/**
 * Which of the thirty-four commendations the Organization claims as `award`,
 * and how each one is written.
 *
 * The filtering happens here rather than in the data, because the page and
 * the markup are answering different questions. The page is a record: it can
 * say "listed in the company's catalogue, plaque not in the archive" beside
 * an entry and let the reader weigh it. Structured data has no room for that
 * qualification — an award in the graph is an unqualified claim to have won
 * it — so anything the archive cannot show is left out of the graph and
 * stays on the page, where its provenance is written next to it.
 *
 * Three rules, in order.
 */

/** Jalali years run 13xx–14xx; a plaque's date line may carry much else. */
const JALALI_YEAR = /\b(1[34]\d{2})\b/;

/**
 * 1. Only what the archive can show.
 *
 * Seven entries come from the company's own catalogue with no plaque behind
 * them. They are real enough to print, with that caveat attached; they are
 * not evidence.
 */
function hasPlaque(award: Award): boolean {
  return (award.source ?? "plaque") === "plaque";
}

/**
 * 2. An award, not an appearance.
 *
 * Five entries are certificates of participation in a trade fair. Turning up
 * at an exhibition is not a commendation, and listing five of them among the
 * quality titles dilutes the ones that are.
 */
function isAward(award: Award): boolean {
  return award.category !== "exhibition";
}

/**
 * 3. National titles, and the latest provincial one in each category.
 *
 * Twenty-two survive the first two rules, which is still a wall of text in
 * which "Provincial quality unit of the year" appears five times over
 * different years. Every national title is kept. Below that, one entry per
 * category — the most recent — stands for the rest: a reader learns more
 * from four distinct provincial titles than from fifteen near-repeats, and
 * the page still lists them all.
 */
function isNational(award: Award): boolean {
  return award.level.includes("ملی");
}

function yearOf(award: Award): number {
  const match = JALALI_YEAR.exec(award.year);
  return match ? Number(match[1]) : 0;
}

export function schemaAwards(): readonly Award[] {
  const eligible = awards.filter((award) => hasPlaque(award) && isAward(award));
  const national = eligible.filter(isNational);

  const latestProvincial = new Map<string, Award>();
  for (const award of eligible) {
    if (isNational(award)) continue;
    // below provincial, a district commendation is not the company's headline
    if (!award.level.includes("استانی")) continue;
    const held = latestProvincial.get(award.category);
    if (!held || yearOf(award) > yearOf(held)) latestProvincial.set(award.category, award);
  }

  return [...national, ...latestProvincial.values()].sort((a, b) => yearOf(b) - yearOf(a));
}

/**
 * The year alone.
 *
 * `year` on the data is the date line as the plaque prints it, which is
 * right for the page — "1397؛ تاریخ روی لوح 97/04/10 (خوانش تقریبی)" tells a
 * reader the reading is approximate. Dropped into an English award string it
 * is Persian prose inside an English sentence, so the markup takes the year
 * and leaves the provenance on the page.
 */
export function awardYear(award: Award): string {
  const match = JALALI_YEAR.exec(award.year);
  if (match) return match[1]!;
  const gregorian = /\b(19|20)\d{2}\b/.exec(award.year);
  return gregorian ? gregorian[0] : award.year;
}

export function awardNames(): string[] {
  return schemaAwards().map(
    (award) => `${award.title.en} — ${award.issuer.en} (${awardYear(award)})`,
  );
}
