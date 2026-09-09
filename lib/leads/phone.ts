const IRAN_COUNTRY = "98";
const IRAN_MOBILE_LENGTH = 10;

export type PhoneNormalizeResult =
  | { ok: true; e164: string; normalized: string; display: string }
  | { ok: false; reason: "empty" | "invalid" | "too_short" | "too_long" };

/** Strip to digits only. */
export function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, "");
}

/**
 * Normalize Iranian and international phone input to E.164.
 * Accepts: 09121234567, 9121234567, +989121234567, 00989121234567, 989121234567
 */
export function normalizeIranianPhone(raw: string): PhoneNormalizeResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, reason: "empty" };
  }

  let digits = digitsOnly(trimmed);

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith(IRAN_COUNTRY)) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (digits.length < 8) {
    return { ok: false, reason: "too_short" };
  }

  if (digits.length > 15) {
    return { ok: false, reason: "too_long" };
  }

  const isIranMobile = digits.length === IRAN_MOBILE_LENGTH && digits.startsWith("9");
  const isIranLandline = digits.length >= 10 && digits.startsWith("4");

  if (!isIranMobile && !isIranLandline && digits.length < 10) {
    return { ok: false, reason: "invalid" };
  }

  const normalized = `${IRAN_COUNTRY}${digits}`;
  const e164 = `+${normalized}`;

  return {
    ok: true,
    e164,
    normalized,
    display: isIranMobile ? `0${digits}` : digits,
  };
}

export function isValidLeadPhone(raw: string): boolean {
  return normalizeIranianPhone(raw).ok;
}
