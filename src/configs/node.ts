import deepmerge from "deepmerge";
import plain from "./plain.ts";

export default deepmerge(plain, {
  overrides: [
    {
      files: [ "*.js", "*.mjs", "*.jsx", "*.ts", "*.tsx", "*.vue" ],
      extends: [ "plugin:n/recommended-module" ],
    },
    {
      files: [ "*.cjs" ],
      extends: [ "plugin:n/recommended-script" ],
    },
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
        "n/no-unpublished-import": "off",
        "n/no-unpublished-require": "off",
      },
    },
    {
      files: [ "**/*" ],
      rules: {
        //
        // Off
        //

        // Duplicate of import-x/no-unresolved
        "n/no-missing-import": "off",

        "no-process-exit": "off",
        "n/no-process-exit": "off",
      },
    },
  ],
});
