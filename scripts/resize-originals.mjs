#!/usr/bin/env node
/**
 * Resize photography originals in place.
 *
 * Any JPEG/PNG under public/photography/ whose long edge exceeds MAX_EDGE
 * is rewritten in place at MAX_EDGE on the long edge with mozjpeg q=85.
 * Idempotent: small images are skipped.
 *
 * Run: pnpm exec node scripts/resize-originals.mjs
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd(), "public/photography");
const MAX_EDGE = 2400;
const QUALITY = 85;
const VALID_EXT = new Set([".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function fmtBytes(n) {
  return n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${(n / 1024).toFixed(0)} KB`;
}

async function main() {
  let resized = 0, skipped = 0, savedBytes = 0;
  for await (const file of walk(ROOT)) {
    const ext = path.extname(file).toLowerCase();
    if (!VALID_EXT.has(ext)) continue;

    const src = await fs.readFile(file);
    const meta = await sharp(src, { failOn: "none" }).metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    const longEdge = Math.max(w, h);

    if (longEdge <= MAX_EDGE && src.length < 1.5 * 1024 * 1024) {
      skipped++;
      continue;
    }

    const isJpeg = ext === ".jpg" || ext === ".jpeg" || meta.format === "jpeg";
    let pipe = sharp(src, { failOn: "none" }).rotate();
    if (longEdge > MAX_EDGE) {
      pipe = pipe.resize({
        width: w >= h ? MAX_EDGE : null,
        height: h > w ? MAX_EDGE : null,
        withoutEnlargement: true,
        fit: "inside",
      });
    }
    pipe = isJpeg
      ? pipe.jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
      : pipe.png({ quality: QUALITY, compressionLevel: 9 });

    const out = await pipe.toBuffer();
    if (out.length >= src.length) {
      skipped++;
      continue;
    }

    await fs.writeFile(file, out);
    savedBytes += src.length - out.length;
    resized++;
    const rel = path.relative(process.cwd(), file);
    console.log(`  ✓ ${rel}  ${w}x${h} → ${fmtBytes(src.length)}→${fmtBytes(out.length)}`);
  }
  console.log(`\nResized ${resized}, skipped ${skipped}, saved ${fmtBytes(savedBytes)}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
