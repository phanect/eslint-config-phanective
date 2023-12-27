import { tsRules } from "./overrides/lang-specific";
import { vueBase } from "./overrides/vue";
import { mergeConfigs } from "../helpers";

delete tsRules.parser; // Do not override parser: "vue-eslint-parser"

export default mergeConfigs(vueBase, {
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
