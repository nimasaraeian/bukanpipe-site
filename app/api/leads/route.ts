import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads/create-lead";
import { toLeadApiResponse } from "@/lib/leads/api-response";
import { getLeadPipelineConfig } from "@/lib/leads/config";
import type { Locale } from "@/lib/i18n/config";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8192;

function siteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  return request.headers.get("x-real-ip");
}

export async function POST(request: Request) {
  const config = getLeadPipelineConfig();
  if (!config.apiEnabled) {
    return NextResponse.json(
      toLeadApiResponse({ ok: false, reason: "not_configured" }),
      { status: 503 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      toLeadApiResponse({ ok: false, reason: "validation", fieldErrors: { form: "Payload too large" } }),
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      toLeadApiResponse({ ok: false, reason: "validation", fieldErrors: { form: "Invalid JSON" } }),
      { status: 400 },
    );
  }

  const locale: Locale =
    body && typeof body === "object" && (body as { locale?: string }).locale === "en" ? "en" : "fa";

  const result = await createLead(body, {
    siteOrigin: siteOrigin(),
    clientIp: clientIp(request),
    userAgent: request.headers.get("user-agent"),
  });

  const response = toLeadApiResponse(result, locale);
  const status = result.ok ? 201 : result.reason === "rate_limited" ? 429 : result.reason === "not_configured" ? 503 : 400;

  return NextResponse.json(response, { status });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
