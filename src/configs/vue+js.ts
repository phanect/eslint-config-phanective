import { jsRules } from "./overrides/lang-specific.js";
import { vueBase } from "./overrides/vue.js";
import { mergeConfigs } from "../helpers.js";

export default mergeConfigs(vueBase, {
  overrides: [
    mergeConfigs(jsRules, {
      files: [ "*.vue" ],
      parser: "vue-eslint-parser",
    }),
  ],
});
