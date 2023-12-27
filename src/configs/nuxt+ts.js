import { tsRules } from "./overrides/lang-specific";
import { nuxtBase } from "./overrides/nuxt";
import { mergeConfigs } from "../helpers";

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
