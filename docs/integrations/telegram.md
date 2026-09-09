# Telegram lead notifications (V1)

One-way notifications: **Website lead → Telegram Bot → private sales chat**.

No webhooks, bot commands, or interactive CRM in V1.

## Prerequisites

- Telegram account for the sales team
- Private group or channel where lead alerts should arrive
- Vercel (or local) server environment — **never** expose the bot token to the browser

## BotFather setup

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send `/newbot`.
3. Choose a display name, e.g. `Bukan Pipe Sales Leads`.
4. Choose a unique username, e.g. `bukanpipe_leads_bot`.
5. Copy the **bot token** — store it only in Vercel env / local `.env.local` (never commit).

## Chat ID setup

1. Create a private group for sales lead alerts (or use an existing internal group).
2. Add the bot to the group and grant permission to send messages.
3. Send a test message in the group, e.g. `Bukan Pipe lead test`.
4. Run locally:

```bash
npm run telegram:test -- --discover-chat-id
```

Or call `getUpdates` manually:

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates"
```

5. Find `"chat":{"id":-100xxxxxxxxxx}` in the response — that is `TELEGRAM_LEADS_CHAT_ID`.

## Environment variables (server only)

| Variable | Required | Description |
|----------|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Yes | Bot token from BotFather |
| `TELEGRAM_LEADS_CHAT_ID` | Yes | Target group/channel chat ID |
| `TELEGRAM_NOTIFICATIONS_ENABLED` | Yes | Set `true` after credentials verified |
| `TELEGRAM_PUBLIC_URL` | No | Verified public contact URL (`https://t.me/username`) when available |

Optional client-safe public contact URL (not a secret):

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_TELEGRAM_CONTACT_URL` | Verified `https://t.me/...` for website CTAs |

Until a username is verified, the site uses the phone deep link `https://t.me/+989352197676`.

## Enable lead pipeline

1. Configure Telegram env vars on Vercel (Production + Preview for staging tests).
2. Run `npm run telegram:test` — expect `ok: true`.
3. Submit a test lead via `POST /api/leads` or the Request Quote form.
4. Set `NEXT_PUBLIC_LEADS_SUBMISSION_READY=true` only after end-to-end verification.
5. Optionally enable SMS when the provider account is active.

## Test script

```bash
# Discover chat id after sending a message to the group
npm run telegram:test -- --discover-chat-id

# Send a sample lead notification
npm run telegram:test
```

Reads credentials from environment only — never hard-coded.

## Public contact vs bot

| Purpose | Value |
|---------|--------|
| **Sales WhatsApp / Telegram chat** | `09352197676` / `+989352197676` |
| **SMS alert recipient (manager)** | `09143820556` / `+989143820556` |

The bot token is for **outbound notifications only**, not for customer-facing chat links.

## Is a Telegram username still required?

**Optional for V1 notifications.** Bot + chat ID is sufficient for lead alerts.

A verified `@username` or channel URL improves public CTAs (`TELEGRAM_PUBLIC_URL`) but phone deep links work meanwhile.
