import { nuxtBase } from "./overrides/nuxt.js";
import { vueJS } from "./vue+js.js";
import type { Linter } from "eslint";

export const nuxtJS: Linter.FlatConfig[] = [
  ...vueJS,
  ...nuxtBase,
];
