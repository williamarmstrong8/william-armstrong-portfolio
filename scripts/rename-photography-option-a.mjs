#!/usr/bin/env node
/**
 * Rename images under public/photography/<collection>/ to Option A:
 *   {collection-slug}-{YYYYMMDD}-{seq}.{ext}
 *
 * - Date: EXIF DateTimeOriginal / CreateDate / ModifyDate (via exifr), else file mtime.
 * - seq: 001, 002, … per (folder, calendar day), stable order by current basename.
 * - Two-phase rename via temp names to avoid collisions.
 *
 * Skips files that already match the pattern for that folder's slug.
 *
 * Usage:
 *   pnpm exec node scripts/rename-photography-option-a.mjs
 *   DRY_RUN=1 pnpm exec node scripts/rename-photography-option-a.mjs
 */

import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import exifr from "exifr";

const ROOT = path.resolve(process.cwd(), "public/photography");
const DRY = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";
const VALID_EXT = new Set([".jpg", ".jpeg", ".png"]);

function slugifyFolder(name) {
  return name
    .normalize("NFKD")
    .replace(/'/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normExt(ext) {
  const e = ext.toLowerCase();
  if (e === ".jpeg") return ".jpg";
  return e;
}

function toYyyymmdd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

async function imageDate(filePath, stat) {
  try {
    const tags = await exifr.parse(filePath, {
      pick: ["DateTimeOriginal", "CreateDate", "ModifyDate"],
      mergeOutput: true,
    });
    const raw = tags?.DateTimeOriginal ?? tags?.CreateDate ?? tags?.ModifyDate;
    if (raw instanceof Date && !Number.isNaN(raw.getTime())) return raw;
    if (typeof raw === "string") {
      const d = new Date(raw);
      if (!Number.isNaN(d.getTime())) return d;
    }
  } catch {
    /* fall through */
  }
  return new Date(stat.mtimeMs);
}

function alreadyOptionA(basename, slug) {
  const re = new RegExp(`^${slug.replace(/-/g, "\\-")}-(\\d{8})-(\\d{3})\\.(jpg|png)$`);
  return re.test(basename);
}

async function listCollectionDirs() {
  const out = [];
  const entries = await fs.readdir(ROOT, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isDirectory() || e.name.startsWith(".")) continue;
    out.push(path.join(ROOT, e.name));
  }
  return out.sort((a, b) => path.basename(a).localeCompare(path.basename(b), "en"));
}

async function main() {
  const dirs = await listCollectionDirs();
  const operations = [];

  for (const dir of dirs) {
    const folderName = path.basename(dir);
    const slug = slugifyFolder(folderName);
    const files = (await fs.readdir(dir))
      .filter((n) => !n.startsWith(".") && !n.startsWith(".__rename_"))
      .map((n) => path.join(dir, n));

    const rows = [];
    for (const full of files) {
      const ext = path.extname(full);
      if (!VALID_EXT.has(ext.toLowerCase())) continue;
      const stat = await fs.stat(full);
      if (!stat.isFile()) continue;
      const base = path.basename(full);
      if (alreadyOptionA(base, slug)) {
        console.log(`  skip (already Option A): ${path.relative(process.cwd(), full)}`);
        continue;
      }
      const date = await imageDate(full, stat);
      const ymd = toYyyymmdd(date);
      rows.push({ full, base, ymd, ext: normExt(ext) });
    }

    rows.sort((a, b) => {
      const c = a.ymd.localeCompare(b.ymd, "en");
      if (c !== 0) return c;
      return a.base.localeCompare(b.base, "en");
    });

    /** Names already taken (skipped Option A files). */
    const occupied = new Set();
    for (const name of await fs.readdir(dir)) {
      if (alreadyOptionA(name, slug)) occupied.add(name);
    }

    const pending = new Set();
    for (const r of rows) {
      let seqNum = 0;
      let finalBase;
      do {
        seqNum++;
        const seq = String(seqNum).padStart(3, "0");
        finalBase = `${slug}-${r.ymd}-${seq}${r.ext}`;
      } while (occupied.has(finalBase) || pending.has(finalBase));
      pending.add(finalBase);
      const finalPath = path.join(dir, finalBase);
      if (finalPath === r.full) continue;
      operations.push({ from: r.full, to: finalPath, finalBase });
    }
  }

  if (operations.length === 0) {
    console.log("Nothing to rename (all skipped or empty).");
    return;
  }

  console.log(DRY ? `DRY RUN — would rename ${operations.length} file(s):\n` : `Renaming ${operations.length} file(s):\n`);

  const temps = [];
  for (let i = 0; i < operations.length; i++) {
    const o = operations[i];
    const dir = path.dirname(o.from);
    const tmp = path.join(dir, `.__rename_tmp_${crypto.randomUUID()}${path.extname(o.from)}`);
    temps.push({ ...o, tmp });
    console.log(`  ${path.relative(process.cwd(), o.from)} -> ${o.finalBase}`);
  }

  if (DRY) return;

  for (const t of temps) await fs.rename(t.from, t.tmp);
  for (const t of temps) await fs.rename(t.tmp, t.to);

  console.log("\nDone. Run: pnpm photo:manifest");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
