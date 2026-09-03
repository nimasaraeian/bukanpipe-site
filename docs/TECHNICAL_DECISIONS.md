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
**Status:** Accepted

Do not download random Persian fonts or commit commercial font binaries. `lib/fonts.ts` is the install point for `next/font/local` after licensing approval.

## ADR-014 — `/verify` and `/export` are not Phase 001 routes

**Date:** 2026-09-03  
**Status:** Accepted

**Conflict:** `docs/08-information-architecture.md` and `docs/19-brand-defense.md` include `/verify/` and `/export/`. The Phase 001 execution prompt lists a smaller set of route foundations and forbids export localization.

**Resolution:** Follow the more recent Phase 001 scope. Record the deferred paths in `lib/config/routes.ts` (`deferredRoutes`) without creating pages.

## ADR-015 — Independent Git repository at the project root

**Date:** 2026-09-03  
**Status:** Accepted

`C:\Users\USER\Documents\bukanpipe` is its own Git repository. It is not connected to the legacy website remote. GitHub remote setup is pending Project Lead approval. A parent Git repository at the user home directory is not used for this project.

`next.config.ts` also sets `turbopack.root` to this directory so Next.js does not treat the home-directory Git/lockfile boundary as the workspace root.

## ADR-016 — Lightweight Vitest for SEO/schema helpers

**Date:** 2026-09-03  
**Status:** Accepted

Vitest is a devDependency only. It exists to lock canonical URL behavior and to prevent structured-data helpers from emitting invented fields. It is not a full testing platform.
