import { tsRules } from "./overrides/lang-specific.js";
import { nuxtBase } from "./overrides/nuxt.js";
import { mergeConfigs } from "../helpers.js";

delete tsRules.parser; // Do not override parser: "vue-eslint-parser"

export default mergeConfigs(nuxtBase, {
  overrides: [
    mergeConfigs(tsRules, {
      files: [ "*.vue" ],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    }),
  ],
});
