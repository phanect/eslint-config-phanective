"use strict";

const { mkdir, writeFile } = require("fs/promises");
const { join } = require("path");

const plain = require("../src/configs/plain");
const node = require("../src/configs/node");
const react = require("../src/configs/react");
const next = require("../src/configs/next");
const vueJS = require("../src/configs/vue+js");
const vueTS = require("../src/configs/vue+ts");
const nuxtJS = require("../src/configs/nuxt+js");
const nuxtTS = require("../src/configs/nuxt+ts");

const rootDir = join(__dirname, "../");

(async () => {
  await mkdir(rootDir, { recursive: true });
  await Promise.all([
    writeFile(join(rootDir, "plain.json"), JSON.stringify(plain, null, 2)),
    writeFile(join(rootDir, "node.json"), JSON.stringify(node, null, 2)),
    writeFile(join(rootDir, "react.json"), JSON.stringify(react, null, 2)),
    writeFile(join(rootDir, "next.json"), JSON.stringify(next, null, 2)),
    writeFile(join(rootDir, "vue+js.json"), JSON.stringify(vueJS, null, 2)),
    writeFile(join(rootDir, "vue+ts.json"), JSON.stringify(vueTS, null, 2)),
    writeFile(join(rootDir, "nuxt+js.json"), JSON.stringify(nuxtJS, null, 2)),
    writeFile(join(rootDir, "nuxt+ts.json"), JSON.stringify(nuxtTS, null, 2)),
  ]);

  console.log("JSONs are successfully generated");
})();
