# Legacy Redirect Map (skeleton)

**Status:** Phase 002 skeleton — **redirects are not activated**  
**New URL policy:** no trailing slash (ADR-012)  
**Source of URLs:** project research register (`research/SOURCES.md`) plus read-only confirmation of those same URLs on 2026-09-03

This is not a crawl of the full legacy site. Additional URLs require a dedicated inventory (Phase 003 in the execution plan: URL Migration & Redirect Architecture).

Do not guess sitemaps, pagination, or WordPress leftovers.

---

## Confirmed legacy URLs

| Old URL | Content type | Proposed new URL | Action | Confidence | Notes |
|---|---|---|---|---|---|
| `https://bukanpipe.com/` | Homepage | `/` | UPDATE | CONFIRMED | Same path. Replace brochure homepage; do not copy invented stats or testimonials. |
| `https://bukanpipe.com/gas-pipe/` | Product article | `/products/gas-pipe` | UPDATE then 301 | CONFIRMED | Live on inspection. New page only after production/standards/approvals are verified. Trailing slash drops. |
| `https://bukanpipe.com/qc-and-laboratory/` | Laboratory / QC | `/laboratory` | UPDATE then 301 | CONFIRMED | Live on inspection. Accreditation claims must be re-verified before reuse. |
| `https://bukanpipe.com/about_us/` | About | `/about` | UPDATE then 301 | CONFIRMED | Underscore slug → `/about`. History, capacity and awards on this page are unverified for republication. |

---

## Observed but not mapped as separate URLs

Read-only inspection of the four URLs above also showed contact blocks, a laboratory email, and homepage timeline/testimonial modules. Those are **content objects**, not confirmed extra routes.

A full crawl may later find WordPress category, attachment, or query URLs. Those should be added here with `NEEDS CRAWL` until listed.

---

## Known unknown hosts

| Host | Action | Confidence | Notes |
|---|---|---|---|
| `bukanpipe.ir` | REVIEW | NEEDS CRAWL | Role vs `.com` is unverified. Do not create duplicate indexable sites. |

---

## Action definitions

| Action | Meaning |
|---|---|
| KEEP | Path stays; content may still be rewritten |
| UPDATE | Content must be rebuilt against verified facts |
| MERGE | Multiple old URLs collapse onto one new URL |
| 301 | Redirect old → new at launch |
| REVIEW | Decision blocked on data |

---

## Redirect implementation

Not in Phase 002. When implemented, preserve:

- HTTPS
- Strip trailing slashes to match new canonicals
- Map `about_us` → `about`
- Map `gas-pipe` → `products/gas-pipe` only if that family is approved to exist; otherwise REVIEW a safer hub (`/products` or `/applications/gas-distribution`)
- Do not 301 unverified product claims onto a page that states them as fact
