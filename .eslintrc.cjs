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
    "rwt.json",

    "next.json",
    "node.json",
    "nuxt+js.json",
    "nuxt+ts.json",
    "plain.json",
    "react.json",
    "svelte.json",
    "vue+js.json",
    "vue+ts.json",
    "with-deps.json",
  ],
});
