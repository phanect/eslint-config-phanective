import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "node:url";

import plain from "../src/configs/plain";
import node from "../src/configs/node";
import react from "../src/configs/react";
import next from "../src/configs/next";
import vueJS from "../src/configs/vue+js";
import vueTS from "../src/configs/vue+ts";
import nuxtJS from "../src/configs/nuxt+js";
import nuxtTS from "../src/configs/nuxt+ts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

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
