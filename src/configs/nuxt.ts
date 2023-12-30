import { FlatCompat } from "@eslint/eslintrc";
import { vueJS, vueTS } from "./vue.js";
import { projectRoot } from "../helpers.js";
import type { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

const nuxt: Linter.FlatConfig[] = compat.config({
  extends: [ "@nuxt/eslint-config" ],
});

export const nuxtJS: Linter.FlatConfig[] = [
  // plain is not required here because it is imported in `vueJS`
  ...vueJS,
  ...nuxt,
];

export const nuxtTS: Linter.FlatConfig[] =  [
  // plain is not required here because it is imported in `vueTS`
  ...vueTS,
  ...nuxt,
];
