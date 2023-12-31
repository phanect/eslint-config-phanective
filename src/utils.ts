import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Linter } from "eslint";
import type { ConfigOptions } from "./types.js";

export const toTSRules = (jsRules: Linter.RulesRecord): Linter.RulesRecord => {
  const tsRules: Linter.RulesRecord = {};

  for (const [ ruleid, options ] of Object.entries(jsRules)) {
    tsRules[`@typescript-eslint/${ruleid}`] = options;
  }

  return tsRules;
};

export const defaultConfigOptions: ConfigOptions = {
  testLib: "vitest",
  vueLang: "ts",
};

// If you want to get project root on e.g. src/configs/overrides/lang-spacific.ts,
// you may want to run join(dirname(fileURLToPath(import.meta.url)), "../../..").
// However, since built file is dist/eslint.mjs, you cannot get project by "../../..".
// I wanted unbuild to handle this so that dist/eslint.mjs refers "..", but it didn't.
// Reporting at https://github.com/unjs/unbuild/issues/354
export const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
