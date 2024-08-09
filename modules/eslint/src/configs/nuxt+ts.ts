import { nuxtBase } from "./overrides/nuxt.ts";
import plain from "./plain.ts";
import type { Linter } from "eslint";

export const nuxtTS: Linter.Config[] = [
  ...plain,
  ...nuxtBase,
  {
    // To overwrite tsRule's `files` property, place these properties after `...tsRule`.
    files: [ "*.vue" ],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
      }
    },
  },
];
