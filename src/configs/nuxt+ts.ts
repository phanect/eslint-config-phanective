import { vueTS } from "./vue+ts.js";
import { nuxtBase } from "./overrides/nuxt.js";
import type { Linter } from "eslint";

export const nuxtTS: Linter.FlatConfig[] =  [
  ...vueTS,
  ...nuxtBase,
];
