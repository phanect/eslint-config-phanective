import { toTSRules } from "../../helpers.js";

const commonRulesJS = {
  "no-unused-vars": "error",
  "no-use-before-define": "error",
  semi: [ "error", "always" ],

  //
  // Warnings - styles
  // These are just a preference in coding style.
  // Following rules doesn't reduce quality or readability
  //
  "brace-style": "warn",

  // Sometimes API requires async function as callback, and you don't use await
  // in the function. In such case, it is difficult to follow require-await.
  "require-await": "off",
};

export const jsRules = {
  extends: [
    "eslint:recommended",
    "plugin:jsdoc/recommended",
  ],
  rules: {
    ...commonRulesJS,

    // This rule also disallows "use strict"; in module-based code including TypeScript.
    // You can still add "use strict"; in each source TypeScript code,
    // so I enable this rule only for JavaScript
    strict: [ "error", "safe" ],
  },
};

export const tsRules = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:jsdoc/recommended-typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  plugins: [ "@typescript-eslint" ],
  rules: {
    ...toTSRules(commonRulesJS),

    //
    // Errors
    //
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/explicit-function-return-type": [ "error", { allowExpressions: true }],

    //
    // Warnings
    //
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",

    //
    // Off
    //
    "@typescript-eslint/indent": "off", // avoid conflict against editorconfig/indent
    "@typescript-eslint/no-this-alias": "off",

    // These rules may warn new ES syntax which is supported by TypeScript (e.g. import)
    "node/no-unsupported-features/es-builtins": "off",
    "node/no-unsupported-features/es-syntax": "off",
  },
};
