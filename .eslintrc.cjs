"use strict";

const { join } = require("node:path");
const config = require("./node.json");
const { mergeConfigs } = require("./src/helpers");

module.exports = mergeConfigs(config, {
  root: true,

  env: {
    node: true,
  },
  parserOptions: {
    project: join(__dirname, "tsconfig.json"),
  },
  ignorePatterns: [
    "tests/fixtures/invalid/*",
    "tests/fixtures/valid/*.js", // TODO ignore until default sourceType is changed to "module"
  ],
});
