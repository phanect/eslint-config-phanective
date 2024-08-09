import type { Linter } from "eslint";

export const ignoreConfigs = [
  {
    ignores: [
      "package-lock.json",
      "npm-shrinkwrap.json",
      ".svelte-kit/",
      "dist/",
      "tmp/",
    ],
  },
] as Linter.Config[];
