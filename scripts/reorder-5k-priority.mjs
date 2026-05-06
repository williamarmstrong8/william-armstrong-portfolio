#!/usr/bin/env node
/**
 * One-off reorder for 5k Run & Roll '24 / '25 per user priority lists.
 * Uses two-phase rename to avoid collisions.
 */

import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public/photography");

async function twoPhaseRename(dir, pairs) {
  /** @type {{ from: string; tmp: string; to: string }[]} */
  const steps = pairs.map(({ from, to }) => ({
    from,
    to,
    tmp: path.join(dir, `.__reorder_${crypto.randomUUID()}`),
  }));
  for (const s of steps) await fs.rename(s.from, s.tmp);
  for (const s of steps) await fs.rename(s.tmp, s.to);
}

/** Last -NNN before extension */
function seqFromBasename(base) {
  const m = base.match(/-(\d{3})\.[a-z]+$/i);
  return m ? parseInt(m[1], 10) : null;
}

async function main() {
  const dir24 = path.join(ROOT, "5k Run & Roll '24");
  const priority24 = [1, 6, 9, 11];
  const all24 = (await fs.readdir(dir24))
    .filter((n) => /\.(jpe?g|png)$/i.test(n))
    .sort((a, b) => a.localeCompare(b, "en"));
  const seqs24 = [...new Set(all24.map(seqFromBasename).filter(Boolean))].sort((a, b) => a - b);
  const rest24 = seqs24.filter((s) => !priority24.includes(s));
  const order24 = [...priority24, ...rest24];
  console.log("5k '24 order:", order24.join(", "));

  const pairs24 = [];
  const prefix24 = "5k-run-roll-24-20260429";
  for (let i = 0; i < order24.length; i++) {
    const oldSeq = order24[i];
    const oldName = `${prefix24}-${String(oldSeq).padStart(3, "0")}.jpg`;
    const newName = `${prefix24}-${String(i + 1).padStart(3, "0")}.jpg`;
    const from = path.join(dir24, oldName);
    const to = path.join(dir24, newName);
    try {
      await fs.access(from);
    } catch {
      console.error(`Missing expected file: ${from}`);
      process.exit(1);
    }
    if (oldName !== newName) pairs24.push({ from, to });
  }
  if (pairs24.length) {
    console.log(`Renaming ${pairs24.length} file(s) in '24...`);
    await twoPhaseRename(dir24, pairs24);
  }

  const dir25 = path.join(ROOT, "5k Run & Roll '25");
  const priority25 = [20, 1, 4, 7, 15, 5, 9, 16, 18];
  const files25 = (await fs.readdir(dir25))
    .filter((n) => /\.(jpe?g|png)$/i.test(n) && !n.startsWith("."))
    .sort((a, b) => a.localeCompare(b, "en"));

  const bySeq = new Map();
  for (const name of files25) {
    const seq = seqFromBasename(name);
    if (seq == null) {
      console.error(`Cannot parse seq from: ${name}`);
      process.exit(1);
    }
    if (bySeq.has(seq)) {
      console.error(`Duplicate seq ${seq}: ${bySeq.get(seq)} vs ${name}`);
      process.exit(1);
    }
    bySeq.set(seq, name);
  }

  const seqs25 = [...bySeq.keys()].sort((a, b) => a - b);
  const rest25 = seqs25.filter((s) => !priority25.includes(s));
  const order25 = [...priority25, ...rest25];
  console.log("5k '25 order:", order25.join(", "));

  const pairs25 = [];
  let pos = 1;
  for (const oldSeq of order25) {
    const oldName = bySeq.get(oldSeq);
    const from = path.join(dir25, oldName);
    const sortPrefix = String(pos).padStart(3, "0");
    const toName = `${sortPrefix}-${oldName}`;
    const to = path.join(dir25, toName);
    pos++;
    if (oldName !== toName) pairs25.push({ from, to });
  }

  if (pairs25.length) {
    console.log(`Renaming ${pairs25.length} file(s) in '25 (sort prefix)...`);
    await twoPhaseRename(dir25, pairs25);
  }

  console.log("Done. Run: pnpm photo:manifest");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
