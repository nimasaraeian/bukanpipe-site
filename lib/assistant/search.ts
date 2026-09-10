import { getAllGuideDestinations, getGuideDestinationLabel, type GuideDestination } from "@/data/assistant/guide";
import { isAssistantPathAllowed } from "@/data/assistant/routes";
import { getPublishedContent } from "@/lib/content/registry";
import type { Locale } from "@/lib/i18n/config";
import { normalizeAssistantQuery } from "./normalize";

export type GuideSearchHit = {
  path: string;
  label: string;
  score: number;
};

function scoreText(normalizedQuery: string, ...fields: Array<string | undefined>): number {
  let score = 0;
  for (const field of fields) {
    if (!field) continue;
    const normalized = normalizeAssistantQuery(field);
    if (!normalized) continue;
    if (normalized === normalizedQuery) score += 80;
    else if (normalized.startsWith(normalizedQuery)) score += 50;
    else if (normalized.includes(normalizedQuery)) score += 35;
  }
  return score;
}

function scoreDestination(query: string, destination: GuideDestination, locale: Locale): number {
  const normalizedQuery = normalizeAssistantQuery(query);
  const label = getGuideDestinationLabel(destination, locale);
  let score = scoreText(normalizedQuery, label, destination.path);
  for (const keyword of destination.keywords) {
    const normalizedKeyword = normalizeAssistantQuery(keyword);
    if (!normalizedKeyword) continue;
    if (normalizedKeyword === normalizedQuery) score += 70;
    else if (normalizedQuery.includes(normalizedKeyword) || normalizedKeyword.includes(normalizedQuery)) score += 40;
  }
  return score;
}

export function searchWebsiteGuide(query: string, locale: Locale, limit = 8): GuideSearchHit[] {
  const normalizedQuery = normalizeAssistantQuery(query);
  if (normalizedQuery.length < 2) {
    return [];
  }

  const hits = new Map<string, GuideSearchHit>();

  const consider = (path: string, label: string, score: number) => {
    if (score <= 0 || !isAssistantPathAllowed(path)) return;
    const existing = hits.get(path);
    if (!existing || score > existing.score) {
      hits.set(path, { path, label, score });
    }
  };

  for (const destination of getAllGuideDestinations()) {
    consider(
      destination.path,
      getGuideDestinationLabel(destination, locale),
      scoreDestination(query, destination, locale),
    );
  }

  for (const doc of getPublishedContent(locale)) {
    const score =
      scoreText(
        normalizedQuery,
        doc.title,
        doc.seoTitle,
        doc.primaryKeyword,
        doc.slug.replace(/-/g, " "),
        doc.description,
        ...doc.secondaryKeywords,
      ) + (normalizeAssistantQuery(doc.slug).includes(normalizedQuery) ? 25 : 0);
    consider(doc.path, doc.title, score);
  }

  return [...hits.values()].sort((a, b) => b.score - a.score || a.label.localeCompare(b.label)).slice(0, limit);
}
