# Legacy Media Migration

**Status:** Identify dependencies — **do not bulk-download** the WordPress media library  
**Date:** 2026-09-03

The new site will not keep WordPress upload paths as the long-term public media architecture. Useful files should be selected, licensed/permission-checked, and re-hosted later.

---

## Cross-host dependency (launch risk)

`https://bukanpipe.com` HTML/REST permalinks use `.com`.

RSS `/feed/` still enclosed at least:

`https://bukanpipe.ir/wp-content/uploads/2023/08/air_valve.mp4`

If HTTPS `.ir` is turned off before this object (and any other `.ir` upload) is copied or rewritten, **pages and feeds that still point at `.ir` will break**.

Assumption to verify at cutover: the same `wp-content/uploads` tree is reachable on `.com`. Do not assume every `.ir` URL has a `.com` twin without checking.

---

## Useful media classes (select later)

| Class | Why keep | Do not |
|---|---|---|
| Logo | Brand identity | Use unverified lockups as final brand files |
| Factory / production line | Trust visuals | Publish equipment brand claims from EXIF/captions without verification |
| Laboratory | Lab authority | Imply accreditation from a photo |
| Product | Catalog | Invent SKUs from a filename |
| Project | Case studies | Publish client sites without permission |
| Certificate scans | Trust | Show expired/unverified certificates |
| Catalog / datasheet photography | Downloads | Treat 2022 brochure images as current range |
| Welding / fusion stills or video | Engineering articles | Host from `.ir` after consolidation |

---

## Discovered file URLs (not a full library dump)

PDF binaries (WordPress media `mime_type=application/pdf`):

- `https://bukanpipe.com/wp-content/uploads/lana-downloads/2022/10/14427-2-1400.pdf`
- `https://bukanpipe.com/wp-content/uploads/lana-downloads/2022/10/article_286.pdf`
- `https://bukanpipe.com/wp-content/uploads/2022/10/article_204.pdf`
- `https://bukanpipe.com/wp-content/uploads/2022/10/Bukan-Pipe-Company.pdf`

Video (RSS enclosure, `.ir` host):

- `https://bukanpipe.ir/wp-content/uploads/2023/08/air_valve.mp4`

WordPress images, welding/butt-fusion/electrofusion media, certificates, and videos are now enumerated in `data/media/legacy-media.ts` (REST pages 1–2, 124 library items plus classification). A bulk binary export is still a later ops task. Do not treat WordPress upload URLs as the long-term public media architecture.

---

## Future hosting

- Prefer the canonical host `https://bukanpipe.com` (or a dedicated asset CDN on that brand).
- Do not leave public HTML pointing at `bukanpipe.ir` after host consolidation.
- Certificates and catalogs: **REQUIRES VALIDITY VERIFICATION** before offering as current downloads.
- Displayed stills load from **public WordPress URLs** on `bukanpipe.com` via `next/image` (`unoptimized`). No factory-network resolver.
- No A-grade hero still: do not migrate a low-resolution JPEG as a giant homepage photograph.

### Public media crawl

Run when `bukanpipe.com` (or `.ir` REST fallback) is reachable from your network:

```bash
npm run media:crawl
```

The script:

1. Crawls public WordPress REST `/wp-json/wp/v2/media` (primary: `.com`, secondary: `.ir`)
2. Records image URLs, filenames, dimensions, alt, source pages
3. Attempts to download the four display stills into `public/media/` when publicly accessible
4. Writes `data/media/public-crawl-log.json` with successes and failure reasons

If a download fails, the URL and reason are logged; the UI continues with the typed `sourceUrl` from `legacy-media.ts`.

| Proposed launch filename | Public WordPress source |
|---|---|
| `bukan-pipe-loading-straight-pipe.jpg` | `lifting-pipe.jpg` |
| `bukan-pipe-production-hall.jpg` | `f5.jpg` (سالن تولید) |
| `bukan-pipe-laboratory.jpg` | `QC-01.jpg` |
| `bukan-pipe-gas-pipe.jpg` | `gas5.jpg` |

Launch re-hosting to `/media/…` on the canonical domain is a separate cutover task — not a runtime fallback.

---

## Related

- `docs/IMAGE_ART_DIRECTION.md`
- `docs/PHOTOGRAPHY_GAP_REPORT.md`
- `docs/HOST_CANONICAL_POLICY.md`
- `docs/LEGACY_CONTENT_INVENTORY.md`
- `data/migration/legacy-urls.ts` (PDF and attachment records)
- `data/media/legacy-media.ts`
