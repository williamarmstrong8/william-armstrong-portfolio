#!/usr/bin/env node
/** Thin wrapper — same as: node scripts/reorder-folder-random-prefix.mjs film */
import { run } from "./reorder-folder-random-prefix.mjs";

await run("film").catch((e) => {
  console.error(e);
  process.exit(1);
});
