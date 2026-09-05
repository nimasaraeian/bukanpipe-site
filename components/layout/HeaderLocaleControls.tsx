"use client";

import { localeLabel, locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionary";

type LocaleControlsProps = {
  locale: Locale;
  t: Dictionary;
  onSwitch: (targetLocale: Locale) => void;
  langOpen: boolean;
  onLangOpenChange: (open: boolean) => void;
};

function switchLabel(locale: Locale, target: Locale, t: Dictionary): string {
  if (target === locale) {
    return `${localeLabel[target]}, ${t.common.currentLanguage}`;
  }
  return target === "en" ? t.common.switchToEnglish : t.common.switchToPersian;
}

export function DesktopLocaleDropdown({
  locale,
  t,
  onSwitch,
  langOpen,
  onLangOpenChange,
}: LocaleControlsProps) {
  return (
    <div className="relative hidden xl:block">
      <button
        type="button"
        className="engine-header-lang inline-flex"
        aria-label={t.common.language}
        aria-expanded={langOpen}
        onClick={() => onLangOpenChange(!langOpen)}
      >
        {localeLabel[locale]}
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="engine-header-chevron">
          <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
      {langOpen ? (
        <div className="engine-header-lang-menu">
          {locales.map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "engine-header-lang-option",
                item === locale && "engine-header-lang-option-active",
              )}
              aria-label={switchLabel(locale, item, t)}
              aria-current={item === locale ? "true" : undefined}
              onClick={() => onSwitch(item)}
            >
              {localeLabel[item]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function MobileLocaleSwitch({ locale, t, onSwitch }: Omit<LocaleControlsProps, "langOpen" | "onLangOpenChange">) {
  return (
    <div
      className="engine-header-lang-switch"
      role="group"
      aria-label={t.common.language}
    >
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          className={cn(
            "engine-header-lang-switch-btn",
            item === locale && "engine-header-lang-switch-btn-active",
          )}
          aria-label={switchLabel(locale, item, t)}
          aria-current={item === locale ? "true" : undefined}
          onClick={() => {
            if (item !== locale) onSwitch(item);
          }}
        >
          {localeLabel[item]}
        </button>
      ))}
    </div>
  );
}
