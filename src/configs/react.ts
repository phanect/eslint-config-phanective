import { FlatCompat } from "@eslint/eslintrc";
import { plain } from "./plain.js";
import { projectRoot } from "../helpers.js";
import type { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const react = (): Linter.FlatConfig[] => [
  ...plain(),
  ...compat.config({
    extends: [
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
    ],
    plugins: [ "react", "react-hooks" ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      "react/jsx-filename-extension": [ "error", { extensions: [ ".jsx", ".tsx" ]}],
      "react/react-in-jsx-scope": "off",
    },
  }),
];
