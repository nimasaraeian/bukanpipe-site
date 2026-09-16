import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public");
const dirs = [
  "media/demo",
  "media/brand",
  "media/editorial",
  "media/products/en",
  "media/gallery",
];

const skipDir = new Set(["credentials"]);

async function inspect(file) {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  const bytes = statSync(file).size;
  const img = sharp(file);
  const meta = await img.metadata();
  return {
    rel: `/${rel}`,
    ext: path.extname(file).toLowerCase(),
    bytes,
    kb: Math.round((bytes / 1024) * 10) / 10,
    width: meta.width,
    height: meta.height,
    format: meta.format,
    hasAlpha: Boolean(meta.hasAlpha),
    space: meta.space,
  };
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (!skipDir.has(name)) walk(full, acc);
      continue;
    }
    if (/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(name)) acc.push(full);
  }
  return acc;
}

const files = dirs.flatMap((d) => {
  const full = path.join(root, d);
  try {
    return walk(full);
  } catch {
    return [];
  }
});

const rows = [];
for (const file of files) {
  try {
    rows.push(await inspect(file));
  } catch (error) {
    rows.push({ rel: file, error: String(error) });
  }
}

rows.sort((a, b) => (b.bytes ?? 0) - (a.bytes ?? 0));
console.log(JSON.stringify(rows, null, 2));
