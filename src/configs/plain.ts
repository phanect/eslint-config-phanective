import { FlatCompat } from "@eslint/eslintrc";
import type { Linter } from "eslint";
import { jsRule, tsRule } from "./overrides/lang-specific.js";
import { projectRoot } from "../helpers.js";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const plain: Linter.FlatConfig[] = [
  jsRule,
  tsRule,
  ...compat.config({
    extends: [
      "plugin:editorconfig/noconflict",
      "plugin:promise/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
    ],
    plugins: [
      "document-write",
      "editorconfig",
      "import",
      "jsdoc", // Types are not supported yet: https://github.com/gajus/eslint-plugin-jsdoc/issues/1130
      "promise",
    ],
    ignorePatterns: [ "*.json", "*.json5" ],
  }),
  {
    files: [ "*" ],
    ignores: [ "*.json", "*.json5" ],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "arrow-body-style": [ "error", "as-needed" ],
      "comma-dangle": [ "error", {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "only-multiline",
      }],
      "no-async-promise-executor": "error",
      "no-misleading-character-class": "error",
      "no-param-reassign": "error",
      "no-return-await": "error",
      "no-script-url": "error",
      "no-template-curly-in-string": "error",
      "no-unused-expressions": [ "error", { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
      "no-unused-labels": "error",
      "no-whitespace-before-property": "error",
      "no-var": "error",
      "prefer-const": [ "error", {
        destructuring: "all",
        ignoreReadBeforeAssign: true,
      }],
      "prefer-spread": "error",

      "document-write/no-document-write": "error",
      "editorconfig/charset": "error",
      "editorconfig/eol-last": "error",
      "editorconfig/indent": [ "error", { SwitchCase: 1 }],
      "editorconfig/linebreak-style": "error",
      "editorconfig/no-trailing-spaces": "error",

      //
      // Warnings: JSDoc
      // JSDoc rules should not be reported as errors but warnings
      //
      "jsdoc/check-examples": "warn",
      "jsdoc/check-indentation": "warn",
      "jsdoc/check-syntax": "warn",
      "jsdoc/require-hyphen-before-param-description": "warn",

      //
      // Warnings - styles
      // These are just a preference in coding style.
      // Following rules doesn't reduce quality or readability
      //
      "array-bracket-spacing": [ "warn", "always", { arraysInArrays: false, objectsInArrays: false }],
      curly: "warn",
      "no-multi-spaces": [ "warn", { ignoreEOLComments: true, exceptions: { Property: true }}],
      "object-curly-spacing": [ "warn", "always", { arraysInObjects: false, objectsInObjects: false }],
      "one-var": [ "warn", "never" ],
      "one-var-declaration-per-line": [ "warn", "initializations" ],
      "padded-blocks": [ "warn", "never" ],
      "prefer-arrow-callback": "warn",
      "quote-props": [ "warn", "as-needed" ],
      quotes: [ "warn", "double" ],
      "space-before-blocks": [ "warn", "always" ],
      "space-before-function-paren": [ "warn", {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      }],
      "space-in-parens": [ "warn", "never" ],
      "spaced-comment": [ "warn", "always" ],
      "switch-colon-spacing": [ "warn", { before: false, after: true }],

      //
      // Off
      //
      "no-console": "off",

      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-description-complete-sentence": "off",
    },
  },
  {
    files: [ "*.cjs" ],
    languageOptions: {
      sourceType: "script",
    },
  },
  {
    files: [
      "*.test.js",
      "*.test.jsx",
      "*.test.mjs",
      "*.test.cjs",
      "*.test.ts",
      "*.test.tsx",
    ],
    ...compat.config({
      extends: [
        "plugin:jest/recommended",
      ],
      env: {
        "jest/globals": true,
      },
      plugins: [ "jest" ],
    })[0],
    rules: {
      //
      // Errors
      //
      "jest/no-disabled-tests": "error",
      "jest/expect-expect": [ "error", {
        assertFunctionNames: [ "expect", "ok" ],
      }],

      //
      // Warnings - styles
      //
      "jest/prefer-to-have-length": "warn",

      //
      // Off
      //
      "jest/no-conditional-expect": "off",
    },
  },
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
  ...compat.config({
    extends: "plugin:jsonc/base",
    parser: "jsonc-eslint-parser",
    rules: {
      "jsonc/array-bracket-spacing": [ "error", "always", {
        objectsInArrays: false,
        arraysInArrays: false,
      }],
      "jsonc/comma-style": [ "error", "last" ],
      "jsonc/indent": [ "error", 2 ],
      "jsonc/key-spacing": [ "error", {
        beforeColon: false,
        afterColon: true,
        mode: "minimum",
      }],
      "jsonc/object-curly-spacing": [ "error", "always", {
        arraysInObjects: false,
        objectsInObjects: false,
      }],
    }
  }).map(config => ({
    files: [ "*.json", "*.json5" ],
    ...config
  })),
  ...compat.config({
    extends: "plugin:jsonc/recommended-with-json",
  }).map(config => ({
    files: [ "*.json" ],
    ...config
  })),
  ...compat.config({
    extends: "plugin:jsonc/recommended-with-json5",
    rules: {
      "jsonc/comma-dangle": [ "error", {
        arrays: "always-multiline",
        objects: "always-multiline",
      }],
      "jsonc/quote-props": [ "error", "as-needed" ],
    },
  }).map(config => ({
    files: [ "*.json5" ],
    ...config
  })),
];
