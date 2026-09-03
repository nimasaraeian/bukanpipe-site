"use client";

import { createContext, useContext, useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { setLocaleCookie } from "@/lib/i18n/locale-cookie";
import { withLocale } from "@/lib/i18n/path";

type LocaleContextValue = {
  locale: Locale;
  t: Dictionary;
  path: (routePath: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
};

export function LocaleProvider({ locale, dictionary, children }: LocaleProviderProps) {
  useEffect(() => {
    setLocaleCookie(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        t: dictionary,
        path: (routePath) => withLocale(routePath, locale),
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
