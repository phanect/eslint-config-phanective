import { FlatCompat } from "@eslint/eslintrc";
import { react } from "./react.js";
import { defaultConfigOptions, projectRoot } from "../utils.js";
import type { Linter } from "eslint";
import type { ConfigOptions } from "../types.js";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const next = (options: ConfigOptions = defaultConfigOptions): Linter.FlatConfig[] => [
  // plain is not required here because it is imported in `react()`
  ...react(options),
  ...compat.extends("next/core-web-vitals"),
];
