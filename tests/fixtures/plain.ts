// Not alphabetically sorted imports
import { join } from "node:path";
import { stat } from "node:fs/promises";

if (await stat(join(import.meta.dirname, "plain.ts"))) {
  console.log("plain.ts exists.");
}
