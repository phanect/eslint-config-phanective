import type { Linter } from "eslint";

const config: Linter.Config = {
  rules: {
    "n/no-unpublished-import": "error",
    "n/no-unpublished-require": "error",
  },
};

export default config;
