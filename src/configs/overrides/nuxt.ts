import { FlatCompat } from "@eslint/eslintrc";
import { vueBase } from "./vue.js";
import { projectRoot } from "../../helpers.js";
import type { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const nuxtBase: Linter.FlatConfig[] = [
  ...vueBase,
  ...compat.config({
    extends: [ "@nuxt/eslint-config" ],
  }),
];
