export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "bukan-theme";

/** Default canvas / browser chrome. Matches `--ind-bg-deep` in dark theme. */
export const THEME_COLOR_DARK = "#05070a";

/** Opt-in light canvas. Matches `--ind-bg-deep` in light theme. */
export const THEME_COLOR_LIGHT = "#f0f3f7";

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "dark" || value === "light";
}

/** Stored light|dark wins. Anything else (including OS preference) is dark. */
export function resolveTheme(stored: string | null | undefined): Theme {
  return isTheme(stored) ? stored : "dark";
}

export function themeColorFor(theme: Theme): string {
  return theme === "light" ? THEME_COLOR_LIGHT : THEME_COLOR_DARK;
}

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    return resolveTheme(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (root.dataset.theme !== theme) {
    root.dataset.theme = theme;
  }
  if (root.style.colorScheme !== theme) {
    root.style.colorScheme = theme;
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", themeColorFor(theme));
  }
}

/**
 * Blocking first-paint script. Same rules as `getPreferredTheme`:
 * saved localStorage value, otherwise dark. Never reads prefers-color-scheme.
 * Does not rewrite color-scheme when the SSR dark canvas is already correct —
 * mutating html style after parse is a whole-document CLS in Chrome.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var v=(t==="light"||t==="dark")?t:"dark";var r=document.documentElement;if(r.getAttribute("data-theme")!==v)r.setAttribute("data-theme",v);if(v==="light"){r.style.colorScheme="light";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",${JSON.stringify(THEME_COLOR_LIGHT)});} }catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;
