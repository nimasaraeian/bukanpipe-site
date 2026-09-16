import { writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const logo = path.resolve("public/media/demo/logo.png");
const publicDir = path.resolve("public");

function pngToIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(48, 0);
  entry.writeUInt8(48, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, png]);
}

async function writePng(size, filename) {
  const buf = await sharp(logo)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .png()
    .toBuffer();
  writeFileSync(path.join(publicDir, filename), buf);
}

const png48 = await sharp(logo)
  .resize(48, 48, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } })
  .png()
  .toBuffer();

writeFileSync(path.join(publicDir, "icon-48.png"), png48);
writeFileSync(path.join(publicDir, "favicon.ico"), pngToIco(png48));

await writePng(180, "apple-touch-icon.png");
await writePng(180, "apple-touch-icon-precomposed.png");
await writePng(192, "icon-192.png");
await writePng(512, "icon-512.png");

console.log("Google-ready square brand icons written from logo.png");
