import plain from "../plain.js";
import { mergeConfigs } from "../../helpers.js";

export const vueBase = mergeConfigs(plain, {
  extends: [ "plugin:vue/vue3-recommended" ],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    extraFileExtensions: [ ".vue" ],
    sourceType: "module",
  },
  plugins: [ "vue" ],
  rules: {
    //
    // Warnings
    //
    "vue/html-self-closing": [ "warn", { html: { void: "always", normal: "never", component: "always" }}],
    "vue/max-attributes-per-line": [ "warn", {
      singleline: 7,
      multiline: { max: 2 },
    }],

    //
    // Off
    //
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
  },
});
