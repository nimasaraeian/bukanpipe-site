/** Convert E.164 / local Iranian mobiles to 09xxxxxxxxx for FarazSMS. */
export function toFarazSmsRecipient(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("98") && digits.length >= 12) {
    return `0${digits.slice(2)}`;
  }
  if (digits.length === 10 && digits.startsWith("9")) {
    return `0${digits}`;
  }
  if (digits.startsWith("0") && digits.length >= 11) {
    return digits;
  }
  return raw;
}
