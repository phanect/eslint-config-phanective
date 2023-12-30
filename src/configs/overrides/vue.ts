import { FlatCompat } from "@eslint/eslintrc";
import { projectRoot } from "../../helpers.js";
import type { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const vueBase: Linter.FlatConfig[] = compat.config({
  extends: [ "plugin:vue/vue3-recommended" ],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    extraFileExtensions: [ ".vue" ],
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
