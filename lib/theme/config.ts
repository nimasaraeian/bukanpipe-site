export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "bukan-theme";

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "dark" || value === "light";
}

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) {
      return stored;
    }
  } catch {
    /* ignore */
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}
