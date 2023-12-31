import { FlatCompat } from "@eslint/eslintrc";
import { plain } from "./plain.js";
import { projectRoot } from "../helpers.js";
import type { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const node = (): Linter.FlatConfig[] => [
  ...plain(),
  ...compat.config({
    extends: [ "plugin:node/recommended" ],
    plugins: [ "node" ],
    rules: {
      //
      // Errors
      //
      // While it is disabled on base config, it is enabled here since it works on Node
      "import/no-unresolved": [ "error", { commonjs: true }],
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
];
