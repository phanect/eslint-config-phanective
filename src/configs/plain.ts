import { jsRules, tsRules } from "./overrides/lang-specific.ts";
import type { Linter } from "eslint";

const plain: Linter.Config = {
  extends: [
    "plugin:editorconfig/noconflict",
    "plugin:promise/recommended",
    "plugin:import-x/recommended",
  ],

  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    extraFileExtensions: [
      ".js",
      ".mjs",
      ".cjs",
      ".jsx",
      ".ts",
      ".mts",
      ".cts",
      ".tsx",
      ".vue",
      ".svelte",
      ".json",
      ".jsonc",
      ".json5",
    ],
  },
  plugins: [
    "document-write",
    "editorconfig",
    "import",
    "jsdoc",
    "promise",
  ],
  ignorePatterns: [
    "node_modules/",
    "package-lock.json",
    "npm-shrinkwrap.json",

    "dist/",
    "tmp/",
  ],
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
    "import-x/no-unresolved": [ "error", { ignore: [ "vitest/config" ]}],
    "promise/prefer-await-to-callbacks": "error",
    "promise/prefer-await-to-then": "error",

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

    // Require file extensions in `import`s
    "import-x/extensions": [ "warn", "always", { ignorePackages: true }],

    //
    // Off
    //
    "no-console": "off",
  },
  overrides: [
    {
      files: [ "*.js", "*.mjs", "*.cjs", "*.jsx" ],
      ...jsRules,
    },
    {
      files: [ "*.cjs" ],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: [ "*.ts", "*.tsx" ],
      ...tsRules,
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

      extends: [
        "plugin:vitest/legacy-recommended",
      ],

      env: {
        node: true,
      },
      plugins: [ "vitest" ],

      rules: {
        //
        // Errors
        //
        "vitest/no-disabled-tests": "error",
        "vitest/no-focused-tests": "error",
        "vitest/expect-expect": [ "error", {
          assertFunctionNames: [ "expect", "ok" ],
        }],

        //
        // Warnings - styles
        //
        "vitest/prefer-lowercase-title": [ "warn", { ignore: [ "describe", "test" ]}],
        "vitest/prefer-to-have-length": "warn",

        //
        // Off
        //
        "vitest/no-conditional-expect": "off",
        "vitest/require-top-level-describe": "off",
      },
    },
    {
      files: [ "*.json", "*.json5" ],
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
      },
    },
    {
      files: [ "*.json" ],
      extends: "plugin:jsonc/recommended-with-json",
    },
    {
      files: [ "*.json5" ],
      extends: "plugin:jsonc/recommended-with-json5",
      rules: {
        "jsonc/comma-dangle": [ "error", {
          arrays: "always-multiline",
          objects: "always-multiline",
        }],
        "jsonc/quote-props": [ "error", "as-needed" ],
      },
    },
  ],
  settings: {
    "import-x/ignore": [
      "node_modules",
      "vitest", // not working with import-x/named
    ],
  },
} as const;

export default plain;
