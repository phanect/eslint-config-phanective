import { FlatCompat } from "@eslint/eslintrc";
import { vue } from "./vue.js";
import { defaultConfigOptions, projectRoot } from "../helpers.js";
import type { Linter } from "eslint";
import type { ConfigOptions } from "../types.js";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const nuxt = (options: ConfigOptions = defaultConfigOptions): Linter.FlatConfig[] => [
  // plain is not required here because it is imported in `vueJS()`
  ...vue(options),
  ...compat.config({
    extends: [ "@nuxt/eslint-config" ],
  })
];
