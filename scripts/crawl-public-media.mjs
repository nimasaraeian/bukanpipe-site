#!/usr/bin/env node
/**
 * Public-only media audit for Bukan Pipe.
 *
 * Sources (in order):
 *   1. https://bukanpipe.com/wp-json/wp/v2/media
 *   2. https://bukanpipe.ir/wp-json/wp/v2/media  (REST fallback only)
 *
 * Does NOT assume factory network, VPN, or internal servers.
 * Records fetch failures and continues with other assets.
 *
 * Usage: npm run media:crawl
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logPath = path.join(root, "data", "media", "public-crawl-log.json");
const downloadDir = path.join(root, "public", "media");

const PRIMARY = "https://bukanpipe.com";
const SECONDARY = "https://bukanpipe.ir";

const REST_TIMEOUT_MS = 45_000;
const BINARY_TIMEOUT_MS = 90_000;

const displayDownloads = [
  {
    wpId: 1579,
    proposed: "bukan-pipe-loading-straight-pipe.jpg",
    uploadPath: "2023/06/lifting-pipe.jpg",
  },
  {
    wpId: 748,
    proposed: "bukan-pipe-production-hall.jpg",
    uploadPath: "2022/10/f5.jpg",
  },
  {
    wpId: 902,
    proposed: "bukan-pipe-laboratory.jpg",
    uploadPath: "2022/10/QC-01.jpg",
  },
  {
    wpId: 858,
    proposed: "bukan-pipe-gas-pipe.jpg",
    uploadPath: "2022/10/gas5.jpg",
  },
];

function uploadUrls(uploadPath) {
  return [
    `${PRIMARY}/wp-content/uploads/${uploadPath}`,
    `${SECONDARY}/wp-content/uploads/${uploadPath}`,
  ];
}

async function fetchJson(url, timeoutMs = REST_TIMEOUT_MS) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "BukanPipePublicMediaAudit/1.0",
    },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.json();
}

async function crawlRest(host) {
  const base = `${host}/wp-json/wp/v2/media`;
  const firstPage = await fetchJson(`${base}?per_page=100&page=1`);
  const totalPages = Number(
    (await fetch(`${base}?per_page=1&page=1`, {
      signal: AbortSignal.timeout(REST_TIMEOUT_MS),
    }).then((r) => r.headers.get("X-WP-TotalPages"))) ?? 1,
  );

  const items = [...firstPage];
  for (let page = 2; page <= totalPages; page += 1) {
    const batch = await fetchJson(`${base}?per_page=100&page=${page}`);
    items.push(...batch);
  }
  return items;
}

function mapRestItem(item) {
  const details = item.media_details ?? {};
  const file = item.source_url?.split("/").pop() ?? "";
  return {
    wpId: item.id,
    sourceUrl: item.source_url ?? null,
    originalFilename: file,
    width: details.width ?? null,
    height: details.height ?? null,
    filesizeBytes: details.filesize ?? null,
    mimeType: item.mime_type ?? null,
    legacyAlt: item.alt_text ?? "",
    sourcePage: item.link ?? "",
    title: item.title?.rendered ?? "",
  };
}

async function tryDownload(url, timeoutMs = BINARY_TIMEOUT_MS) {
  const res = await fetch(url, {
    headers: { "User-Agent": "BukanPipePublicMediaAudit/1.0" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 512) {
    throw new Error(`suspiciously small (${buf.length} bytes)`);
  }
  return buf;
}

async function downloadDisplayAsset(asset) {
  const attempts = [];
  for (const url of uploadUrls(asset.uploadPath)) {
    try {
      const buf = await tryDownload(url);
      fs.mkdirSync(downloadDir, { recursive: true });
      const dest = path.join(downloadDir, asset.proposed);
      fs.writeFileSync(dest, buf);
      attempts.push({ url, status: "success", bytes: buf.length });
      return { ...asset, status: "accessible", attempts, localPath: `/media/${asset.proposed}` };
    } catch (error) {
      attempts.push({ url, status: "failed", reason: error.message });
    }
  }
  return {
    ...asset,
    status: "failed",
    attempts,
    localPath: null,
    failureReason: attempts.map((a) => `${a.url}: ${a.reason}`).join("; "),
  };
}

const log = {
  auditedAt: new Date().toISOString(),
  policy: "public-websites-only",
  factoryNetworkUsed: false,
  primaryHost: PRIMARY,
  secondaryHost: SECONDARY,
  restCrawl: null,
  libraryItems: [],
  displayDownloads: [],
  errors: [],
};

try {
  let restHost = PRIMARY;
  let restItems;
  try {
    restItems = await crawlRest(PRIMARY);
    log.restCrawl = { host: PRIMARY, status: "success", itemCount: restItems.length };
  } catch (primaryError) {
    log.errors.push({ stage: "rest-primary", reason: primaryError.message });
    try {
      restItems = await crawlRest(SECONDARY);
      restHost = SECONDARY;
      log.restCrawl = {
        host: SECONDARY,
        status: "success_via_secondary",
        itemCount: restItems.length,
        primaryFailure: primaryError.message,
      };
    } catch (secondaryError) {
      log.restCrawl = {
        host: null,
        status: "failed",
        primaryFailure: primaryError.message,
        secondaryFailure: secondaryError.message,
      };
      restItems = [];
    }
  }

  if (restItems.length > 0) {
    log.libraryItems = restItems.map(mapRestItem);
    console.log(
      `REST inventory: ${restItems.length} items from ${restHost} (metadata only in this run).`,
    );
  } else {
    console.warn(
      "REST inventory unavailable. Existing data/media/legacy-media.ts remains the typed inventory.",
    );
  }

  for (const asset of displayDownloads) {
    const result = await downloadDisplayAsset(asset);
    log.displayDownloads.push(result);
    if (result.status === "accessible") {
      console.log(`OK ${asset.proposed} (${result.attempts.find((a) => a.status === "success")?.bytes} bytes)`);
    } else {
      console.warn(`FAIL ${asset.proposed}: ${result.failureReason}`);
    }
  }
} catch (error) {
  log.errors.push({ stage: "fatal", reason: error.message });
  console.error(error);
}

fs.mkdirSync(path.dirname(logPath), { recursive: true });
fs.writeFileSync(logPath, `${JSON.stringify(log, null, 2)}\n`);
console.log(`\nWrote ${path.relative(root, logPath)}`);

const failedDownloads = log.displayDownloads.filter((item) => item.status !== "accessible").length;
if (failedDownloads > 0) {
  console.warn(
    `${failedDownloads} display download(s) failed. UI continues to use public WordPress URLs.`,
  );
  process.exitCode = 1;
}
