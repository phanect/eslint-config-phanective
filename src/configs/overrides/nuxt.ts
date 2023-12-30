import { FlatCompat } from "@eslint/eslintrc";
import { projectRoot } from "../../helpers.js";
import type { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const nuxtBase: Linter.FlatConfig[] = compat.config({
  extends: [ "@nuxt/eslint-config" ],
});
