import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "node:url";

import plain from "../src/configs/plain.ts";
import node from "../src/configs/node.ts";
import react from "../src/configs/react.ts";
import next from "../src/configs/next.ts";
import vueJS from "../src/configs/vue+js.ts";
import vueTS from "../src/configs/vue+ts.ts";
import nuxtJS from "../src/configs/nuxt+js.ts";
import nuxtTS from "../src/configs/nuxt+ts.ts";
import _jest from "../src/configs/jest.ts"; // do not name this variable "jest" to avoid name conflict on test

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const distDir = join(__dirname, "../dist");

await mkdir(distDir, { recursive: true });
await Promise.all([
  writeFile(join(distDir, "plain.json"), JSON.stringify(plain, null, 2)),
  writeFile(join(distDir, "node.json"), JSON.stringify(node, null, 2)),
  writeFile(join(distDir, "react.json"), JSON.stringify(react, null, 2)),
  writeFile(join(distDir, "next.json"), JSON.stringify(next, null, 2)),
  writeFile(join(distDir, "vue+js.json"), JSON.stringify(vueJS, null, 2)),
  writeFile(join(distDir, "vue+ts.json"), JSON.stringify(vueTS, null, 2)),
  writeFile(join(distDir, "nuxt+js.json"), JSON.stringify(nuxtJS, null, 2)),
  writeFile(join(distDir, "nuxt+ts.json"), JSON.stringify(nuxtTS, null, 2)),
  writeFile(join(distDir, "jest.json"), JSON.stringify(_jest, null, 2)),
]);

console.log("JSONs are successfully generated");
