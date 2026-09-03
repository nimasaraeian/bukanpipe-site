# Technical Architecture

## Decision
Greenfield rebuild. Do not continue the legacy frontend.

## Stack
- Next.js stable
- React
- TypeScript
- App Router
- Tailwind CSS
- Server Components by default
- optimized images
- Vercel
- structured local content initially
- CMS-ready models, no CMS dependency initially

## Why not a basic React SPA?
The platform has a large SEO surface: products, applications, engineering guides, standards, lab tests, projects, pricing, tools and later export pages. Server-rendered indexable HTML and metadata control are core architecture requirements.

## Early exclusions
No Redux, heavy UI framework, CMS, database, auth or animation library without explicit need.

## Legacy role
Legacy = SEO/content source, not technical base. Preserve important URLs/content/backlinks/documents and use 301 mapping at launch.
