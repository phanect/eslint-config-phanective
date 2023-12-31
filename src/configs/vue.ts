import { FlatCompat } from "@eslint/eslintrc";
import { plain } from "./plain.js";
import { jsConfigs, tsConfigs } from "./overrides/lang-specific.js";
import { defaultConfigOptions, projectRoot } from "../utils.js";
import type { Linter } from "eslint";
import type { ConfigOptions } from "../types.js";

const compat = new FlatCompat({
  baseDirectory: projectRoot,
  resolvePluginsRelativeTo: projectRoot,
});

export const vue = ({ testLib, vueLang }: ConfigOptions = defaultConfigOptions): Linter.FlatConfig[] => {
  const configs: Linter.FlatConfig[] = [
    ...plain({ testLib }),
    ...compat.config({
      extends: [ "plugin:vue/vue3-recommended" ],
      env: {
        browser: true,
        node: true,
      },
      parserOptions: {
        extraFileExtensions: [ ".vue" ],
      },
      plugins: [ "vue" ],
      rules: {
        //
        // Warnings
        //
        "vue/html-self-closing": [ "warn", { html: { void: "always", normal: "never", component: "always" }}],
        "vue/max-attributes-per-line": [ "warn", {
          singleline: 7,
          multiline: { max: 2 },
        }],

        //
        // Off
        //
        "vue/multi-word-component-names": "off",
        "vue/no-v-html": "off",
      },
    }),
  ];
  const vueTsConfigs: Linter.FlatConfig[] = [
    ...tsConfigs(),
    {
      files: [ "*.vue" ], // overwrite tsRule's `files` property, so place after `...tsRule`.
      ...compat.config({
        parser: "vue-eslint-parser", // overwrite tsRule's `parser` property, so place after `...tsRule`.
        parserOptions: {
          parser: "@typescript-eslint/parser",
        },
      })[0],
    }
  ];
  const vueJsConfigs: Linter.FlatConfig[] = [
    ...jsConfigs(),
    {
      files: [ "*.vue" ], // overwrite jsRule's `files` property, so place after `...jsRule`.
      ...compat.config({
        parser: "vue-eslint-parser",
      })[0],
    }
  ];

  if (vueLang === "ts" || vueLang === undefined) {
    return [ ...configs, ...vueTsConfigs ];
  } else if (vueLang === "js") {
    return [ ...configs, ...vueJsConfigs ];
  } else if (Array.isArray(vueLang)) {
    return [
      ...configs,
      ...vueLang.map(({ files, lang }) =>
        lang === "ts" ?
          vueTsConfigs.map(config => ({
            ...config,
            files,
          })) :
          vueJsConfigs.map(config => ({
            ...config,
            files,
          }))
      ).flat(),
    ];
  } else {
    throw new Error(`Unexpected option for vueLang: "${vueLang}"`);
  }
}
