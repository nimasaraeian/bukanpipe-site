import fs from "node:fs";
import path from "node:path";
import type { LegacyMediaRecord } from "@/data/media/types";
import { isRemoteLegacyUrl } from "@/lib/media/sizes";

export type ResolvedMediaSrc = {
  src: string;
  unoptimized: boolean;
};

/**
 * Prefer stable `/media/{proposedFilename}` when the file exists under `public/media/`.
 * Otherwise fall back to the legacy WordPress URL (unoptimized remote).
 */
export function resolveMediaSrc(record: LegacyMediaRecord): ResolvedMediaSrc {
  if (record.proposedFilename) {
    const localFile = path.join(
      process.cwd(),
      "public",
      "media",
      record.proposedFilename,
    );
    if (fs.existsSync(localFile)) {
      return {
        src: `/media/${record.proposedFilename}`,
        unoptimized: false,
      };
    }
  }

  return {
    src: record.sourceUrl,
    unoptimized: isRemoteLegacyUrl(record.sourceUrl),
  };
}
