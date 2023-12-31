import { FlatCompat } from "@eslint/eslintrc";
import { plain } from "./plain.js";
import { jsRule, tsRule } from "./overrides/lang-specific.js";
import { projectRoot } from "../helpers.js";
import type { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

const vue = (): Linter.FlatConfig[] => [
  ...plain(),
  ...compat.config({
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
  }),
];

export const vueJS = (): Linter.FlatConfig[] => [
  ...vue(),
  {
    ...jsRule,
    files: [ "*.vue" ], // overwrite jsRule's `files` property, so place after `...jsRule`.
    ...compat.config({
      parser: "vue-eslint-parser",
    })[0],
  },
];

export const vueTS = (): Linter.FlatConfig[] => [
  ...vue(),
  {
    ...tsRule,
    files: [ "*.vue" ], // overwrite tsRule's `files` property, so place after `...tsRule`.
    ...compat.config({
      parser: "vue-eslint-parser", // overwrite tsRule's `parser` property, so place after `...tsRule`.
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    })[0],
  },
];
