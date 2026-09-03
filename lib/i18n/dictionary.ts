import type { Locale } from "@/lib/i18n/config";
import { dictionaryEn } from "@/messages/en";
import { dictionaryFa } from "@/messages/fa";
import type { Dictionary } from "@/messages/en";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = {
  en: dictionaryEn,
  fa: dictionaryFa,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
