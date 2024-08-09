import n from "eslint-plugin-n";
import type { CodeExtensions, EsmExtensions } from "../../../../src/utils.ts";
import type { Linter } from "eslint";

const nodejsCommonRules = {
  //
  // Errors
  //
  // Use `throw new Error()` instead of `process.exit(1)` as the official doc recommends
  // https://nodejs.org/docs/latest-v22.x/api/process.html#process_process_exit_code
  "n/no-process-exit": "error",

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

  // Only enable these rules on `phanective/with-deps` ruleset
  "n/no-unpublished-import": "off",
  "n/no-unpublished-require": "off",
};

const mjsConfig: Linter.Config =   {
  files: [
    "*.js",
    "*.mjs",
    "*.jsx",
    "*.ts",
    "*.mts",
    "*.tsx",
    "*.vue",
    "*.svelte",
  ] as EsmExtensions,
  ...n.configs["flat/recommended-module"],
};

export const cjsConfig: Linter.Config = {
  ...n.configs["flat/recommended-script"],
  files: [ "*.cjs" ],

  languageOptions: {
    sourceType: "commonjs",
  },
  rules: {
    // "import-x/no-unresolved": [ "error", { commonjs: true }],
  },
};

export const nodejsConfigs: Linter.Config[] = [
  mjsConfig,
  cjsConfig,
  {
    files: [
      "*.js",
      "*.mjs",
      "*.cjs",
      "*.jsx",
      "*.ts",
      "*.mts",
      "*.cts",
      "*.tsx",
      "*.vue",
      "*.svelte"
    ] as CodeExtensions,
    plugins: {
      n,
    },

    rules: {
      ...nodejsCommonRules,
      "n/no-unpublished-import": "error",
      "n/no-unpublished-require": "error",
    },
  },
] as Linter.Config[];

const devConfigsEsm = [
  n.configs["flat/recommended-module"],
  {
    rules: nodejsCommonRules,
  },
].map(config => ({
  ...config,
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
  ignores: [ "*.cjs" ],
})) as Linter.Config[];

export const devConfigs = [
  ...devConfigsEsm,
  cjsConfig,
] as Linter.Config[];
