/**
 * Official Bukan Pipe favicon set from /public/media/demo/logo.png.
 *
 * Google Search needs a stable square PNG (not SVG, not a hashed /icon.svg URL).
 * Tiles use a white field and padding so the mark stays inside Google's circular crop.
 *
 *   node scripts/build-favicon-assets.mjs
 */
import { Buffer } from "node:buffer";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logoPath = join(root, "public/media/demo/logo.png");
const publicDir = join(root, "public");
const appDir = join(root, "app");

/** Gap between the emblem and the "BUKAN" wordmark in the source lockup. */
const EMBLEM_BOTTOM_Y = 995;
const PAD_RATIO = 0.16;
const TILE_BG = { r: 255, g: 255, b: 255, alpha: 255 };

function pngToIco(pngImages) {
  const count = pngImages.length;
  const headerSize = 6 + 16 * count;
  let offset = headerSize;
  const chunks = [];

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  pngImages.forEach((png, index) => {
    const entry = 6 + index * 16;
    const size = png.size >= 256 ? 0 : png.size;
    header.writeUInt8(size, entry);
    header.writeUInt8(size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.buffer.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    chunks.push(png.buffer);
    offset += png.buffer.length;
  });

  return Buffer.concat([header, ...chunks]);
}

const sourceMeta = await sharp(readFileSync(logoPath)).metadata();
if (!sourceMeta.width || !sourceMeta.height) {
  throw new Error("Logo source is missing dimensions.");
}

const croppedEmblem = await sharp(readFileSync(logoPath))
  .extract({
    left: 0,
    top: 0,
    width: sourceMeta.width,
    height: Math.min(EMBLEM_BOTTOM_Y, sourceMeta.height),
  })
  .png()
  .toBuffer();

const emblemBuffer = await sharp(croppedEmblem).trim({ threshold: 8 }).png().toBuffer();

async function brandTile(size) {
  const inner = Math.max(1, Math.round(size * (1 - PAD_RATIO * 2)));
  const mark = await sharp(emblemBuffer)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: TILE_BG,
    },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();
}

const png16 = await brandTile(16);
const png32 = await brandTile(32);
const png48 = await brandTile(48);
const png180 = await brandTile(180);
const png192 = await brandTile(192);
const png512 = await brandTile(512);

writeFileSync(
  join(publicDir, "favicon.ico"),
  pngToIco([
    { size: 16, buffer: png16 },
    { size: 32, buffer: png32 },
    { size: 48, buffer: png48 },
  ]),
);
writeFileSync(join(publicDir, "apple-touch-icon.png"), png180);
writeFileSync(join(publicDir, "apple-touch-icon-precomposed.png"), png180);
writeFileSync(join(publicDir, "icon-192.png"), png192);
writeFileSync(join(publicDir, "icon-512.png"), png512);

for (const stale of [join(appDir, "icon.svg"), join(publicDir, "favicon.svg")]) {
  if (existsSync(stale)) unlinkSync(stale);
}

console.log(
  "Wrote favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png; removed SVG icons Google cannot rasterize.",
);
