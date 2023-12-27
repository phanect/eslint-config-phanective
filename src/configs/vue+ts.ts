import { FlatCompat } from "@eslint/eslintrc";
import { tsRule } from "./overrides/lang-specific.js";
import { plain } from "./plain.js";
import { vueBase } from "./overrides/vue.js";
import { projectRoot } from "../helpers.js";
import type { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const vueTS: Linter.FlatConfig[] = [
  ...plain,
  ...vueBase,
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
