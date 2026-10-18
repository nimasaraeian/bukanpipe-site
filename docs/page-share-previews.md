# Page-specific link previews

`createPageMetadata` uses a distinct 1200×630 JPEG for each locale/path in `data/social/pages.json`. Cards display the page title with its existing hero image. Certificates use the supplied ISO 9001 scan; downloads use the supplied water-pipe standard licence. These are social-only cards; page photographs and UI remain unchanged.

`npm run build` regenerates the manifest and images before Next.js builds. The manifest is derived from published catalogs and implemented routes. Filenames hash the locale, path, title, selected photo bytes, renderer and font bytes, so source changes produce a fresh image URL. Open Graph and Twitter use the same image, localized alt text and accurate dimensions. Generated `/public/media/social/` assets are ignored by Git and included in the deployment's public output.

For a fresh local development checkout, run `npm run media:social-manifest` and `npm run media:social` before previewing share images. When editing the catalogs, regenerate the manifest before running tests; coverage tests enforce public-route/title alignment.

Messaging services may cache metadata for an already-shared page. Existing messages may retain their earlier preview. A fresh query string on a page URL can be used to test a new fetch while the canonical URL remains unchanged; application code cannot erase WhatsApp's remote cache.
