"use strict";

module.exports = {
  overrides: [{
    files: [
      "*.test.js", "**/*.test.js",
      "*.test.jsx", "**/*.test.jsx",
      "*.test.mjs", "**/*.test.mjs",
      "*.test.cjs", "**/*.test.cjs",
      "*.test.ts", "**/*.test.ts",
      "*.test.tsx", "**/*.test.tsx",
    ],

    extends: [
      "plugin:jest/recommended",
    ],

    env: {
      node: true,
      "jest/globals": true,
    },
    plugins: [ "jest" ],

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
  }],
} ;
