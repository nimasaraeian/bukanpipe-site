# Bukan Pipe Website Design & SEO Specification

## Purpose
Build a premium, conversion-oriented, SEO-first corporate website for Bukan Pipe that communicates the scale, technical credibility, and manufacturing capability of the brand while remaining fast, accessible, crawlable, and maintainable.

The visual reference is the approved Bukan Pipe concept: a cinematic industrial hero, NEKRAS-inspired image cards with technical data, a lighter mid-page rhythm, a PE100 spotlight, laboratory credibility, project storytelling, knowledge content, and an interactive product finder.

## Product principles
1. **Premium industrial, not template industrial.** The site must feel bespoke, editorial, and technically credible rather than like a generic factory theme.
2. **SEO is architecture, not a plugin.** Information architecture, metadata, internal linking, structured data, content templates, canonicalization, and performance are designed before page proliferation.
3. **Visual restraint.** Midnight/graphite is the base, but the entire site must not remain uniformly dark. Light technical sections create visual rhythm. Electric blue is a restrained accent used only for priority states and calls to action.
4. **Real evidence over marketing decoration.** Real factory, product, laboratory, certification, and project media should replace generated/stock imagery when supplied.
5. **No invented business facts.** Generated mockup numbers, addresses, phone numbers, project names, quantities, dates, certifications, production capacity, or technical ranges are placeholders unless verified against an authoritative Bukan Pipe source supplied by the client or current website.
6. **Mobile is a first-class experience.** The mobile homepage is intentionally composed, not merely a collapsed desktop grid.

## Primary audience
- Infrastructure contractors and EPC firms
- Water and wastewater projects
- Gas distribution projects
- Agricultural and irrigation buyers
- Industrial procurement teams
- Municipal/public-sector buyers
- Technical consultants and project engineers
- Distributors and large-volume buyers

## Core user goals
- Understand what Bukan Pipe manufactures
- Verify technical credibility and standards
- Find the correct pipe/application quickly
- Review specifications and relevant projects
- Request a quote or technical consultation
- Download/inspect certificates and technical documentation
- Find educational material about polyethylene pipe selection

## Visual direction

### Brand character
- Premium
- Technical
- Precise
- Modern
- Established
- Industrial
- Trustworthy

### Palette
- Midnight / near-black: primary navigation and hero foundation
- Graphite / slate: card backgrounds and technical surfaces
- Soft off-white / very light cool gray: specification and editorial sections
- Electric Bukan blue: 5–10% accent usage only
- White and muted gray typography

### Typography
- Persian: Peyda or Yekan Bakh if legally supplied/licensed; otherwise use a high-quality open/self-hostable Persian fallback selected during implementation.
- Latin/technical data: Inter or equivalent.
- Strong hierarchy: ExtraBold/Bold display headings, Medium navigation, Regular body, SemiBold technical values.
- Mixed Persian/Latin technical expressions must remain visually aligned and readable in RTL layouts.

### Geometry
- Card radius target: 18–22px on desktop, slightly reduced on mobile.
- Thin, low-contrast borders rather than heavy outlines.
- Avoid excessive glassmorphism, neon glows, gradients, and pill shapes.

### Motion
Motion must feel expensive and quiet:
- 300–450ms card hover transitions
- 2–4% image parallax where safe
- restrained image zoom on hover
- subtle CTA arrow shift
- number reveal/counter only when it does not harm accessibility
- navbar blur/compact state on scroll
- respect `prefers-reduced-motion`
- no animation should block content rendering or SEO

## Homepage architecture

### 1. Header / navigation
Desktop RTL navigation:
- صفحه اصلی
- محصولات
- صنایع / کاربردها
- پروژه‌ها
- آزمایشگاه
- دانش فنی
- درباره ما
- تماس با ما
- FA / EN language control reserved for future internationalization
- Primary CTA: دریافت استعلام

Behavior:
- transparent/dark over hero initially
- sticky on scroll
- transitions to compact blurred/dark surface
- keyboard-accessible dropdowns
- visible focus states
- mobile menu must be accessible and crawlable

### 2. Cinematic hero
Primary message direction:
- short, strong Persian H1 focused on Bukan Pipe and polyethylene pipe manufacturing
- supporting line for principal applications: water, gas, wastewater/drainage, agriculture
- primary CTA: دریافت استعلام
- secondary CTA: مشاهده محصولات

Visual:
- large industrial pipe/factory media
- high contrast for text readability
- optional technical hotspots such as PE100 / diameter / pressure only when the values are verified
- hero media should be optimized and must not compromise LCP

SEO:
- exactly one meaningful H1
- critical hero copy rendered as HTML, never baked into an image
- hero image receives meaningful alt text only when informative; decorative imagery uses empty alt

### 3. Trust strip
Compact proof points immediately after/within hero.
Examples of categories (values must be verified):
- years of experience
- certified laboratory / standards
- materials such as PE100
- production diameter range

### 4. Product universe
NEKRAS-inspired image cards are a signature component.
Initial application groups:
- آبرسانی
- گازرسانی
- کشاورزی / آبیاری
- فاضلاب و زهکشی

Card anatomy:
- editorial image area
- small category badge/icon
- Persian title and short benefit-oriented explanation
- verified technical mini-spec row (material / pressure or SDR / diameter)
- text link to the relevant SEO landing page

Desktop composition should avoid a monotonous template grid. Use one larger editorial card with paired smaller cards where appropriate. Mobile becomes a clear vertical sequence.

### 5. Light PE100 / featured product section
A deliberate light/off-white break after the dark product universe.
Content:
- large product cutout/media
- PE100 or verified featured product/material
- concise description
- 3–4 verified engineering values
- link to full specification/product page

Purpose:
- create visual rhythm
- communicate engineering clarity
- provide a strong internal link into the product cluster

### 6. Laboratory authority section
Dark cinematic panel or full-width section.
Editorial direction:
- "Quality is measured" / Persian equivalent, not generic "why us" copy
- real laboratory photography when available
- verified accreditation/certification information only
- show categories of tests only when supported by source material
- CTA to dedicated laboratory page

### 7. Featured projects
Project cards inherit the information-rich card language from NEKRAS.
Each verified project can show:
- project/application name
- location
- year
- pipe material
- diameter
- project length/quantity when publishable
- project image

No generated mockup project data may be published as factual content.

### 8. Project footprint / map
Optional stylized Iran map after verified project dataset exists.
- lightweight SVG preferred over heavy third-party map embeds
- accessible text alternative/list of locations
- project points link to project detail pages when available

### 9. Technical knowledge / SEO content
Editorial knowledge area, not a generic "latest blog" widget.
Core topic clusters include:
- polyethylene pipe fundamentals
- PE80 vs PE100
- SDR / PN concepts
- pipe sizing and dimensions
- installation and welding
- water / gas / agriculture / wastewater selection guides
- standards and quality testing
- price drivers and quote guidance

Homepage exposes 3–4 strong articles with internal links.

### 10. Product finder
Interactive lead-assist component.
Potential fields:
- application
- diameter
- working pressure / project condition

Initial implementation may operate from a verified static product rules dataset. It must not claim an engineering recommendation beyond the underlying verified rules.
Results link to product pages and include a consultation CTA.

### 11. Final CTA
Large premium section:
- project consultation message
- request quote / contact CTA
- optional phone only after verification

### 12. Footer
- brand statement
- product links
- industry/application links
- knowledge/resources
- laboratory / certificates
- projects
- contact details from verified source
- legal/privacy links
- sitemap link
- optional newsletter only if a real backend/workflow exists

## Information architecture / SEO clusters

Recommended initial structure (final slugs determined during implementation):

- `/` homepage
- `/products/`
  - water-supply polyethylene pipe
  - gas polyethylene pipe
  - agriculture / irrigation polyethylene pipe
  - wastewater / drainage polyethylene pipe
- `/polyethylene-pipe/` pillar page targeting the broad core topic
- `/polyethylene-pipe/pe100/`
- `/sizes/` or a technically appropriate size cluster only after keyword research validates intent and content uniqueness
- `/price/` commercial price/quote landing page
- `/projects/`
- `/laboratory/`
- `/standards/`
- `/knowledge/`
- `/about/`
- `/contact/`

Do not generate hundreds of thin programmatic size/pressure pages. A page is indexable only if it has unique search intent and genuinely useful technical/commercial information.

## Technical SEO requirements

### Rendering
- Next.js App Router with server-rendered/static-first pages where practical
- Important content and internal links available in initial HTML
- Client components only for interactions that require them

### Metadata
Every indexable template supports:
- unique title
- unique meta description
- canonical URL
- robots directives
- Open Graph metadata
- social preview image

### Structured data
Use only schema supported by visible page content. Candidate types:
- Organization
- WebSite
- BreadcrumbList
- Product where product data is complete and eligible
- Article / BlogPosting for knowledge content
- FAQPage only if currently appropriate under search engine guidelines and visible on page

Do not fabricate ratings, reviews, pricing, availability, addresses, certificates, or identifiers in structured data.

### Sitemap / robots
- generated sitemap for indexable routes
- robots.txt controlled in code
- exclude non-production/staging/private routes

### Canonical / migration readiness
The existing `.com` has historical value. Before launch, create a URL-by-URL migration inventory for any content moved to `.ir` or a recovered `.com`. Permanent redirects must map old pages to their closest equivalent rather than broadly redirecting everything to the homepage.

### Internationalization
- Persian is the initial primary implementation
- route/content architecture must not prevent future English version
- when multiple languages are launched, implement proper language-specific URLs and hreflang

### Internal linking
- product pillar → application pages → technical articles/projects
- articles link contextually back to relevant product/commercial pages
- breadcrumbs on deep content
- no orphan indexable pages

## Performance budget
Targets are measured on production-like builds and real optimized assets:
- LCP target ≤ 2.5s at the 75th percentile where achievable
- INP target < 200ms
- CLS target < 0.1
- avoid heavy hero video until an optimized fallback strategy exists
- use responsive images / modern formats
- lazy-load non-critical imagery
- preconnect/preload only where justified
- minimize third-party scripts

## Accessibility
- semantic landmarks and heading hierarchy
- sufficient color contrast
- keyboard-operable navigation, cards, forms, dialogs, and product finder
- visible focus states
- descriptive labels and errors
- touch targets appropriate for mobile
- `prefers-reduced-motion`
- no essential information conveyed by color alone

## Component boundaries
Initial reusable components:
- `SiteHeader`
- `MobileNavigation`
- `Hero`
- `HeroHotspot`
- `TrustMetric`
- `ProductApplicationCard`
- `FeaturedProduct`
- `LaboratoryFeature`
- `ProjectCard`
- `ProjectMap`
- `KnowledgeCard`
- `ProductFinder`
- `QuoteCTA`
- `SiteFooter`
- SEO helpers / JSON-LD components

Components must receive typed data rather than embed unverified business facts directly in presentation code.

## Content/data boundaries
Create a typed content layer for:
- site/company settings
- navigation
- products/applications
- technical specifications
- projects
- certifications/standards
- knowledge articles

For phase 1, local TypeScript/MDX data is preferred over introducing a CMS prematurely. A CMS is added only when editorial workflow requirements justify it.

## Technology
- Next.js App Router
- TypeScript strict mode
- Tailwind CSS or an equivalently maintainable token-based styling system
- minimal dependency footprint
- server components by default
- linting and formatting
- automated tests for utility/data logic and key interactive components
- production build verification on every major milestone

## Security / privacy
- no secrets committed to repository
- environment variables for external services
- forms protected against spam/abuse when backend is introduced
- privacy disclosure for analytics/forms when enabled
- no third-party tracking added without explicit purpose

## Phase 1 acceptance criteria
Phase 1 is considered successful when:
1. Production-grade Next.js/TypeScript foundation exists.
2. Approved visual system is implemented across the homepage.
3. Homepage is responsive from mobile through wide desktop.
4. Hero, product cards, light PE100 section, laboratory, projects, knowledge, product finder, CTA, and footer are represented.
5. No unverified mockup facts are presented as real business data.
6. Metadata, canonical, robots, sitemap, Organization/WebSite/Breadcrumb structured data foundations exist.
7. Core content is server-rendered/crawlable.
8. Build, lint, typecheck, and relevant automated tests pass.
9. Performance-sensitive media strategy is in place.
10. The architecture supports later product, article, project, laboratory, standards, and price pages without redesigning the foundation.

## Deferred until source verification or later phases
- final phone/address/email values
- final logo asset package if not supplied
- exact production statistics
- exact technical diameter/pressure/material ranges
- exact certifications/accreditations
- real project records
- real price data
- newsletter backend
- CRM integration
- quote backend
- English content
- `.com` → `.ir` migration execution

## Visual reference note
The approved mockup direction is the slightly lightened dark-industrial version derived from the cinematic Bukan Pipe concept. Implementation should reproduce the design language and composition faithfully while improving spacing, responsiveness, accessibility, real typography, and technical correctness rather than attempting a pixel-for-pixel image trace.
