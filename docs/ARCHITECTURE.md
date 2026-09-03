# Architecture — Bukan Pipe Digital Industrial Platform

## Project purpose

This repository is the greenfield web application for the Bukan Pipe digital platform. The long-term product is an industrial growth system that must work as:

1. a search engine surface for qualified demand
2. an engineering resource
3. a trust platform (factory, quality, laboratory, projects)
4. a sales engine that converts into structured RFQs

The north-star metric is **qualified RFQs from organic search**. Traffic alone is not the objective.

The legacy website at bukanpipe.com is not the codebase being continued. It remains a later source for URL equity, content, documents and redirect mapping.

## Technology choices

| Choice | Decision |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript, strict |
| Styling | Tailwind CSS 4 |
| Hosting target | Vercel |
| Rendering | Server Components by default; static/server HTML for SEO content |
| State library | None |
| CMS | Not in this phase |
| Database | Not in this phase |
| Auth | Not in this phase |

These choices follow `docs/13-technical-architecture.md` and `docs/18-decision-log.md`.

## Directory structure

```text
app/                 routes, layout, robots, sitemap
components/layout/   shell, header, footer, section primitives
components/ui/       buttons, cards, forms, technical blocks
components/media/    signature, editorial image, hero compositions
lib/design/          demo copy helpers
lib/fonts.ts         Vazirmatn (OFL) via next/font; local brand files later
lib/media/           image sizes and crop helpers
components/seo/      JSON-LD rendering
content/models/      typed content models
data/                local collections (empty until verified)
data/media/          legacy media inventory and grades
data/migration/      typed legacy URL inventory (redirects disabled)
lib/config/          site, env, routes
lib/migration/       redirect derivation and mapping validation
lib/seo/             metadata, canonical, OG specs, image sitemap helper
lib/schema/          structured-data builders
lib/validation/      future form result types
docs/                strategy, IA, host policy, migration checklists
research/            findings and verification register
cursor/              gated implementation prompts
backlog/             prioritized work
```

Folders are created only when they have a current purpose. Product, laboratory, project and form component areas will be added when those phases start.

## Rendering philosophy

- Server Components are the default.
- Client Components are allowed only when interaction requires the browser.
- Public marketing and technical pages must remain crawlable HTML.
- A React SPA is rejected because the SEO surface (products, applications, engineering, laboratory, projects, knowledge, tools) is a core architecture requirement.

## RTL strategy

- Current public language is Persian (`fa`).
- Document direction is `rtl` on `<html>`.
- Layout uses logical CSS where custom styles are required.
- Routing is not localized yet. `siteConfig.plannedLocales` records English, Arabic and Kurdish Sorani as future work so later i18n does not require a rewrite.
- Do not add fake translated pages.

## SEO architecture

SEO is implemented as application architecture, not a plugin.

- `lib/seo/metadata.ts` builds titles, descriptions, canonicals, robots, Open Graph and Twitter fields.
- `lib/seo/canonical.ts` builds absolute canonical URLs from `NEXT_PUBLIC_SITE_URL`.
- `app/robots.ts` and `app/sitemap.ts` are generated routes.
- Indexing is off until `NEXT_PUBLIC_ALLOW_INDEXING=true`. Thin foundation pages must not be crawled if a preview is deployed accidentally.
- Internal links use `next/link` and implemented `publicRoutes`.
- Sitemap emits `sitemapRoutes` only (implemented, launch-indexable). Planned and deferred URLs stay out.
- IA, keyword owners, URL map and redirect inventory: `docs/SEO_INFORMATION_ARCHITECTURE.md`, `docs/SEO_KEYWORD_PAGE_MAP.md`, `docs/URL_MASTER_MAP.md`, `docs/LEGACY_REDIRECT_MAP.md`, `docs/HOST_CANONICAL_POLICY.md`.
- Path redirects are data-driven and **disabled** (`ENABLE_LEGACY_REDIRECTS`).

## Content architecture

Until a CMS is approved, content is typed TypeScript in `content/models/` with collections in `data/`.

Models: `Product`, `Application`, `Project`, `LaboratoryTest`, `Standard`, `Article`.

Collections are empty. Empty is valid. Invented products, diameters, PN/SDR values, projects, certificates or testimonials are forbidden.

## Structured data approach

Helpers exist for `Organization`, `WebSite`, `Product`, `Article`, `BreadcrumbList` and project/case-study `CreativeWork`.

Rules:

- Emit only fields that are known.
- Do not invent address, logo, social profiles, offers, ratings, accreditation or client names.
- JSON-LD is serialized with `<` escaped before injection.

## Performance principles

- Minimal client JavaScript in this phase (no `"use client"` in the foundation shell).
- System font stack until licensed files are approved; no remote font downloads.
- No animation libraries, UI kits, Redux, or CMS clients.
- `next/image` is available for later verified imagery.
- Tailwind is the only styling dependency.

## Accessibility principles

- Semantic landmarks: skip link, header, main, footer, named development navigation.
- Visible `:focus-visible` styles.
- Language and direction set on the document.
- One `h1` per route shell.
- `prefers-reduced-motion` disables non-essential motion globally.
- Future forms should use `lib/validation/types.ts` and accessible label/error wiring; no RFQ form is implemented here.

## Future CMS readiness

Field names on content models are the contract. A later CMS should map to these types rather than inventing a parallel schema. No CMS client, webhook or preview system is included yet.

## Future localization readiness

- Locale and direction live in one config module.
- Copy is not hardcoded across dozens of files for brand/SEO defaults.
- No `/en` or `/ar` route tree yet.
- URL policy (no trailing slash, English slugs for IA stability) is documented so translated paths can be added later without breaking Persian canonicals.

## Deferred routes

`/verify` is an implemented foundation route (Phase 002). `/export` remains deferred. Planned children are listed in `lib/config/routes.ts` (`plannedRoutes`) and `docs/URL_MASTER_MAP.md`; they are not App Router pages and are not in the sitemap.

Definitive IA: `docs/SEO_INFORMATION_ARCHITECTURE.md`.

