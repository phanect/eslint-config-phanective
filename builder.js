"use strict";

const { mkdir, writeFile } = require("fs/promises");
const { join } = require("path");

const plain = require("./configs/plain");
const node = require("./configs/node");
const react = require("./configs/react");
const vue = require("./configs/vue");
const _jest = require("./configs/jest"); // do not name this variable "jest" to avoid name conflict on test

const distDir = join(__dirname, "dist/");

(async () => {
  await mkdir(distDir, { recursive: true });
  await Promise.all([
    writeFile(join(distDir, "plain.json"), JSON.stringify(plain, null, 2)),
    writeFile(join(distDir, "node.json"), JSON.stringify(node, null, 2)),
    writeFile(join(distDir, "react.json"), JSON.stringify(react, null, 2)),
    writeFile(join(distDir, "vue.json"), JSON.stringify(vue, null, 2)),
    writeFile(join(distDir, "jest.json"), JSON.stringify(_jest, null, 2)),
  ]);

  console.log("JSONs are successfully generated");
})();
