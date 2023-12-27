import { vueBase } from "./vue.js";
import { mergeConfigs } from "../../helpers.js";

export const nuxtBase = mergeConfigs(vueBase, {
  extends: [ "@nuxt/eslint-config" ],
});
