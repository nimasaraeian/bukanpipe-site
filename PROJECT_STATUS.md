# Project Status

**Project:** Bukan Pipe Digital Transformation  
**Start:** 2026-09-01  
**Current phase:** Legacy URL Migration & Redirect Architecture (Phase 003) — complete with blockers; awaiting Project Lead review  
**Production migration:** Not started — **NOT READY** until Search Console review, backlink review, and domain/hosting control  
**Legacy site:** Remains live until launch. This repository does not modify it.  
**Production target domain:** `https://bukanpipe.com`  
**Indexing:** `NEXT_PUBLIC_ALLOW_INDEXING` remains false until explicit launch approval  
**Legacy path redirects:** `ENABLE_LEGACY_REDIRECTS` remains false

## Decisions already made

- Greenfield rebuild; do not continue the legacy frontend architecture.
- Next.js + React + TypeScript.
- Legacy SEO equity preserved through content inventory and 301 redirect mapping.
- Website designed as engineering authority + lead-generation platform.
- Cursor works in gated phases; no “build the whole site” prompt.
- No industrial claim without evidence.
- Production target domain is `https://bukanpipe.com`.
- Display brand is Bukan Pipe / بوکان پایپ. Legal Persian name is not verified.
- Working line «زیرساختی برای جریان فردا» is provisional.
- `/verify` is in the long-term IA and has a Phase 002 route foundation. It is not a live verification checker.
- `/export` is planned in docs only; not implemented.
- System fonts remain until a later licensed-font phase (not Phase 003).
- `bukanpipe.ir` must not operate as an independent duplicate site; host 301s wait for ownership/hosting/legal confirmation.
- Agriculture and irrigation remain separate planned intents; those pages are not built.
- Gas pipe is the first product family to prioritize for factual verification.
- PE100 remains PLANNED / REQUIRES RESEARCH — no legacy URL discovered, no commercial page committed.
- Tool pages own calculator intent; engineering pages own educational intent.

## Phase 001 — APPROVED

Greenfield Next.js foundation, RTL, SEO helpers, empty content models, development route shells. Reviewed and approved by the Project Lead.

## Phase 002 — APPROVED

Definitive SEO/IA specification and route registry. Sitemap excludes planned children and export. `/verify` foundation only. Keyword metrics remain unknown pending external data.

## Phase 003 outcome

Read-only legacy audit and data-driven redirect architecture (disabled):

- `docs/HOST_CANONICAL_POLICY.md`
- `docs/LEGACY_REDIRECT_MAP.md`
- `docs/LEGACY_CONTENT_INVENTORY.md`
- `docs/LEGACY_MEDIA_MIGRATION.md`
- `docs/SEARCH_CONSOLE_MIGRATION_CHECKLIST.md`
- `docs/SEO_MIGRATION_LAUNCH_CHECKLIST.md`
- `data/migration/legacy-urls.ts`
- `lib/migration/*` validation + Next.js redirect loader (empty unless explicitly enabled)

HTTPS `bukanpipe.ir` still serves duplicate HTML. Legacy sitemap returns HTTP 500. Backlinks UNKNOWN. Search Console not connected.

## Open dependencies

- Search Console / analytics access — **required before final migration**.
- Backlink dataset — currently UNKNOWN.
- Confirmed DNS/hosting control for `.com` and `.ir` before host redirects.
- Verified product master data (no family is VERIFIED). Gas pipe is first to verify.
- Current certificates / laboratory scope (lab-scope prices must not be republished).
- Project / customer evidence and publication permission.
- Official dealer list and verification keys.
- Confirm current sales/lab contact channels (do not copy legacy numbers yet).
- `https://www.bukanpipe.com/` behavior still UNKNOWN.
- External keyword volume/difficulty/rank dataset.
- Licensed brand fonts (later phase).
- GitHub remote if the repository should leave local-only status.

## Hard stop

Do not start Design System, homepage production design, commercial product pages, laboratory detail content, RFQ backend, live redirects, indexing, or production deploy until Phase 003 is explicitly approved.
