"use strict";

const plain = require("./plain");
const { mergeConfigs } = require("../helpers");

module.exports = mergeConfigs(plain, {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: [ "react", "react-hooks" ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/jsx-filename-extension": [ "error", { extensions: [ ".jsx", ".tsx" ]}],
    "react/react-in-jsx-scope": "off",
  },
});
