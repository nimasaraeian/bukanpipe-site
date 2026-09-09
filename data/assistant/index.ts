import type { Locale } from "@/lib/i18n/config";
import {
  assistantCopyEn,
  chooseProductOptionsEn,
  fallbackQuickActionsEn,
  primaryQuickActionsEn,
} from "./en";
import {
  assistantCopyFa,
  chooseProductOptionsFa,
  fallbackQuickActionsFa,
  primaryQuickActionsFa,
} from "./fa";

export function getAssistantCopy(locale: Locale) {
  return locale === "fa" ? assistantCopyFa : assistantCopyEn;
}

export function getPrimaryQuickActions(locale: Locale) {
  return locale === "fa" ? primaryQuickActionsFa : primaryQuickActionsEn;
}

export function getFallbackQuickActions(locale: Locale) {
  return locale === "fa" ? fallbackQuickActionsFa : fallbackQuickActionsEn;
}

export function getChooseProductOptions(locale: Locale) {
  return locale === "fa" ? chooseProductOptionsFa : chooseProductOptionsEn;
}
