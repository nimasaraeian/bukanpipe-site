# Design System — Luminous Precision

**Phase:** 004  
**Status:** Implemented on development route shells  
**Showcase:** `/design-system` (internal, noindex, not in sitemap)

Selected direction: see `docs/DESIGN_DIRECTION_EXPLORATION.md`.

---

## Philosophy

A light, paper-and-graphite industrial editorial platform. The site should feel like a serious engineering house: composed, high-contrast where it matters, physically present cards, and **selective** luminous depth. It must never read as a Tailwind starter, a SaaS dashboard, or a dark cinematic microsite.

Proof over adjectives. Demo content is labeled. No invented factory facts.

---

## Color

| Token | Role |
|---|---|
| Canvas `#F3F1EB` | Page field — warm stone, not cold gray |
| Paper `#FFFCF7` | Raised surfaces |
| Ink `#161D22` | Primary text |
| Muted `#66727A` | Secondary text |
| Accent `#0C5C66` | Single brand action / link / eyebrow |
| Glow `#3CB8C4` | Ambient light only, large and dim |
| Bronze `#A07A45` | Drafting-instrument marks (eyebrow rules), not a second brand color |
| Cinematic `#12181C` | Selected bands only |

Readability, CTA visibility, and technical tables come first. Glow never replaces contrast.

---

## Typography

- **Vazirmatn** (SIL OFL) via `next/font/google`, self-hosted at build. No binaries in git.
- Licensed brand files still replace this later (`lib/fonts.ts` + `next/font/local`).
- Persian: no letter-spacing; open line-height (~1.85) for body.
- Display: tight tracking, balanced wrap, strong weight contrast.
- Latin/numeric: tabular figures for specs (`tabular-nums`).
- Eyebrows: small, teal, bronze rule. No fake small-caps on Persian.

---

## Spacing and layout

- Section padding: `py-14` / `sm:py-20`.
- Containers: narrow (prose), default (6xl), wide (7xl).
- Main is full-bleed; sections own their container so cinematic bands can go edge-to-edge.
- Rhythm: hero lumen → paper cards → optional cinematic metric band → utility.

---

## Surface and depth

Cards use inset highlight + soft drop shadow (physical sheet). Hover lifts ~2px and tints the shadow toward teal. No glassmorphism soup. Dividers are hairline fades, not heavy rules.

---

## Cards

One family, several intents (product, application, lab, project, article, feature). Every demo card carries a “محتوای نمایشی” badge. Media area is an abstract gradient until verified photography exists — no stock people.

---

## Motion

- Slow ambient lumen drift (~22s) on selected heroes.
- Hover on cards/buttons only.
- `prefers-reduced-motion` kills drift and shortens transitions.
- No animation libraries, no parallax engine, no canvas 3D.

---

## 3D / light treatment

- Concentric faint ring behind heroes (extrusion cue).
- Radial teal/bronze washes on the canvas, fixed, low opacity.
- Cinematic sections: graphite field + corner glow, high-contrast type.
- If a composition looks sci-fi or crypto, remove glow until it reads industrial.

---

## Accessibility

- Semantic landmarks, skip link, visible `:focus-visible` on teal.
- Cinematic text uses `cinematic-ink` / `cinematic-muted`, not low-contrast glow text.
- Forms: labels, hints, `role="alert"` on errors.
- `/verify` submit is disabled until real logic exists.

---

## Component inventory

**Foundation:** Container, Section, SectionHeader, Eyebrow, RichHeading, ContentStack, Divider, Surface  

**Layout:** SiteShell, SiteHeader, SiteFooter, DevBanner, SkipLink  

**Primitives:** Button, ButtonLink, CtaLink, Badge, Card variants  

**Blocks:** StatBlock, Callout, MediaFrame, DownloadCard, Breadcrumb, SpecTable, KeyValueGrid, StandardsRow, FaqList, form controls  

**Deferred:** licensed typefaces, photography, real product/lab data, mobile mega-menu, icon set, dark full theme (not planned).

---

## Showcase and SEO

`/design-system` is for internal review. It is omitted from `publicRoutes` / sitemap and stays noindex. When indexing is eventually enabled, `robots.ts` still disallows this path.
