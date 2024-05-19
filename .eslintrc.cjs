"use strict";

const { join } = require("node:path");
const deepmerge = require("deepmerge");
const config = require("./dist/node.json");

module.exports = deepmerge(config, {
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
