import deepmerge from "deepmerge";
import plain from "./plain.ts";

export default deepmerge(plain, {
  extends: [ "plugin:node/recommended" ],
  plugins: [ "node" ],
  rules: {
    //
    // Off
    //

    // Duplicate of import-x/no-unresolved
    "n/no-missing-import": "off",

    "no-process-exit": "off",
    "node/no-process-exit": "off",
  },
  overrides: [
    {
      files: [
        // config files
        "*.config.*",
        ".eslintrc",
        ".eslintrc.*",
        // build scripts
        "script/**",
        "scripts/**",
        // testcases
        "test/**",
        "tests/**",
        "*.test.*",
        "*.spec.*",
      ],
      rules: {
        "node/no-unpublished-import": "off",
        "node/no-unpublished-require": "off",
      },
    },
  ],
});
