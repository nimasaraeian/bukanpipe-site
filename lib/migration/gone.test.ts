import { describe, expect, it } from "vitest";
import {
  GONE_STATUS,
  SPAM_QUERY_PARAMS,
  goneResponseInit,
  hasSpamQueryParam,
} from "@/lib/migration/gone";

function paramsOf(url: string): URLSearchParams {
  return new URL(url, "https://bukanpipe.com").searchParams;
}

describe("410 response contract", () => {
  it("answers 410 with X-Robots-Tag: noindex", () => {
    const { status, headers } = goneResponseInit();

    expect(status).toBe(410);
    expect(GONE_STATUS).toBe(410);
    expect(headers["X-Robots-Tag"]).toBe("noindex");
  });

  it("keeps the body minimal and non-indexable", () => {
    const { body, headers } = goneResponseInit();

    expect(body).toBe("410 Gone");
    expect(body.length).toBeLessThan(32);
    expect(headers["Content-Type"]).toBe("text/plain; charset=utf-8");
  });

  it("hands back a fresh headers object each call", () => {
    const first = goneResponseInit();
    first.headers["X-Robots-Tag"] = "mutated";

    expect(goneResponseInit().headers["X-Robots-Tag"]).toBe("noindex");
  });
});

describe("spam query parameters are 410 on every path", () => {
  it("matches LOSS and Male on any path, not just legacy routes", () => {
    const paths = [
      "/",
      "/fa",
      "/fa/products/gas-pipe",
      "/contact-us/",
      "/wp-content/uploads/2022/10/article_204.pdf",
      "/never-existed",
    ];

    for (const path of paths) {
      expect(hasSpamQueryParam(paramsOf(`${path}?LOSS=1`)), `LOSS on ${path}`).toBe(true);
      expect(hasSpamQueryParam(paramsOf(`${path}?Male=1`)), `Male on ${path}`).toBe(true);
    }
  });

  it("matches a valueless or empty parameter", () => {
    expect(hasSpamQueryParam(paramsOf("/x?LOSS"))).toBe(true);
    expect(hasSpamQueryParam(paramsOf("/x?Male="))).toBe(true);
  });

  it("matches when the spam parameter rides alongside ordinary ones", () => {
    expect(hasSpamQueryParam(paramsOf("/x?utm_source=google&Male=7&page=2"))).toBe(true);
  });

  it("leaves ordinary requests alone", () => {
    expect(hasSpamQueryParam(paramsOf("/fa/products"))).toBe(false);
    expect(hasSpamQueryParam(paramsOf("/fa/products?page=2&utm_source=google"))).toBe(false);
  });

  it("matches the observed casing only, so a real `male` field is not 410'd", () => {
    expect(hasSpamQueryParam(paramsOf("/x?loss=1"))).toBe(false);
    expect(hasSpamQueryParam(paramsOf("/x?male=1"))).toBe(false);
    expect(SPAM_QUERY_PARAMS).toEqual(["LOSS", "Male"]);
  });
});
