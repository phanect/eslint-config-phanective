import { defineConfig } from "oxfmt";

export default defineConfig({
  $schema: "./node_modules/oxfmt/configuration_schema.json",

  bracketSameLine: false,
  bracketSpacing: true,
  proseWrap: "preserve",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 80,
  sortPackageJson: false,
  ignorePatterns: [
    // These files are formatted by ESLint stylistic
    "*.js",
    "*.mjs",
    "*.cjs",
    "*.jsx",
    "*.ts",
    "*.mts",
    "*.cts",
    "*.tsx",
    "*.json",
    "*.jsonc",
    "*.json5",
  ],
});
