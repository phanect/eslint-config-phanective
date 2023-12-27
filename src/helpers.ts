import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mergeWith from "lodash.mergewith";
import cloneDeep from "lodash.clonedeep";
import type { Linter } from "eslint";

export const toTSRules = (jsRules: Linter.RulesRecord): Linter.RulesRecord => {
  const tsRules: Linter.RulesRecord = {};

  for (const [ ruleid, options ] of Object.entries(jsRules)) {
    tsRules[`@typescript-eslint/${ruleid}`] = options;
  }

  return tsRules;
};


export const mergeConfigs = (config1, config2) => {
  const _config1 = cloneDeep(config1);

  return mergeWith(_config1, config2, (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.concat(b);
    }
  });
};

// If you want to get project root on e.g. src/configs/overrides/lang-spacific.ts,
// you may want to run join(dirname(fileURLToPath(import.meta.url)), "../../..").
// However, since built file is dist/eslint.mjs, you cannot get project by "../../..".
// I wanted unbuild to handle this so that dist/eslint.mjs refers "..", but it didn't.
// Reporting at https://github.com/unjs/unbuild/issues/354
export const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
