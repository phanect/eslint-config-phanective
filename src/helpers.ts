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
