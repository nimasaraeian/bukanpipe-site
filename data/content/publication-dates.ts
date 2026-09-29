/**
 * When each article was first published.
 *
 * schema.org asks an Article for both a datePublished and a dateModified, and
 * the documents only carried the second one (as lastReviewed). The dates here
 * are the day each document first entered the repository — `git log
 * --diff-filter=A` on the file that defines it — which for this site is the
 * day it went up. They are written down rather than read from git at build
 * time so that the published date survives a shallow clone, a squashed
 * history or a file being moved.
 *
 * A published article with no entry here fails its test rather than going out
 * with a missing or invented date. Add the row when you add the article.
 */
export const publicationDates: Readonly<Record<string, string>> = {
  "/polyethylene-pipe": "2026-09-03",
  "/technical-center": "2026-09-03",
  "/technical-center/air-vent-valve": "2026-09-03",
  "/technical-center/gas-polyethylene-pipe-guide": "2026-09-03",
  "/technical-center/hdpe-installation-guide": "2026-09-03",
  "/technical-center/hdpe-pipe-dimensions-chart": "2026-09-03",
  "/technical-center/hdpe-pipe-what-is": "2026-09-03",
  "/technical-center/pe100-technical-guide": "2026-09-03",
  "/technical-center/pe80-vs-pe100": "2026-09-03",
  "/technical-center/polyethylene-pipe-complete-guide": "2026-09-03",
  "/technical-center/polyethylene-pipe-dimensions-table": "2026-09-03",
  "/technical-center/polyethylene-pipe-specifications": "2026-09-03",
  "/technical-center/polyethylene-pipe-standards": "2026-09-03",
  "/technical-center/polyethylene-pipe-temperature-pressure": "2026-09-03",
  "/technical-center/polyethylene-pipe-welding": "2026-09-03",
  "/technical-center/subsurface-drip-irrigation": "2026-09-03",
  "/technical-center/water-supply-polyethylene-pipe-guide": "2026-09-03",
};

/** The size pages are generated from the catalogue, and went up together. */
export const pipeSizePublicationDate = "2026-09-23";

export function publishedAtFor(path: string): string | undefined {
  if (path.startsWith("/pipe-size/")) return pipeSizePublicationDate;
  return publicationDates[path];
}
