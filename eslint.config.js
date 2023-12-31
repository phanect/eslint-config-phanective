import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import { node } from "./dist/eslint.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  ...node(),
  {
    files: [ "*" ],

    ignores: [
      "tests/fixtures/invalid/**",

      "tests/configs.test.ts", // TODO Fix this file after ESLint 9 is released and flat config is GA.
      "tests/testutils.ts" // TODO replace this file with @phanect/utils
    ],
    ...compat.config({
      parserOptions: {
        project: join(__dirname, "tsconfig.json"),
      },
    })[0],
  },
];
