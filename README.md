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

Phase 001 (Greenfield Foundation) is implemented in this repository root as a Next.js application. It is a development shell, not the commercial website.

```bash
npm install
```

Copy `.env.example` to `.env.local`, then:

```bash
npm run dev
```

Useful commands: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

Site origin is `NEXT_PUBLIC_SITE_URL`. Do not treat a local or preview URL as confirmation of `bukanpipe.com` ownership.

Indexing stays off until `NEXT_PUBLIC_ALLOW_INDEXING=true` is explicitly approved.

See `docs/ARCHITECTURE.md` and `docs/TECHNICAL_DECISIONS.md`.
