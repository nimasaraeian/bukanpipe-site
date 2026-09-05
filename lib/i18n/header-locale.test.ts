import { describe, expect, it } from "vitest";

import { readFileSync } from "node:fs";

import { resolve } from "node:path";

import { switchLocalePathSafe } from "@/lib/i18n/path";

import { isPathAvailableInLocale } from "@/lib/i18n/locale-availability";

import { getPrimaryNavStructure } from "@/lib/i18n/nav-items";

import { dictionaryEn } from "@/messages/en";



describe("switchLocalePathSafe", () => {

  it("preserves equivalent bilingual routes", () => {

    expect(switchLocalePathSafe("/fa/products/gas-pipe", "en")).toBe("/en/products/gas-pipe");

    expect(switchLocalePathSafe("/en/calculator/pipeline-design", "fa")).toBe(

      "/fa/calculator/pipeline-design",

    );

  });



  it("falls back to locale home when target route is unavailable", () => {

    expect(isPathAvailableInLocale("/does-not-exist", "en")).toBe(false);

    expect(switchLocalePathSafe("/fa/does-not-exist", "en")).toBe("/en");

    expect(switchLocalePathSafe("/en/does-not-exist", "fa")).toBe("/fa");

  });

});



describe("compact header navigation", () => {

  it("uses grouped primary nav with engineering and company dropdowns", () => {

    const structure = getPrimaryNavStructure("en", dictionaryEn, (p) => `/en${p === "/" ? "" : p}`);

    const labels = structure.map((entry) => (entry.kind === "link" ? entry.label : entry.id));



    expect(labels).toEqual(["Home", "Products", "Applications", "engineering", "company", "Contact"]);

  });



  it("uses a single EN|FA switch in header actions, not drawer locale controls", () => {

    const headerSource = readFileSync(

      resolve(process.cwd(), "components/layout/PremiumHeroHeader.tsx"),

      "utf8",

    );

    const controlsSource = readFileSync(

      resolve(process.cwd(), "components/layout/HeaderLocaleControls.tsx"),

      "utf8",

    );

    const cssSource = readFileSync(resolve(process.cwd(), "app/engine-hero.css"), "utf8");



    expect(headerSource).toContain("MobileLocaleSwitch");

    expect(headerSource).not.toContain("DesktopLocaleDropdown");

    expect(headerSource).toContain("HeaderNavDropdown");

    expect(headerSource).toContain("requestQuoteShort");

    expect(controlsSource).toContain("engine-header-lang-switch");

    expect(controlsSource).not.toContain("xl:hidden");



    const drawerSection = headerSource.split("engine-header-drawer")[1] ?? "";

    expect(drawerSection.includes("engine-header-lang-option")).toBe(false);

    expect(drawerSection.includes("MobileLocaleSwitch")).toBe(false);



    expect(cssSource).toContain("@media (min-width: 90rem)");

    expect(cssSource).toContain(".engine-header-nav-menu");

  });

});


