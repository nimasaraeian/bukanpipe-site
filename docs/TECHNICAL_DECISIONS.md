# Technical Decisions

Architecture Decision Records for the Bukan Pipe digital platform. Newer dated entries win when documents conflict.

## ADR-001 — Greenfield rebuild

**Date:** 2026-09-01  
**Status:** Accepted

Do not continue the legacy frontend architecture, WordPress theme, plugins or layouts. Build a new application in this repository.

## ADR-002 — Next.js + React + TypeScript

**Date:** 2026-09-01  
**Status:** Accepted

Implementation stack is Next.js (current stable: 16.3.4), React 19 and TypeScript. This matches the project charter and technical architecture.

## ADR-003 — App Router

**Date:** 2026-09-01  
**Status:** Accepted

Use the Next.js App Router. File-system routes, metadata APIs, `robots.ts` and `sitemap.ts` are first-class SEO architecture.

## ADR-004 — Server Components by default

**Date:** 2026-09-01  
**Status:** Accepted

Server Components are the default. `"use client"` is only for genuine interaction. Phase 001 contains no client components.

## ADR-005 — SEO-first rendering

**Date:** 2026-09-01  
**Status:** Accepted

Public pages must be server-rendered indexable HTML with metadata, canonical URLs, sitemap, robots and structured-data helpers from the first implementation phase.

## ADR-006 — Persian-first RTL

**Date:** 2026-09-01  
**Status:** Accepted

Current public language is Persian. Document language is `fa` and direction is `rtl`. English, Arabic and Sorani are future work, not current routes.

## ADR-007 — No CMS in initial implementation

**Date:** 2026-09-01  
**Status:** Accepted

Models are CMS-ready. No CMS is installed until operational need is approved.

## ADR-008 — No database in initial implementation

**Date:** 2026-09-01  
**Status:** Accepted

No database, auth or external API in Phase 001. Local typed collections are sufficient.

## ADR-009 — Legacy website used only for selective migration

**Date:** 2026-09-01  
**Status:** Accepted

Legacy `bukanpipe.com` is a source for URLs, SEO equity, useful content, product information, documents and imagery. It is not the application being developed. Migration is a later phase.

## ADR-010 — Business facts require verification

**Date:** 2026-09-01  
**Status:** Accepted

No industrial claim is published without evidence. Unverified data stays out of pages, schema and marketing copy. See `research/FACTS_TO_VERIFY.md`.

## ADR-011 — Indexing disabled until launch approval

**Date:** 2026-09-03  
**Status:** Accepted

`NEXT_PUBLIC_ALLOW_INDEXING` defaults to false. Robots and page metadata are `noindex` so accidental preview deploys cannot index thin foundation pages.

## ADR-012 — No trailing slash

**Date:** 2026-09-03  
**Status:** Accepted

Canonical URLs omit trailing slashes except for the origin root. `trailingSlash: false` in Next.js. Redirect mapping in the migration phase must respect this.

## ADR-013 — System font stack until licensed files are approved

**Date:** 2026-09-03  
**Status:** Superseded in part by ADR-026

Do not download random Persian fonts or commit commercial font binaries. `lib/fonts.ts` remains the install point for `next/font/local` after licensing approval.

## ADR-026 — Vazirmatn via next/font until brand files exist

**Date:** 2026-09-03  
**Status:** Accepted  
**Related:** ADR-013

Phase 004 loads **Vazirmatn** (SIL OFL) with `next/font/google`. Next.js self-hosts the files at build; nothing is committed to git. This is a typography quality decision for Persian/Latin UI, not a substitute for licensed brand type. When licensed files arrive, swap in `next/font/local` in `lib/fonts.ts`.

## ADR-027 — Luminous Precision design language

**Date:** 2026-09-03  
**Status:** Accepted

The UI is a light industrial editorial system: warm canvas, graphite ink, one Caspian teal accent, bronze as a drafting mark, selective lumen and one cinematic band. No animation libraries. `/design-system` is internal (noindex, not in sitemap). See `docs/DESIGN_DIRECTION_EXPLORATION.md` and `docs/DESIGN_SYSTEM.md`.

## ADR-014 — `/verify` and `/export` are not Phase 001 routes

**Date:** 2026-09-03  
**Status:** Superseded by ADR-019

Phase 001 did not implement `/verify` or `/export`. Export remains unimplemented. `/verify` is now an approved foundation route.

## ADR-017 — Production target domain

**Date:** 2026-09-03  
**Status:** Accepted

The approved production target is `https://bukanpipe.com`. Runtime canonicals still use `NEXT_PUBLIC_SITE_URL` (localhost in development). Preview and staging must keep `NEXT_PUBLIC_ALLOW_INDEXING=false` until explicit launch approval.

## ADR-018 — Display brand

**Date:** 2026-09-03  
**Status:** Accepted

Display brand is **Bukan Pipe** / **بوکان پایپ**. Legal Persian company name remains unverified and must not be invented. Working lines are provisional strategic messaging and must be read from `siteConfig`, not copied through the app.

## ADR-019 — `/verify` foundation; `/export` still deferred

**Date:** 2026-09-03  
**Status:** Accepted  
**Supersedes:** ADR-014 for `/verify`

Project Lead approved `/verify` in the long-term architecture. Phase 002 adds a route foundation only (no database, no verification logic). `/export` and `/export/iraq` remain deferred and stay out of the sitemap.

## ADR-020 — Sitemap enumerates launch-indexable implemented routes only

**Date:** 2026-09-03  
**Status:** Accepted

`app/sitemap.ts` uses `sitemapRoutes`: implemented pages with `includeInSitemap`. Planned children and deferred export URLs are specified in docs and `plannedRoutes` / `deferredRoutes` but are not emitted. Robots still noindex the site until launch.

## ADR-021 — URL slug conventions

**Date:** 2026-09-03  
**Status:** Accepted

Lowercase Latin hyphenated slugs, no file extensions, no dates, no indexable query strings, no trailing slash except origin `/`. One object lives in one taxonomy. Diameter landing URLs are not committed.


## ADR-015 — Independent Git repository at the project root

**Date:** 2026-09-03  
**Status:** Accepted

`C:\Users\USER\Documents\bukanpipe` is its own Git repository. It is not connected to the legacy website remote. GitHub remote setup is pending Project Lead approval. A parent Git repository at the user home directory is not used for this project.

`next.config.ts` also sets `turbopack.root` to this directory so Next.js does not treat the home-directory Git/lockfile boundary as the workspace root.

## ADR-022 — Canonical host policy is documented, not activated

**Date:** 2026-09-03  
**Status:** Accepted

The intended primary host is `https://bukanpipe.com`. Alternate hosts (`www`, HTTP, `bukanpipe.ir`) should eventually 301 to that origin. Implementation waits for DNS/hosting/legal control. HTTPS `.ir` currently still serves duplicate HTML. See `docs/HOST_CANONICAL_POLICY.md`.

## ADR-023 — Data-driven legacy redirects stay disabled

**Date:** 2026-09-03  
**Status:** Accepted

Legacy path mappings live in `data/migration/legacy-urls.ts`. Next.js `redirects()` consumes `getNextLegacyRedirects()`, which returns an empty list unless `ENABLE_LEGACY_REDIRECTS=true`. Do not enable until destination pages exist and launch checklists pass. Do not 301 leftovers to the homepage.

## ADR-024 — Tool pages vs engineering pages

**Date:** 2026-09-03  
**Status:** Accepted

A tool URL owns calculator/action intent. An engineering URL owns educational/explanatory intent. The pair may interlink but must not duplicate primary content. Applies to pipe sizing, pressure loss, flow, weight, SDR/PN helpers, and future calculators. Planned slugs remain `/tools/pipe-sizing` and `/tools/pressure-loss`.

## ADR-025 — PE100 is not a committed commercial URL

**Date:** 2026-09-03  
**Status:** Accepted

`/products/pe100` stays PLANNED / REQUIRES RESEARCH. Phase 003 found no legacy PE100 permalink. Do not build or receive redirects onto that path until the factory confirms relevant PE100 products and a standalone URL will not cannibalize family pages.

## ADR-016 — Lightweight Vitest for SEO/schema helpers

**Date:** 2026-09-03  
**Status:** Accepted

Vitest is a devDependency only. It exists to lock canonical URL behavior, prevent structured-data helpers from emitting invented fields, and validate the legacy migration inventory (duplicate paths, chains, loops, invalid destinations). It is not a full testing platform.
