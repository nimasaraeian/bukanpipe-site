#!/usr/bin/env node
/**
 * Copy the four display stills from legacy WordPress into public/media/.
 * Run from the repo root when bukanpipe.com is reachable:
 *   npm run media:fetch
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "media");

const assets = [
  {
    dest: "bukan-pipe-loading-straight-pipe.jpg",
    urls: [
      "https://bukanpipe.com/wp-content/uploads/2023/06/lifting-pipe.jpg",
      "https://bukanpipe.ir/wp-content/uploads/2023/06/lifting-pipe.jpg",
    ],
  },
  {
    dest: "bukan-pipe-production-hall.jpg",
    urls: [
      "https://bukanpipe.com/wp-content/uploads/2022/10/f5.jpg",
      "https://bukanpipe.ir/wp-content/uploads/2022/10/f5.jpg",
    ],
  },
  {
    dest: "bukan-pipe-laboratory.jpg",
    urls: [
      "https://bukanpipe.com/wp-content/uploads/2022/10/QC-01.jpg",
      "https://bukanpipe.ir/wp-content/uploads/2022/10/QC-01.jpg",
    ],
  },
  {
    dest: "bukan-pipe-gas-pipe.jpg",
    urls: [
      "https://bukanpipe.com/wp-content/uploads/2022/10/gas5.jpg",
      "https://bukanpipe.ir/wp-content/uploads/2022/10/gas5.jpg",
    ],
  },
];

async function download(url, timeoutMs = 120_000) {
  const res = await fetch(url, {
    headers: { "User-Agent": "BukanPipeMediaMigration/1.0" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

fs.mkdirSync(outDir, { recursive: true });

let failed = 0;

for (const asset of assets) {
  const destPath = path.join(outDir, asset.dest);
  let saved = false;

  for (const url of asset.urls) {
    try {
      const buf = await download(url);
      if (buf.length < 1024) {
        throw new Error(`suspiciously small (${buf.length} bytes)`);
      }
      fs.writeFileSync(destPath, buf);
      console.log(`OK ${asset.dest} (${buf.length} bytes) <- ${url}`);
      saved = true;
      break;
    } catch (error) {
      console.warn(`skip ${url}: ${error.message}`);
    }
  }

  if (!saved) {
    console.error(`FAIL ${asset.dest}`);
    failed += 1;
  }
}

if (failed > 0) {
  console.error(
    `\n${failed} file(s) could not be downloaded. UI will use remote WordPress URLs until files exist in public/media/.`,
  );
  process.exitCode = 1;
} else {
  console.log("\nAll display media copied. Restart dev server if running.");
}
