import { jsRules } from "./overrides/lang-specific.js";
import { nuxtBase } from "./overrides/nuxt.js";
import { mergeConfigs } from "../helpers.js";

export default mergeConfigs(nuxtBase, {
  overrides: [
    mergeConfigs(jsRules, {
      files: [ "*.vue" ],
      parser: "vue-eslint-parser",
    }),
  ],
});
