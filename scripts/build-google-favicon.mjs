import { writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const logo = path.resolve("public/media/brand/bukan-pipe-google-favicon-source.png");
const publicDir = path.resolve("public");
const BLACK = { r: 0, g: 0, b: 0, alpha: 1 };
const PAD_RATIO = 0.08;

function pngsToIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  const payloads = [];
  let offset = 6 + images.length * 16;

  for (const { size, png } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    payloads.push(png);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...payloads]);
}

async function squareIcon(size) {
  const inner = Math.max(1, Math.round(size * (1 - PAD_RATIO * 2)));
  const mark = await sharp(logo)
    .resize(inner, inner, { fit: "contain", background: BLACK })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: BLACK },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();
}

const png16 = await squareIcon(16);
const png32 = await squareIcon(32);
const png48 = await squareIcon(48);
const png96 = await squareIcon(96);
const png180 = await squareIcon(180);
const png192 = await squareIcon(192);
const png256 = await squareIcon(256);
const png512 = await squareIcon(512);

writeFileSync(path.join(publicDir, "bukan-pipe-icon.png"), png96);
writeFileSync(path.join(publicDir, "icon-48.png"), png48);
writeFileSync(path.join(publicDir, "icon-96.png"), png96);
writeFileSync(path.join(publicDir, "icon-192.png"), png192);
writeFileSync(path.join(publicDir, "icon-512.png"), png512);
writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);
writeFileSync(path.join(publicDir, "apple-touch-icon-precomposed.png"), png180);
writeFileSync(
  path.join(publicDir, "favicon.ico"),
  pngsToIco([
    { size: 16, png: png16 },
    { size: 32, png: png32 },
    { size: 48, png: png48 },
  ]),
);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Bukan Pipe">
  <title>Bukan Pipe</title>
  <image width="256" height="256" href="data:image/png;base64,${png256.toString("base64")}"/>
</svg>
`;
writeFileSync(path.join(publicDir, "favicon.svg"), svg);

console.log("Google SERP icons written: official white-on-black Bukan lockup");
