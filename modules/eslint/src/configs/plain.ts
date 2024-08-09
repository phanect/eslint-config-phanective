import stylistic from "@stylistic/eslint-plugin";
import promise from "eslint-plugin-promise";
import { ignoreConfigs } from "./overrides/ignores.ts";
import { jsonConfigs } from "./overrides/json.ts";
import { devConfigs } from "./overrides/nodejs.ts";
import { vitestConfigs } from "./overrides/vitest.ts";
import type { Linter } from "eslint";
import { commonConfigs, jsConfigs, tsConfigs } from "./overrides/lang-specific.ts";
import type { CodeExtensions } from "../utils.ts";

export const configs: Linter.Config[] = [
  ...ignoreConfigs,
  {
    files: [ "*" ],
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: "error",
    },
    plugins: {
      "@stylistic": stylistic,
      promise,
    },
  },
  {
    files: [ "*.js", "*.mjs", "*.cjs", "*.jsx", "*.ts", "*.mts", "*.cts", "*.tsx", "*.vue", "*.svelte" ] as CodeExtensions,
    ...stylistic.configs["recommended-flat"],
  },
  promise.configs["flat/recommended"],
  // TODO add import-x, editorconfig, and document-write plugins when it is ready to flat configs
  // importConfigs["flat/recommended"],
  // editorConfigConfigs["recommended"],
  // docWriteConfigs["recommended"],
  ...jsConfigs,
  ...tsConfigs,
  ...commonConfigs,
  ...devConfigs,
  ...vitestConfigs,
  ...jsonConfigs,
] as const;
