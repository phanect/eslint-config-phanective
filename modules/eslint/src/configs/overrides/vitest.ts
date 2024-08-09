import vitest from "eslint-plugin-vitest";

export const vitestConfigs = [{
  files: [
    "*.test.js",
    "*.test.jsx",
    "*.test.mjs",
    "*.test.cjs",
    "*.test.ts",
    "*.test.tsx",
  ],
  plugins: {
    vitest,
  },
  rules: {
    ...vitest.configs.recommended.rules,

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
}];
