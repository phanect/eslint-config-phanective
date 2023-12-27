import { FlatCompat } from "@eslint/eslintrc";
import { jsRule } from "./overrides/lang-specific.js";
import { nuxtBase } from "./overrides/nuxt.js";
import { plain } from "./plain.js";
import { projectRoot } from "../helpers.js";
import type { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const nuxtJS: Linter.FlatConfig[] = [
  ...plain,
  ...nuxtBase,
  {
    ...jsRule,
    files: [ "*.vue" ], // overwrite jsRule's `files` property, so place after `...jsRule`.
    ...compat.config({
      parser: "vue-eslint-parser",
    })[0],
  },
];
