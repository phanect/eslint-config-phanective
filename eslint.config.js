import { node } from "./modules/eslint/dist/eslint.mjs";

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    ignores: [
      "examples/**", // Run ESLint command in each module directories
      "tests/fixtures/invalid/**",
      "rwt.json",
    ],
  },
  ...node,
  {
    files: [ "*" ],

    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
