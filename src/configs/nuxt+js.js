import { jsRules } from "./overrides/lang-specific";
import { nuxtBase } from "./overrides/nuxt";
import { mergeConfigs } from "../helpers";

export default mergeConfigs(nuxtBase, {
  overrides: [
    mergeConfigs(jsRules, {
      files: [ "*.vue" ],
      parser: "vue-eslint-parser",
    }),
  ],
});
