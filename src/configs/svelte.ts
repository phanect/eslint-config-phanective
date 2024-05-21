import deepmerge from "deepmerge";
import plain from "./plain.ts";
import type { Linter } from "eslint";

const config: Linter.Config = deepmerge(plain, {
  ignorePatterns: [
    ".svelte-kit/",
  ],
  overrides: [
    {
      files: [ "*.svelte" ],
      extends: [ "plugin:svelte/recommended" ],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: {
          js: "espree",
          ts: "@typescript-eslint/parser",
          typescript: "@typescript-eslint/parser",
        },
      },
      plugins: [ "svelte" ],
      rules: {
        "svelte/no-target-blank": [ "error", { allowReferrer: true }],
      },
    },
  ],
});

export default config;
