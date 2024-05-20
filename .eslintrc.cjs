"use strict";

const { join } = require("node:path");
const deepmerge = require("deepmerge");
const config = require("./node.json");

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
  ],
});
