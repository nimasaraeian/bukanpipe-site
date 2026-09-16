import { mkdirSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicRoot = path.resolve("public");
const compareRoot = path.resolve(".tmp-image-compare");

const SOURCES = [
  "media/demo/bukan-slide-01-yard.png",
  "media/demo/bukan-slide-02-extrusion.png",
  "media/demo/bukan-slide-03-product.png",
  "media/demo/bukan-slide-04-inventory.png",
  "media/demo/ChatGPT Image Sep 8, 2026, 10_35_51 AM.png",
  "media/demo/ChatGPT Image Sep 4, 2026, 01_02_13 AM (5).png",
  "media/demo/ChatGPT Image Sep 4, 2026, 01_02_13 AM (4).png",
  "media/brand/applications-hero.png",
  "media/brand/calculator-hero.png",
  "media/brand/downloads-hero.png",
  "media/brand/about-factory-hero.png",
  "media/brand/technical-center-hero.jpg",
  "media/brand/home-hero-pyramid-en.jpg",
  "media/brand/home-hero-pyramid-fa.jpg",
  "media/brand/home-hero-pyramid-mobile-en.jpg",
  "media/brand/home-hero-pyramid-mobile-fa.jpg",
  "media/editorial/home-manufacturing-editorial.jpg",
  "media/products/en/hero-pe100.png",
  "media/products/en/water.png",
  "media/products/en/gas.png",
  "media/products/en/irrigation.png",
  "media/products/en/sewer.png",
  "media/products/en/drainage.png",
  "media/products/en/pe100.png",
];

const MAE_LIMIT = 3.5;

async function meanAbsError(originalPath, encodedBuffer, width, height, channels) {
  const [orig, enc] = await Promise.all([
    sharp(originalPath).ensureAlpha().raw().toBuffer(),
    sharp(encodedBuffer).ensureAlpha().raw().toBuffer(),
  ]);
  const n = width * height * 4;
  let sum = 0;
  let max = 0;
  for (let i = 0; i < n; i += 1) {
    const d = Math.abs(orig[i] - enc[i]);
    sum += d;
    if (d > max) max = d;
  }
  return { mae: sum / n, max };
}

async function convertOne(rel) {
  const input = path.join(publicRoot, rel);
  const parsed = path.parse(input);
  const output = path.join(parsed.dir, `${parsed.name}.webp`);
  const meta = await sharp(input).metadata();
  const width = meta.width;
  const height = meta.height;
  const originalBytes = statSync(input).size;

  const pipeline = sharp(input).webp({
    quality: 90,
    alphaQuality: 100,
    effort: 6,
    smartSubsample: true,
  });
  const encoded = await pipeline.toBuffer();
  const outMeta = await sharp(encoded).metadata();

  if (outMeta.width !== width || outMeta.height !== height) {
    throw new Error(`Dimension mismatch for ${rel}: ${width}x${height} -> ${outMeta.width}x${outMeta.height}`);
  }

  const { mae, max } = await meanAbsError(input, encoded, width, height, meta.channels);
  const accepted = mae <= MAE_LIMIT;
  if (!accepted) {
    throw new Error(`Quality rejected for ${rel}: MAE ${mae.toFixed(3)} max ${max}`);
  }

  writeFileSync(output, encoded);

  const previewW = Math.min(720, width);
  const origPreview = await sharp(input).resize({ width: previewW }).jpeg({ quality: 90 }).toBuffer();
  const webpPreview = await sharp(encoded).resize({ width: previewW }).jpeg({ quality: 90 }).toBuffer();
  const left = sharp(origPreview);
  const leftMeta = await left.metadata();
  const pair = await sharp({
    create: {
      width: (leftMeta.width ?? previewW) * 2,
      height: leftMeta.height ?? 1,
      channels: 3,
      background: "#111",
    },
  })
    .composite([
      { input: origPreview, left: 0, top: 0 },
      { input: webpPreview, left: leftMeta.width ?? previewW, top: 0 },
    ])
    .jpeg({ quality: 85 })
    .toBuffer();

  mkdirSync(compareRoot, { recursive: true });
  const previewName = parsed.name.replace(/[^\w.-]+/g, "_").slice(0, 80);
  writeFileSync(path.join(compareRoot, `${previewName}-compare.jpg`), pair);

  const optimizedBytes = encoded.length;
  return {
    source: `/${rel.replaceAll("\\", "/")}`,
    output: `/${path.relative(publicRoot, output).replaceAll("\\", "/")}`,
    formatFrom: meta.format,
    formatTo: "webp",
    width,
    height,
    hasAlpha: Boolean(meta.hasAlpha),
    originalBytes,
    optimizedBytes,
    savedPct: Math.round((1 - optimizedBytes / originalBytes) * 1000) / 10,
    mae: Math.round(mae * 1000) / 1000,
    maxDelta: max,
    preview: `.tmp-image-compare/${previewName}-compare.jpg`,
  };
}

mkdirSync(compareRoot, { recursive: true });
const results = [];
for (const rel of SOURCES) {
  const row = await convertOne(rel);
  results.push(row);
  console.log(
    `${row.source}  ${row.originalBytes} -> ${row.optimizedBytes}  (${row.savedPct}%)  MAE=${row.mae}`,
  );
}

writeFileSync(path.join(compareRoot, "manifest.json"), JSON.stringify(results, null, 2));
const totalIn = results.reduce((s, r) => s + r.originalBytes, 0);
const totalOut = results.reduce((s, r) => s + r.optimizedBytes, 0);
console.log(
  `\nTOTAL ${totalIn} -> ${totalOut} (${Math.round((1 - totalOut / totalIn) * 1000) / 10}%)`,
);
