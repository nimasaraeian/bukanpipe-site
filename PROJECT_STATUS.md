# Project Status

**Project:** Bukan Pipe Digital Transformation  
**Start:** 2026-09-01  
**Current phase:** Authentic premium image system (post–Phase 004) — inventory, art direction, visual signature, design-system integration complete; awaiting Project Lead review  
**Production migration:** Not started — **NOT READY** until Search Console review, backlink review, and domain/hosting control  
**Legacy site:** Remains live until launch. This repository does not modify it.  
**Production target domain:** `https://bukanpipe.com`  
**Indexing:** `NEXT_PUBLIC_ALLOW_INDEXING` remains false until explicit launch approval  
**Legacy path redirects:** `ENABLE_LEGACY_REDIRECTS` remains false  
**Internal design showcase:** `/design-system` (noindex)

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
- Visual language is **Luminous Precision** (Phase 004). Licensed brand fonts still pending; Vazirmatn (OFL) is the interim UI face.
- `bukanpipe.ir` must not operate as an independent duplicate site; host 301s wait for ownership/hosting/legal confirmation.
- Agriculture and irrigation remain separate planned intents; those pages are not built.
- Gas pipe is the first product family to prioritize for factual verification.
- PE100 remains PLANNED / REQUIRES RESEARCH — no legacy URL discovered, no commercial page committed.
- Tool pages own calculator intent; engineering pages own educational intent.

## Phase 001 — APPROVED

Greenfield Next.js foundation, RTL, SEO helpers, empty content models, development route shells.

## Phase 002 — APPROVED

Definitive SEO/IA specification and route registry.

## Phase 003 — APPROVED

Read-only legacy audit, typed redirect inventory, disabled path redirects, host policy. Final production migration remains NOT READY (Search Console, backlinks, domain control).

## Phase 004 outcome

Design direction selected and implemented on existing shells. Internal showcase at `/design-system`. Not final homepage, product, or laboratory production.

- `docs/DESIGN_DIRECTION_EXPLORATION.md`
- `docs/DESIGN_SYSTEM.md`

## Authentic image system (post–004)

Legacy WordPress media audited. No A-grade hero photograph. Homepage/design-system use the pipe visual signature plus small authentic B/C stills. Stock photography was not used.

- `data/media/legacy-media.ts`
- `docs/IMAGE_ART_DIRECTION.md`
- `docs/PHOTOGRAPHY_GAP_REPORT.md`

## Open dependencies

- Search Console / analytics access — **required before final migration**.
- Backlink dataset — currently UNKNOWN.
- Confirmed DNS/hosting control for `.com` and `.ir` before host redirects.
- Verified product master data (no family is VERIFIED). Gas pipe is first to verify.
- Current certificates / laboratory scope (lab-scope prices must not be republished).
- Project / customer evidence and publication permission.
- Official dealer list and verification keys.
- Confirm current sales/lab contact channels (do not copy legacy numbers yet).
- Licensed brand fonts (replace Vazirmatn when files exist).
- Professional factory photography (no A-grade hero still exists; see `docs/PHOTOGRAPHY_GAP_REPORT.md`).
- Local migration of selected B/C stills into `public/media/` with descriptive filenames.
- GitHub remote if the repository should leave local-only status.

## Hard stop

Do not start final Homepage production, Product pages, or Laboratory pages until Phase 004 is explicitly approved.
