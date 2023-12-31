import type { Linter } from "eslint";

// Currently, eslint-plugin-node's import-related rules and eslint-plugin-import
// do not work properly with Vitest. Disable those rules for Vitest-related files.
export const vitestWorkaroundConfig: Linter.FlatConfig = {
  files: [
    "**/vitest.config.*",
    "**/*.test.*"
  ],
  rules: {
    "node/no-missing-import": "off",
    "import/named": "off",
    "import/namespace": "off",
    "import/no-unresolved": "off",
  }
};
