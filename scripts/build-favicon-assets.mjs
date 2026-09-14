/**
 * Generate official Bukan Pipe favicon set from /public/media/demo/logo.png.
 *
 *   node scripts/build-favicon-assets.mjs
 */
import { Buffer } from "node:buffer";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logoPath = join(root, "public/media/demo/logo.png");
const publicDir = join(root, "public");
const appDir = join(root, "app");

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

const logo = sharp(readFileSync(logoPath));

async function squarePng(size) {
  return logo
    .clone()
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

const png32 = await squarePng(32);
const png48 = await squarePng(48);
const png180 = await squarePng(180);
const png192 = await squarePng(192);
const png512 = await squarePng(512);
const png256 = await squarePng(256);

writeFileSync(join(publicDir, "favicon.ico"), pngToIco([
  { size: 32, buffer: png32 },
  { size: 48, buffer: png48 },
]));
writeFileSync(join(publicDir, "apple-touch-icon.png"), png180);
writeFileSync(join(publicDir, "icon-192.png"), png192);
writeFileSync(join(publicDir, "icon-512.png"), png512);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" role="img" aria-label="Bukan Pipe">
  <title>Bukan Pipe</title>
  <image width="256" height="256" href="data:image/png;base64,${png256.toString("base64")}"/>
</svg>
`;
writeFileSync(join(publicDir, "favicon.svg"), svg);
writeFileSync(join(appDir, "icon.svg"), svg);

console.log("Wrote favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png, app/icon.svg");
