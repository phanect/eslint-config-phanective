import deepmerge from "deepmerge";
import plain from "./plain.js";

export default deepmerge(plain, {
  extends: [ "plugin:node/recommended" ],
  plugins: [ "node" ],
  rules: {
    //
    // Errors
    //
    // While it is disabled on base config, it is enabled here since it works on Node
    "import/no-unresolved": [ "error", { commonjs: true }],
    "node/no-missing-import": [ "error", {
      tryExtensions: [ ".js", ".ts", ".json" ], // Add .ts
    }],

    //
    // Off
    //
    "no-process-exit": "off",
    "node/no-process-exit": "off",
  },
});
