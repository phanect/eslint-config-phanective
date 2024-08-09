import stylistic from "@stylistic/eslint-plugin";
import promise from "eslint-plugin-promise";
import { ignoreConfigs } from "./overrides/ignores.ts";
import { jsonConfigs } from "./overrides/json.ts";
import { vitestConfigs } from "./overrides/vitest.ts";
import type { Linter } from "eslint";
import { jsRules, tsRules } from "./overrides/lang-specific.ts";
import type { CodeExtensions } from "../utils.ts";

const plain: Linter.Config[] = [
  ...ignoreConfigs,
  {
    files: [ "*" ],
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: "error",
    },
    plugins: {
      "@stylistic": stylistic,
      promise,
    },
  },
  {
    files: [ "*.js", "*.mjs", "*.cjs", "*.jsx", "*.ts", "*.mts", "*.cts", "*.tsx", "*.vue", "*.svelte" ] as CodeExtensions,
    ...stylistic.configs["recommended-flat"],
  },
  ...jsRules,
  ...tsRules,
  promise.configs["flat/recommended"],
  // TODO add import-x, editorconfig, and document-write plugins when it is ready to flat configs
  // importConfigs["flat/recommended"],
  // editorConfigConfigs["recommended"],
  // docWriteConfigs["recommended"],
  {
    files: [ "*.js", "*.mjs", "*.cjs", "*.jsx", "*.ts", "*.mts", "*.cts", "*.tsx", "*.vue", "*.svelte" ] as CodeExtensions,

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "arrow-body-style": [ "error", "as-needed" ],
      "@stylistic/comma-dangle": [ "error", {
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

      // "document-write/no-document-write": "error",
      // "editorconfig/charset": "error",
      // "editorconfig/eol-last": "error",
      // "editorconfig/indent": [ "error", { SwitchCase: 1 }],
      // "editorconfig/linebreak-style": "error",
      // "editorconfig/no-trailing-spaces": "error",

      // Temporal equivalent rules for editorconfig plugin
      "unicode-bom": [ "error", "never" ],
      "@stylistic/eol-last": [ "error", "always" ],
      "@stylistic/indent": [ "error", 2, { SwitchCase: 1 }],
      "@stylistic/linebreak-style": [ "error", "unix" ],
      "@stylistic/no-trailing-spaces": "error",

      // "import-x/no-unresolved": [ "error", { ignore: [ "vitest/config" ]}],
      "promise/prefer-await-to-callbacks": "error",
      "promise/prefer-await-to-then": "error",

      //
      // Warnings - styles
      // These are just a preference in coding style.
      // Following rules doesn't reduce quality or readability
      //
      "@stylistic/array-bracket-spacing": [ "warn", "always", { arraysInArrays: false, objectsInArrays: false }],
      curly: "warn",
      "@stylistic/no-multi-spaces": [ "warn", { ignoreEOLComments: true, exceptions: { Property: true }}],
      "@stylistic/object-curly-spacing": [ "warn", "always", { arraysInObjects: false, objectsInObjects: false }],
      "one-var": [ "warn", "never" ],
      "@stylistic/one-var-declaration-per-line": [ "warn", "initializations" ],
      "@stylistic/padded-blocks": [ "warn", "never" ],
      "prefer-arrow-callback": "warn",
      "@stylistic/quote-props": [ "warn", "as-needed" ],
      "@stylistic/quotes": [ "warn", "double" ],
      "@stylistic/semi": [ "error", "always" ],
      "@stylistic/space-before-function-paren": [ "warn", {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      }],
      "@stylistic/spaced-comment": [ "warn", "always" ],
      "@stylistic/switch-colon-spacing": [ "warn", { before: false, after: true }],

      // Require file extensions in `import`s
      // "import-x/extensions": [ "warn", "always", { ignorePackages: true }],

      //
      // Off
      //
      "no-console": "off",
    },
    settings: {
      // "import-x/ignore": [
      //   "node_modules",
      //   "vitest", // not working with import-x/named
      // ],
    },
  },
  {
    files: [ "*.cjs" ],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  ...vitestConfigs,
  ...jsonConfigs,
] as const;

export default plain;
