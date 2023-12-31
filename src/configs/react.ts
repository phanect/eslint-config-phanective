import { FlatCompat } from "@eslint/eslintrc";
import { plain } from "./plain.js";
import { defaultConfigOptions, projectRoot } from "../helpers.js";
import type { Linter } from "eslint";
import type { ConfigOptions } from "../types.js";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const react = (options: ConfigOptions = defaultConfigOptions): Linter.FlatConfig[] => [
  ...plain(options),
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
