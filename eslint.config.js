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
  ...node,
  {
    files: [ "*" ],

    ignores: [
      "tests/js/**",
      "tests/ts/**",
    ],
    ...compat.config({
      parserOptions: {
        project: join(__dirname, "tsconfig.json"),
      },
    })[0],
  },
];
