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
      // Import from devDependencies should be allowed for scripts used in local development.
      files: [
        // config files
        ".config/", // ./config/ directory proposal by @pi0 https://github.com/pi0/config-dir
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
        // Errors
        //

        // Use global one for standard JavaScript APIs.
        "n/prefer-global/console": "error",
        "n/prefer-global/text-decoder": "error",
        "n/prefer-global/text-encoder": "error",
        "n/prefer-global/url": "error",
        "n/prefer-global/url-search-params": "error",

        // Import or require Node.js-specific APIs.
        "n/prefer-global/buffer": [ "error", "never" ],
        "n/prefer-global/process": [ "error", "never" ],

        "n/prefer-node-protocol": "error", // Prefer `import { ... } from "node:fs"` to `"fs"`
        "n/prefer-promises/dns": "error",
        "n/prefer-promises/fs": "error",

        //
        // Off
        //

        // Duplicate of import-x/no-unresolved
        "n/no-missing-import": "off",

        "n/no-process-exit": "off",

        // Only enable these rules on `phanective/with-deps` ruleset
        "n/no-unpublished-import": "off",
        "n/no-unpublished-require": "off",
      },
    },
  ],
});
