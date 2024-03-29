"use strict";

const config = require("./node.json");
const { mergeConfigs } = require("./src/helpers");

module.exports = mergeConfigs(config, {
  root: true,

  env: {
    node: true,
  },
  parserOptions: {
    project: "./tests/ts/tsconfig.json",
  },
  ignorePatterns: [
    "tests/js/**",
    "tests/ts/**",
  ],
});
