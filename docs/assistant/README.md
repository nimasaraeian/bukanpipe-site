# Bukan Pipe Guide (راهنمای بوکان پایپ)

Deterministic, bilingual website assistant — **not** an LLM chatbot.

## Architecture

```
components/assistant/     UI (launcher, panel, composer, lead form)
lib/assistant/            Normalization, matching, routing, analytics, lead API
data/assistant/           Locale copy, intents, allowlisted routes, context actions
app/assistant.css         Styles (industrial tokens, RTL-safe)
```

Mounted once in `components/layout/SiteShell.tsx` via lazy-loaded `BukanPipeAssistantLazy`.

## Add an intent

1. Add allowlisted path in `data/assistant/routes.ts` if navigation is new.
2. Add intent row(s) in `data/assistant/intents.ts` with `keywords`, `phrases`, `minScore`, and `action`.
3. Add tests in `lib/assistant/matcher.test.ts`.
4. Run `npm run test`.

## Change a destination

Only edit paths inside `data/assistant/intents.ts` using `nav()` — it calls `assertAssistantPath()` against the allowlist.

## FA / EN content

- UI strings: `data/assistant/fa.ts`, `data/assistant/en.ts`
- Quick actions: `primaryQuickActionsFa/En`, `chooseProductOptionsFa/En`
- Page-context suggestions: `data/assistant/context-actions.ts`

Switching site locale resets the assistant conversation.

## Future CRM / Telegram / SMS

Implement server-side handler only (never `NEXT_PUBLIC_*` secrets):

```ts
// lib/assistant/lead.ts → submitLead()
// POST /api/leads (future) → CRM / Telegram Bot / SMS provider
```

Typed payload: `LeadPayload` in `lib/assistant/types.ts`.

V1 returns `{ ok: false, reason: "not_configured" }` — UI shows honest fallback + link to `/request-quote`.

## Security

- User text is never rendered as HTML.
- Navigation URLs come only from the allowlist.
- Analytics never logs raw queries, phone, or email.
- Free-text capped at 240 characters.

## Analytics

`trackAssistantEvent()` in `lib/assistant/analytics.ts` is a no-op adapter ready for GTM/Plausible.
