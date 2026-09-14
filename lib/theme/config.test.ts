import { describe, expect, it } from "vitest";
import {
  resolveTheme,
  themeColorFor,
  THEME_COLOR_DARK,
  THEME_COLOR_LIGHT,
  THEME_INIT_SCRIPT,
} from "./config";

describe("resolveTheme", () => {
  it("keeps an explicit saved light preference", () => {
    expect(resolveTheme("light")).toBe("light");
  });

  it("keeps an explicit saved dark preference", () => {
    expect(resolveTheme("dark")).toBe("dark");
  });

  it("defaults to dark when nothing is stored", () => {
    expect(resolveTheme(null)).toBe("dark");
    expect(resolveTheme(undefined)).toBe("dark");
    expect(resolveTheme("")).toBe("dark");
    expect(resolveTheme("system")).toBe("dark");
  });
});

describe("themeColorFor", () => {
  it("uses the industrial dark canvas by default", () => {
    expect(themeColorFor("dark")).toBe(THEME_COLOR_DARK);
    expect(THEME_COLOR_DARK).toBe("#05070a");
  });

  it("uses the light canvas only for the opted-in skin", () => {
    expect(themeColorFor("light")).toBe(THEME_COLOR_LIGHT);
  });
});

describe("THEME_INIT_SCRIPT", () => {
  it("does not follow prefers-color-scheme", () => {
    expect(THEME_INIT_SCRIPT).not.toContain("prefers-color-scheme");
    expect(THEME_INIT_SCRIPT).toContain('t==="light"||t==="dark"');
    expect(THEME_INIT_SCRIPT).toContain('?t:"dark"');
  });
});
