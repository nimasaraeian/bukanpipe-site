import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { LegacyMediaRecord } from "@/data/media/types";
import { resolveMediaSrc } from "@/lib/media/resolve";

const sampleRecord: LegacyMediaRecord = {
  id: "wp-test",
  wpId: 1,
  sourceUrl: "https://bukanpipe.com/wp-content/uploads/2022/10/gas5.jpg",
  originalFilename: "gas5.jpg",
  width: 789,
  height: 327,
  aspectRatio: "263:109",
  format: "jpeg",
  filesizeBytes: null,
  sourcePage: "https://bukanpipe.com/gas5/",
  subject: "Gas pipe still",
  category: "PIPE_PRODUCT",
  authenticity: "LEGACY_WP_LIBRARY",
  visualQuality: "C",
  websiteRole: "SMALL_SUPPORTING",
  cropSuitability: "SMALL_DISPLAY_ONLY",
  legacyAlt: "لوله گازرسانی",
  proposedFilename: "bukan-pipe-gas-pipe.jpg",
  notes: "test fixture",
};

describe("resolveMediaSrc", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns local path when public/media file exists", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);

    expect(resolveMediaSrc(sampleRecord)).toEqual({
      src: "/media/bukan-pipe-gas-pipe.jpg",
      unoptimized: false,
    });
  });

  it("falls back to legacy WordPress URL when local file is missing", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);

    expect(resolveMediaSrc(sampleRecord)).toEqual({
      src: sampleRecord.sourceUrl,
      unoptimized: true,
    });
  });

  it("uses remote URL when no proposedFilename is set", () => {
    const record = { ...sampleRecord, proposedFilename: null };
    expect(resolveMediaSrc(record)).toEqual({
      src: record.sourceUrl,
      unoptimized: true,
    });
  });

  it("resolves against the project public/media directory", () => {
    const existsSpy = vi.spyOn(fs, "existsSync").mockReturnValue(false);
    resolveMediaSrc(sampleRecord);
    const checkedPath = existsSpy.mock.calls[0]?.[0];
    expect(String(checkedPath)).toContain(
      path.join("public", "media", "bukan-pipe-gas-pipe.jpg"),
    );
    expect(String(checkedPath)).not.toContain(os.tmpdir());
  });
});
