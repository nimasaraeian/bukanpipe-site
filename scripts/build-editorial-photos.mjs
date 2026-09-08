/**
 * Build curated real-factory photos for editorial bands and inner-page heroes.
 * Sources live in image/ (local only); outputs go to public/media/editorial/.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/** @type {Array<{ id: string; source: string; width: number; height: number; format?: "jpg" | "png"; position?: string }>} */
const SLOTS = [
  {
    id: "home-manufacturing-editorial",
    source: "image/3-تولید/_DSC0016.JPG",
    width: 1440,
    height: 1800,
    position: "58% 48%",
  },
];

function parsePosition(position = "50% 50%") {
  const [xRaw, yRaw] = position.split(/\s+/);
  return {
    xPct: Number.parseFloat(xRaw) / 100,
    yPct: Number.parseFloat(yRaw) / 100,
  };
}

function coverExtract(srcW, srcH, targetW, targetH, position = "50% 50%") {
  const { xPct, yPct } = parsePosition(position);
  const targetAspect = targetW / targetH;
  const srcAspect = srcW / srcH;

  let cropW;
  let cropH;

  if (srcAspect > targetAspect) {
    cropH = srcH;
    cropW = Math.round(srcH * targetAspect);
  } else {
    cropW = srcW;
    cropH = Math.round(srcW / targetAspect);
  }

  cropW = Math.min(cropW, srcW);
  cropH = Math.min(cropH, srcH);

  const left = Math.max(0, Math.min(Math.round((srcW - cropW) * xPct), srcW - cropW));
  const top = Math.max(0, Math.min(Math.round((srcH - cropH) * yPct), srcH - cropH));

  return { left, top, width: cropW, height: cropH };
}

async function buildCover(sourcePath, width, height, position = "50% 50%") {
  const oriented = await sharp(sourcePath).rotate().toBuffer();
  const meta = await sharp(oriented).metadata();
  const srcW = meta.width ?? width;
  const srcH = meta.height ?? height;
  const extract = coverExtract(srcW, srcH, width, height, position);

  return sharp(oriented)
    .extract(extract)
    .resize(width, height, { fit: "fill" })
    .jpeg({ quality: 90, mozjpeg: true });
}

const OUT_DIR = path.join("public", "media", "editorial");
await mkdir(OUT_DIR, { recursive: true });

for (const slot of SLOTS) {
  const sourcePath = path.resolve(slot.source);
  const meta = await sharp(sourcePath).metadata();
  console.log(`[${slot.id}] source ${meta.width}x${meta.height}`);

  const ext = slot.format ?? "jpg";
  const out = path.join(OUT_DIR, `${slot.id}.${ext}`);

  const pipeline = await buildCover(sourcePath, slot.width, slot.height, slot.position);
  await pipeline.toFile(out);

  const outMeta = await sharp(out).metadata();
  console.log(`  → ${outMeta.width}x${outMeta.height} ${path.relative(process.cwd(), out)}`);
}

console.log("Done.");
