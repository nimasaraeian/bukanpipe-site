import { describe, expect, it } from "vitest";
import { normalizeIranianPhone } from "./phone";

describe("normalizeIranianPhone", () => {
  it("accepts common Iranian mobile formats", () => {
    for (const input of ["09121234567", "9121234567", "+989121234567", "00989121234567", "989121234567"]) {
      const result = normalizeIranianPhone(input);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.normalized).toBe("989121234567");
        expect(result.e164).toBe("+989121234567");
      }
    }
  });

  it("rejects empty and invalid phones", () => {
    expect(normalizeIranianPhone("").ok).toBe(false);
    expect(normalizeIranianPhone("123").ok).toBe(false);
    expect(normalizeIranianPhone("abc").ok).toBe(false);
  });
});
