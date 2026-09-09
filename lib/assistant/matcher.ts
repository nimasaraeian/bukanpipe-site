import { assistantIntents } from "@/data/assistant/intents";
import type { AssistantIntentDefinition, AssistantMatchResult } from "@/lib/assistant/types";
import type { Locale } from "@/lib/i18n/config";
import { normalizeAssistantQuery, tokenizeNormalized } from "./normalize";

function phraseMatches(normalized: string, phrase: string): boolean {
  if (normalized === phrase) {
    return true;
  }
  if (normalized.startsWith(phrase) && (normalized.length === phrase.length || normalized.charAt(phrase.length) === " ")) {
    return true;
  }
  if (
    normalized.endsWith(phrase) &&
    (normalized.length === phrase.length || normalized.charAt(normalized.length - phrase.length - 1) === " ")
  ) {
    return true;
  }
  return normalized.includes(` ${phrase} `);
}

function scoreIntent(normalized: string, tokens: string[], intent: AssistantIntentDefinition): number {
  if (intent.negativeKeywords?.some((neg) => normalized.includes(normalizeAssistantQuery(neg)))) {
    return 0;
  }

  for (const phrase of intent.phrases) {
    const np = normalizeAssistantQuery(phrase);
    if (np && phraseMatches(normalized, np)) {
      return 100;
    }
  }

  if (intent.keywords.length === 0) {
    return 0;
  }

  const normalizedKeywords = intent.keywords.map((k) => normalizeAssistantQuery(k)).filter(Boolean);
  const matched = normalizedKeywords.filter((keyword) => {
    if (tokens.includes(keyword)) {
      return true;
    }
    // Short keywords must match whole tokens — avoids «آب» matching inside «آبیاری».
    if (keyword.length < 4) {
      return false;
    }
    return normalized.includes(keyword);
  });

  if (matched.length === 0) {
    return 0;
  }

  if (matched.length === normalizedKeywords.length && normalizedKeywords.length > 1) {
    return 85;
  }

  if (matched.length >= 2) {
    return 70;
  }

  return 45;
}

export function matchAssistantQuery(query: string, locale: Locale): AssistantMatchResult | null {
  const normalized = normalizeAssistantQuery(query);
  if (!normalized) {
    return null;
  }

  const tokens = tokenizeNormalized(query);
  let best: AssistantMatchResult | null = null;

  for (const intent of assistantIntents) {
    const score = scoreIntent(normalized, tokens, intent);
    if (score < intent.minScore) {
      continue;
    }

    const candidate: AssistantMatchResult = {
      intentId: intent.id,
      score,
      action: intent.action(locale),
    };

    if (!best || candidate.score > best.score) {
      best = candidate;
    }
  }

  return best;
}
