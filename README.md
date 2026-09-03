# Bukan Pipe Digital Transformation

This repository is the single source of truth for the Bukan Pipe digital transformation program.

## Mission

Rebuild Bukan Pipe's digital presence as a modern industrial growth platform — not merely a corporate brochure — combining industrial brand authority, technical SEO, product discovery, engineering knowledge, laboratory authority, project credibility, RFQ / lead generation, dealer verification, and future export expansion.

## Core architectural decision

The new website is a **greenfield rebuild**. The legacy website is **not** the codebase to continue developing. It is used only as a source for existing URLs and SEO equity, useful content, product data, technical articles, certificates/documents, imagery and redirect mapping.

The new web application should be built with **Next.js + React + TypeScript + App Router + Tailwind CSS**, using server-first rendering and an SEO-ready, CMS-ready architecture.

## North Star Metric

**Qualified RFQs generated from organic search**

Traffic alone is not the project goal.

## Operating model

- Senior project direction: strategy, architecture, SEO, sequencing, QA and acceptance criteria.
- Cursor: implementation in small, gated phases.
- Factory: source of truth for products, standards, certificates, projects, capacities, representatives and commercial facts.
- Rule: **no industrial claim is published without evidence.**

## Working strategic direction

**Bukan Pipe — Engineering Trust for Infrastructure**

Persian working line: **زیرساختی برای جریان فردا**

## Current codebase

Phase 003 (legacy URL migration) is documented. Path redirects are prepared and **disabled**. Route foundations remain development shells. This is not the commercial website.

Production target: `https://bukanpipe.com`. Local/preview origin is `NEXT_PUBLIC_SITE_URL`. Indexing stays off until launch approval. `ENABLE_LEGACY_REDIRECTS` stays false.

See `docs/HOST_CANONICAL_POLICY.md`, `docs/LEGACY_REDIRECT_MAP.md`, `docs/SEO_INFORMATION_ARCHITECTURE.md`, `docs/ARCHITECTURE.md` and `docs/TECHNICAL_DECISIONS.md`.

```bash
npm install
```

Copy `.env.example` to `.env.local`, then:

```bash
npm run dev
```

Useful commands: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

Site origin for local canonicals is `NEXT_PUBLIC_SITE_URL` (default localhost). Approved production target is `https://bukanpipe.com`.

Indexing stays off until `NEXT_PUBLIC_ALLOW_INDEXING=true` is explicitly approved.

See `docs/SEO_INFORMATION_ARCHITECTURE.md`, `docs/ARCHITECTURE.md` and `docs/TECHNICAL_DECISIONS.md`.
