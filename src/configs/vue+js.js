import { jsRules } from "./overrides/lang-specific";
import { vueBase } from "./overrides/vue";
import { mergeConfigs } from "../helpers";

export default mergeConfigs(vueBase, {
  overrides: [
    mergeConfigs(jsRules, {
      files: [ "*.vue" ],
      parser: "vue-eslint-parser",
    }),
  ],
});
