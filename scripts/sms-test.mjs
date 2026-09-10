/** FarazSMS smoke test — run: npm run sms:test */
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

const apiKey = process.env.SMS_API_KEY?.trim();
const sender = process.env.SMS_SENDER?.trim() || "90008361";
const recipient = process.env.SMS_SALES_RECIPIENT?.trim() || "09143820556";

if (!apiKey) {
  console.error("Missing SMS_API_KEY in environment or .env.local");
  process.exit(1);
}

const text = [
  "درخواست جدید سایت بوکان پایپ",
  "نام: تست سیستم",
  "تلفن: 09120000000",
  "استعلام قیمت PE100",
  "BP-TESTSMS",
].join("\n");

const response = await fetch("https://api.iranpayamak.com/ws/v1/sms/simple", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Api-Key": apiKey,
  },
  body: JSON.stringify({
    text,
    line_number: sender,
    recipients: [recipient],
    number_format: "english",
    schedule: null,
  }),
  signal: AbortSignal.timeout(10_000),
});

const ok = response.status === 201;
console.log(
  JSON.stringify(
    {
      ok,
      status: response.status,
      sender,
      recipient,
    },
    null,
    2,
  ),
);
process.exit(ok ? 0 : 1);
