# Bukan Pipe Homepage V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a production-grade, SEO-first, responsive Bukan Pipe homepage that closely follows the approved premium industrial UI direction and establishes the reusable foundation for product, project, laboratory, and knowledge pages.

**Architecture:** Build with Next.js 16.3.3 App Router, React 19.2, TypeScript, server components by default, and a small number of client components only where interaction is required. Use a token-driven CSS system with lightweight utility classes instead of a heavy UI library. Content, SEO metadata, structured data, and navigation are centralized in typed configuration so later pages can reuse the same foundation without duplication.

**Tech Stack:** Next.js 16.3.3, React 19.2, TypeScript, CSS variables + component styles, Vitest + Testing Library, Playwright for smoke/responsive checks, ESLint, next/image, Next Metadata API.

**Spec:** `docs/superpowers/specs/2026-08-27-bukanpipe-site-design.md`

## Global Constraints

- Node.js >= 20.9.
- Next.js must be 16.3.3 or newer within the 16.3 Active LTS line because 16.3.3 contains the August 2026 security fixes.
- Persian RTL is the primary experience; technical Latin values must render correctly inside RTL layouts.
- The approved visual direction is premium industrial: midnight/graphite foundation, lighter technical sections, restrained electric blue, cinematic media, NEKRAS-style technical image cards.
- Electric blue is an accent, not the dominant surface color.
- Avoid excessive glassmorphism, neon, gradients, rounded pills, and animation.
- Respect `prefers-reduced-motion`.
- No invented business facts. Unverified values must be omitted or explicitly marked as demo content in code until verified.
- Core content must render on the server and remain crawlable without client JavaScript.
- Homepage must expose one clear H1, semantic landmarks, crawlable internal links, canonical metadata, Organization schema, WebSite schema, sitemap, and robots rules.
- Mobile is designed intentionally, not produced by simply stacking the desktop layout.

---

### Task 1: Project foundation and quality gates

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `tests/smoke/home.test.tsx`

**Interfaces:**
- Produces: a bootable Next.js App Router project and test harness used by every later task.

- [ ] **Step 1: Write the failing smoke test**

```tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

test('renders a single Bukan Pipe homepage heading', () => {
  render(<HomePage />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/بوکان پایپ|جریان فردا/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/smoke/home.test.tsx`
Expected: FAIL because the project/page does not yet exist.

- [ ] **Step 3: Bootstrap the minimal app**

Create scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

The initial `app/page.tsx` should render only a semantic `<main>` and one `<h1>` so the test can turn green before visual work begins.

- [ ] **Step 4: Run unit test, typecheck, lint and build**

Run:
- `npm test -- tests/smoke/home.test.tsx`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

Expected: all PASS.

- [ ] **Step 5: Commit**

Commit message: `chore: bootstrap Bukan Pipe Next.js foundation`

---

### Task 2: Typed site configuration and SEO core

**Files:**
- Create: `src/config/site.ts`
- Create: `src/lib/seo.ts`
- Create: `src/components/seo/structured-data.tsx`
- Modify: `app/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `tests/seo/site-seo.test.ts`

**Interfaces:**
- Produces: `siteConfig`, `buildMetadata()`, JSON-LD render helpers, sitemap and robots output.

- [ ] **Step 1: Write failing SEO tests**

```ts
import { buildMetadata } from '@/src/lib/seo';
import { siteConfig } from '@/src/config/site';

test('uses bukanpipe.ir as the canonical production origin', () => {
  expect(siteConfig.url).toBe('https://bukanpipe.ir');
});

test('homepage metadata targets polyethylene pipe intent without keyword stuffing', () => {
  const metadata = buildMetadata({
    title: 'لوله پلی اتیلن بوکان پایپ',
    description: 'تولید لوله‌های پلی اتیلن برای آبرسانی، گازرسانی، کشاورزی و زیرساخت.'
  });
  expect(metadata.alternates?.canonical).toBe('https://bukanpipe.ir/');
  expect(String(metadata.title)).toContain('لوله پلی اتیلن');
});
```

- [ ] **Step 2: Run tests and verify RED**

Expected: FAIL because `siteConfig` and `buildMetadata` do not exist.

- [ ] **Step 3: Implement minimal typed SEO core**

`siteConfig` must contain only stable public identity fields. Do not place mock phone numbers, fake project counts, fake production capacities, or mock addresses in it.

`buildMetadata()` must set:
- metadata base
- title
- description
- canonical
- Open Graph type/site name/locale
- Twitter summary card
- robots defaults

- [ ] **Step 4: Add server-rendered structured data**

Render `Organization` and `WebSite` JSON-LD from `siteConfig`. Include only verified fields.

- [ ] **Step 5: Add `robots.ts` and `sitemap.ts`**

V1 sitemap must include `/` only until real child routes are implemented. Do not publish placeholder URLs for future pages.

- [ ] **Step 6: Verify GREEN**

Run tests, typecheck, lint and build.

- [ ] **Step 7: Commit**

Commit message: `feat: add SEO metadata and structured data foundation`

---

### Task 3: Design tokens, RTL shell, header and footer

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `app/globals.css`
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/components/ui/container.tsx`
- Create: `tests/layout/site-shell.test.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `SiteHeader`, `SiteFooter`, `Container`, global visual tokens.

- [ ] **Step 1: Write failing semantic shell tests**

```tsx
render(<SiteHeader />);
expect(screen.getByRole('navigation', { name: /ناوبری اصلی/ })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /دریافت استعلام/ })).toBeInTheDocument();
```

- [ ] **Step 2: Verify RED**

Expected: FAIL because shell components do not exist.

- [ ] **Step 3: Implement tokens and RTL base**

Define tokens for:
- midnight, graphite, slate, off-white, muted text, electric blue
- 18px/22px radii
- container widths
- spacing scale
- typography scale
- border and shadow primitives

Set `<html lang="fa" dir="rtl">` and a Persian-first font stack with a technical Latin fallback. Avoid runtime font dependencies that can block first render.

- [ ] **Step 4: Implement accessible header/footer**

Header must support desktop navigation and a compact mobile menu. Use a client component only for mobile-menu state. Keep all actual links as semantic anchors.

- [ ] **Step 5: Verify GREEN and commit**

Commit message: `feat: establish Bukan Pipe design system and site shell`

---

### Task 4: Cinematic hero, trust signals and product-card system

**Files:**
- Create: `src/content/home.ts`
- Create: `src/components/home/hero.tsx`
- Create: `src/components/home/trust-strip.tsx`
- Create: `src/components/home/product-card.tsx`
- Create: `src/components/home/product-grid.tsx`
- Create: `tests/home/hero-products.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: typed `homeContent`, `Hero`, `TrustStrip`, `ProductCard`, `ProductGrid`.

- [ ] **Step 1: Write failing tests for homepage hierarchy**

Tests must confirm:
- exactly one H1
- primary quote CTA exists
- product section has a semantic H2
- four primary application cards are represented: آبرسانی، گازرسانی، کشاورزی، فاضلاب و زهکشی
- cards expose crawlable links rather than click-only divs

- [ ] **Step 2: Verify RED**

- [ ] **Step 3: Implement server-rendered hero**

Visual target:
- image-led cinematic composition
- large Persian display headline based on `زیرساختی برای جریان فردا`
- restrained blue emphasis
- two CTAs
- technical hotspot styling may be rendered as decorative labels, but no unverified values are published as facts
- hero image uses `next/image` with explicit dimensions/sizes and priority only for the LCP image

- [ ] **Step 4: Implement NEKRAS-inspired product cards**

Each card has:
- image area
- category badge
- title
- short application copy
- technical footer slots
- subtle border
- hover image zoom and arrow motion
- no essential information hidden exclusively on hover

For V1, technical values with no authoritative verification must be omitted or visibly represented as `مشخصات فنی` links rather than invented numbers.

- [ ] **Step 5: Verify GREEN and commit**

Commit message: `feat: build premium hero and product application cards`

---

### Task 5: Light technical rhythm, laboratory and project storytelling

**Files:**
- Create: `src/components/home/featured-material.tsx`
- Create: `src/components/home/laboratory.tsx`
- Create: `src/components/home/project-card.tsx`
- Create: `src/components/home/projects.tsx`
- Create: `tests/home/technical-projects.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: homepage middle section with light/dark visual rhythm and reusable project-card component.

- [ ] **Step 1: Write failing tests**

Confirm:
- PE100 feature section has an H2 and technical-detail link
- laboratory section contains a clear laboratory CTA
- projects section renders a heading and project cards as links
- no fake project numbers are present in the default content fixture

- [ ] **Step 2: Verify RED**

- [ ] **Step 3: Build the off-white PE100 feature section**

Use a high-contrast off-white surface to break the dark rhythm. The component supports optional spec values but does not render rows whose values are not verified.

- [ ] **Step 4: Build laboratory storytelling section**

Use the approved `دقت را اندازه می‌گیریم` direction and make the credibility content evidence-led. Do not claim ISO/IEC 17025 in production copy until it is confirmed from the company's authoritative material during content migration.

- [ ] **Step 5: Build project cards**

Cards are visually similar in information density to the user's NEKRAS city cards, adapted to industrial projects. The API accepts project name, application, media, year, material, diameter and length as optional fields; absent fields are not rendered.

- [ ] **Step 6: Verify GREEN and commit**

Commit message: `feat: add technical, laboratory and project storytelling sections`

---

### Task 6: Knowledge teaser, product finder, final CTA and complete homepage

**Files:**
- Create: `src/components/home/knowledge.tsx`
- Create: `src/components/home/product-finder.tsx`
- Create: `src/components/home/final-cta.tsx`
- Create: `src/lib/product-finder.ts`
- Create: `tests/home/product-finder.test.ts`
- Create: `tests/home/homepage-semantics.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `recommendProduct(input)` pure function and complete homepage composition.

- [ ] **Step 1: Write failing product-finder test**

```ts
expect(recommendProduct({ application: 'water', diameter: '', pressure: '' }))
  .toEqual({ status: 'needs-more-data' });
```

The first version must never invent a pipe specification. When verified product rules are absent, the finder guides the visitor to request technical consultation.

- [ ] **Step 2: Verify RED**

- [ ] **Step 3: Implement minimal finder behavior**

The finder is progressive enhancement: form labels and inputs remain usable, and its default outcome is a safe consultation CTA until verified selection rules are provided.

- [ ] **Step 4: Add knowledge cards**

Use future SEO topics as titles only where they correspond to real planned routes; if article routes do not exist yet, render non-clicking teaser cards or hide the section from production links to avoid dead URLs.

- [ ] **Step 5: Add final CTA and homepage composition**

Ensure logical heading hierarchy H1 → H2, clear landmarks, no duplicate IDs, no empty links.

- [ ] **Step 6: Verify GREEN and commit**

Commit message: `feat: complete homepage conversion and knowledge experience`

---

### Task 7: Responsive, accessibility and performance verification

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/homepage.spec.ts`
- Modify: responsive styles as required
- Create: `README.md`

**Interfaces:**
- Produces: automated browser smoke suite and documented local workflow.

- [ ] **Step 1: Write failing Playwright smoke tests**

Test desktop and mobile viewports for:
- homepage responds successfully
- one H1
- primary CTA visible
- no horizontal document overflow
- mobile navigation is operable with keyboard
- reduced-motion mode does not hide content

- [ ] **Step 2: Run E2E and verify RED where responsive behavior is missing**

- [ ] **Step 3: Fix responsive/accessibility issues minimally**

Target breakpoints are content-driven. At minimum verify 390px, 768px, 1280px, and 1440px widths.

- [ ] **Step 4: Final quality gate**

Run:
- `npm test`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run test:e2e`

Expected: all PASS with no console errors attributable to the application.

- [ ] **Step 5: Document content replacement rules**

README must explain where to replace temporary imagery and how to add only verified business facts.

- [ ] **Step 6: Commit**

Commit message: `test: verify responsive accessible homepage release`

---

## Phase-1 Definition of Done

The phase is complete only when:
- the homepage visually follows the approved design direction rather than a generic factory template;
- dark and light sections have deliberate visual rhythm;
- cards preserve the NEKRAS-inspired information architecture while feeling industrial;
- mobile and desktop are intentionally composed;
- all visible business claims are verified or omitted;
- server-rendered semantic content is available to crawlers;
- canonical metadata, robots, sitemap, Organization/WebSite structured data are present;
- unit tests, typecheck, lint, production build and browser smoke tests pass;
- the work exists on a feature branch and is reviewed before merge.

## Deferred to follow-up plans

- Full product taxonomy and product detail pages
- Size/diameter SEO landing pages
- Price and quote workflow backed by real data
- Full project archive and Iran map with verified locations
- Laboratory/certification archive
- Knowledge center article templates and content migration
- `.com` to `.ir` redirect map after domain access is recovered
- Search Console/GA4 deployment credentials and production deployment
