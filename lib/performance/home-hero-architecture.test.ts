import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { homeHeroImage } from "@/data/media/page-hero-images";

const root = process.cwd();

function read(rel: string) {
  return readFileSync(path.join(root, rel), "utf8");
}

describe("homepage hero LCP architecture", () => {
  /*
   * The hero no longer stands on a photograph at all: the modelled pipe is the
   * subject and the ground behind it is a CSS stage. That removes the hero's
   * image download outright, so the largest paint is the headline — nothing to
   * art-direct, nothing to preload, and no second img hidden with CSS.
   */
  it("carries no hero photograph to art-direct", () => {
    const section = read("components/home/PremiumHeroSection.tsx");

    expect(section).not.toContain("HomeHeroPhoto");
    expect(section).not.toContain("engine-hero-scene-photo");
    expect(section).not.toContain("priority");
    expect(section).not.toContain("<img");

    // the stage is painted, not loaded
    const css = read("app/engine-hero.css");
    expect(css).toMatch(/\.engine-hero \.engine-hero-scene\s*\{[^}]*radial-gradient/);
    expect(css).not.toMatch(/engine-hero-copy[\s\S]{0,120}engine-fade-up/);
  });

  /*
   * The modelled pipe is a layer over the hero, never the hero itself. Three
   * things keep it from costing the page anything: three.js arrives through a
   * dynamic import so it is not in the initial chunk, the component bails
   * before touching it on reduced motion / narrow viewports / no WebGL, and
   * the photo keeps its own preload and stays the LCP element.
   */
  it("keeps the modelled pipe off the critical path", () => {
    const stage = read("components/home/HeroProductPanel.tsx");
    const section = read("components/home/PremiumHeroSection.tsx");

    expect(stage).toContain('import("three")');
    expect(stage).not.toMatch(/^import \* as THREE from "three"/m);
    expect(stage).not.toMatch(/^import \{[^}]*\} from "three"/m);
    expect(stage).toContain("prefers-reduced-motion: reduce");
    expect(stage).toContain("getContext('webgl')");
    expect(section).toContain("HeroProductPanel");
  });

  it("puts a dark blurred hall behind the product instead of a photograph", () => {
    const css = read("app/engine-hero.css");
    // the hall behind the product is painted from a 130-byte image, not a photograph
    expect(css).toMatch(/\.engine-hero-hall\s*\{[^}]*filter:\s*blur/);
  });

  it("uses factory product stills on homepage catalog cards", () => {
    const page = read("components/home/IndustrialHomePage.tsx");
    expect(page).toContain("/media/brand/bukan-pipe-hdpe-water-supply-pipe.webp");
    expect(page).toContain("/media/brand/bukan-pipe-hdpe-gas-pipe.webp");
    expect(page).toContain("/media/brand/bukan-pipe-hdpe-irrigation-coil-pipe.webp");
    expect(page).toContain("/media/brand/bukan-pipe-hdpe-industrial-pipe-stack.webp");
    expect(page).toContain("/media/brand/bukan-pipe-hdpe-pe100-pipe.webp");
  });

  it("does not hide a second hero img with display none", () => {
    const css = read("app/engine-hero.css");
    expect(css).not.toMatch(/scene-photo--desktop\s*\{[^}]*display:\s*none/);
    expect(css).not.toMatch(/scene-photo--mobile\s*\{[^}]*display:\s*none/);
    expect(css).not.toContain("filter: brightness(0.96)");
  });

  /* The homepage no longer uses these, but other page heroes still read the
     same module, so the entries stay pinned rather than deleted. */
  it("keeps locale-specific pyramid sources", () => {
    expect(homeHeroImage.src.fa).toBe("/media/brand/home-hero-pyramid-fa.webp");
    expect(homeHeroImage.mobileSrc.fa).toBe("/media/brand/home-hero-pyramid-mobile-fa.webp");
    expect(homeHeroImage.src.en).toBe("/media/brand/home-hero-pyramid-en.webp");
    expect(homeHeroImage.mobileSrc.en).toBe("/media/brand/home-hero-pyramid-mobile-en.webp");
  });
});

describe("theme first paint geometry", () => {
  it("server-renders color-scheme on html and skips dark rewrite in the init script", () => {
    const layout = read("app/[locale]/layout.tsx");
    expect(layout).toContain('style={{ colorScheme: "dark" }}');
    expect(layout).toContain("loadUiFont");
    expect(layout).not.toContain("uiFontByLocale");

    const rootLayout = read("app/layout.tsx");
    expect(rootLayout).not.toContain("ThemeScript");
  });
});

describe("locale font isolation", () => {
  it("does not register both variable fonts in one module", () => {
    const index = read("lib/fonts.ts");
    expect(index).not.toContain("localFont");
    expect(index).toContain("lib/fonts-fa");
    expect(index).toContain("lib/fonts-en");
    expect(read("lib/fonts-fa.ts")).toContain("Estedad-Variable.woff2");
    expect(read("lib/fonts-en.ts")).toContain("Vazirmatn-Variable.woff2");
    expect(read("lib/fonts-fa.ts")).not.toContain("Vazirmatn");
    expect(read("lib/fonts-en.ts")).not.toContain("Estedad");
    expect(read("lib/fonts-fa.ts")).toContain("preload: false");
    expect(read("lib/fonts-en.ts")).toContain("preload: false");
  });
});

describe("mobile motion budget", () => {
  it("disables border-angle spin and blur reveal on small viewports", () => {
    const css = read("app/industrial-system.css");
    expect(css).toContain("@media (max-width: 768px)");
    expect(css).toContain("Mobile motion budget");
    expect(css).toMatch(/max-width:\s*768px[\s\S]*ind-border-light|max-width:\s*768px[\s\S]*animation:\s*none/);
    expect(css).toMatch(/max-width:\s*768px[\s\S]*filter:\s*none/);
    expect(css).toMatch(/max-width:\s*768px[\s\S]*translate3d\(0, 12px, 0\)/);
  });
});
