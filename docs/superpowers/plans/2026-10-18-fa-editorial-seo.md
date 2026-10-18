# Persian editorial and textual SEO plan

**Goal:** Improve Persian visitor-facing copy, reduce redundant explanations and clarify search descriptions without changing site design or behavior.

**Architecture:** Edit existing copy literals in the dictionary, content seeds, product presentation data and the existing home component. Keep routes, component structure, content block types, links, media references, technical tables and executable logic unchanged.

**Tech stack:** Next.js, TypeScript, Vitest.

**Spec:** User instruction in this session: Persian wording, repetition and textual SEO only; no image, layout or functional changes. Uploaded company catalogue is the reference for existing product descriptions, not evidence of current certificate validity.

## Tasks
- [x] Review existing source and run baseline checks.
- [x] Polish home, product presentation, company, laboratory and resource copy.
- [x] Edit article and application prose for clarity, repetition and consistent terminology.
- [x] Review generated size-page copy and search descriptions without changing calculation or catalogue data.
- [x] Verify changed syntax differs only in Persian text literals, with no media, route, numerical-table or English-copy changes.
- [x] Run tests, typecheck, lint and production build; review diff and prepare branch/PR summary.

Verification: 934 tests pass; typecheck and production build pass. Lint reports the same 21 errors and 5 warnings as an untouched archive of HEAD; no new findings. Independent review completed. AST comparison confirms 307 changed Persian text literals across 20 source files, with syntax structure unchanged.

## Review focus
- Existing engineering values and tables remain unchanged.
- No current certificate validity inferred solely from the catalogue.
- Search keywords and URL ownership remain intact.
- Dynamic placeholders and template expressions remain intact.
- Concise copy still accurately describes each page; no new products or services are invented.
