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
    // the ground behind the product is a painted navy stage, not an image
    expect(css).toMatch(/\.engine-hero \.engine-hero-scene\s*\{[^}]*radial-gradient/);
    expect(css).not.toContain("engine-hero-hall");
  });

  /*
   * The size rail. Three things about it are worth pinning, because all three
   * have a way of drifting: which sizes it offers, that the walls beside them
   * are one real pressure class rather than an average, and that the rail is
   * legible on the light page — its colours were written for the dark one and
   * went invisible on the light one once before.
   */
  it("offers the five catalogue diameters against one pressure class", () => {
    const panel = read("components/home/HeroProductPanel.tsx");

    expect(panel).toContain("const SIZES = [25, 63, 110, 160, 225]");
    // every one of them is a diameter the catalogue lists a SDR 11 wall for
    expect(panel).toContain("TABLE.sdr.indexOf(11)");
    // and DN 110 stays the reference the model and the camera are built around
    expect(panel).toContain("REF = 110");
  });

  it("scales the model with the chosen diameter instead of only the wall", () => {
    const panel = read("components/home/HeroProductPanel.tsx");

    // the diameter reaches the model, not just the wall fraction
    expect(panel).toContain("window.__setPipe(t == null ? null : (2 * t) / dn, dn / REF)");
    expect(panel).toContain("function rebuild(wallFrac, outerR)");
    // and the camera follows the object rather than sitting at a fixed radius
    expect(panel).toContain("Math.hypot(L / 2, OUT) * FILL");
  });

  it("keeps the printed mark in proportion at every diameter", () => {
    const panel = read("components/home/HeroProductPanel.tsx");

    /* The mark's canvas wraps once round the pipe, so its height runs with the
       circumference and its length with the axis. Only one of those grows with
       the diameter, so without this the lockup stretches on a large pipe and
       squashes on a small one. repeat.x must stay repeat.y times the diameter
       for a texture pixel to remain square on the surface. */
    expect(panel).toContain("const S = Math.min(R, Math.sqrt(R)), kx = R / S, ky = 1 / S");
    expect(panel).toContain("markTex.repeat.set(kx, ky)");
    expect(panel).toContain("markTex.offset.set(MARK_U * (1 - kx), .5 * (1 - ky))");
    /* The min is what keeps the mark off the stripe. Below the reference it
       picks R, which holds the mark's arc constant; a mark that shrank more
       slowly than the pipe would spread over a wider arc as the pipe thinned
       and run under the stripe, which is what happened at DN 63 and DN 25. */
    expect(panel).toContain("Math.min(R, Math.sqrt(R))");
    // and the rescaled window must not wrap, or the far side gets a second copy
    expect(panel).toContain("markTex.wrapS = markTex.wrapT = T.ClampToEdgeWrapping");
  });

  it("restates the rail colours for the light page", () => {
    const panel = read("components/home/HeroProductPanel.tsx");

    expect(panel).toMatch(/\[data-theme="light"\] \.hp-chip\{/);
    expect(panel).toMatch(/\[data-theme="light"\] \.hp-spec dd\{/);
    // and the Persian page reads its own direction inside the rail
    expect(panel).toContain('[dir="rtl"] .hp-side{direction:rtl}');
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
