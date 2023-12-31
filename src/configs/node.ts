import { FlatCompat } from "@eslint/eslintrc";
import { plain } from "./plain.js";
import { defaultConfigOptions, projectRoot } from "../helpers.js";
import type { Linter } from "eslint";
import type { ConfigOptions } from "../types.js";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const node = (options: ConfigOptions = defaultConfigOptions): Linter.FlatConfig[] => [
  ...plain(options),
  ...compat.config({
    extends: [ "plugin:node/recommended" ],
    plugins: [ "node" ],
    rules: {
      //
      // Errors
      //
      "node/no-missing-import": [ "error", {
        tryExtensions: [ ".js", ".ts", ".json" ], // Add .ts
      }],

      //
      // Off
      //
      "no-process-exit": "off",
      "node/no-process-exit": "off",
    },
  }),
  {
    files: [
      // config files
      "*.config.*",
      ".eslintrc",
      ".eslintrc.*",
      // build scripts
      "script/*",
      "scripts/*",
      // testcases
      "test/*",
      "tests/*",
      "*.test.*",
      "*.spec.*",
    ],
    rules: {
      "node/no-unpublished-import": "off",
      "node/no-unpublished-require": "off",
    },
  },
];
