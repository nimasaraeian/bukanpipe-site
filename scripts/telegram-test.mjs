/** Telegram bot smoke test — run: npm run telegram:test */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
const chatId = process.env.TELEGRAM_LEADS_CHAT_ID?.trim();
const discover = process.argv.includes("--discover-chat-id");

if (!token) {
  console.error("Missing TELEGRAM_BOT_TOKEN in environment or .env.local");
  process.exit(1);
}

async function discoverChatId() {
  const url = `https://api.telegram.org/bot${token}/getUpdates`;
  const response = await fetch(url);
  const payload = await response.json();
  console.log(JSON.stringify(payload, null, 2));
}

async function sendTestLead() {
  if (!chatId) {
    console.error("Missing TELEGRAM_LEADS_CHAT_ID — run with --discover-chat-id first");
    process.exit(1);
  }

  const text = [
    "🔵 Bukan Pipe Telegram test",
    "",
    "ID: BP-TEST",
    "Phone: 09120000000",
    "Request: Quote",
    "Locale: FA",
    "Time: " + new Date().toISOString(),
  ].join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });

  const payload = await response.json();
  console.log(JSON.stringify({ ok: payload.ok === true, status: response.status }, null, 2));
  process.exit(payload.ok ? 0 : 1);
}

if (discover) {
  await discoverChatId();
} else {
  await sendTestLead();
}
