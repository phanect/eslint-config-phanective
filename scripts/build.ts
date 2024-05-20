import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import next from "../src/configs/next.ts";
import node from "../src/configs/node.ts";
import nuxtJS from "../src/configs/nuxt+js.ts";
import nuxtTS from "../src/configs/nuxt+ts.ts";
import plain from "../src/configs/plain.ts";
import react from "../src/configs/react.ts";
import svelte from "../src/configs/svelte.ts";
import vueJS from "../src/configs/vue+js.ts";
import vueTS from "../src/configs/vue+ts.ts";
import withDeps from "../src/configs/with-deps.ts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = join(__dirname, "../");

await mkdir(rootDir, { recursive: true });
await Promise.all([
  writeFile(join(rootDir, "plain.json"), JSON.stringify(plain, null, 2)),
  writeFile(join(rootDir, "node.json"), JSON.stringify(node, null, 2)),
  writeFile(join(rootDir, "svelte.json"), JSON.stringify(svelte, null, 2)),
  writeFile(join(rootDir, "react.json"), JSON.stringify(react, null, 2)),
  writeFile(join(rootDir, "next.json"), JSON.stringify(next, null, 2)),
  writeFile(join(rootDir, "vue+js.json"), JSON.stringify(vueJS, null, 2)),
  writeFile(join(rootDir, "vue+ts.json"), JSON.stringify(vueTS, null, 2)),
  writeFile(join(rootDir, "nuxt+js.json"), JSON.stringify(nuxtJS, null, 2)),
  writeFile(join(rootDir, "nuxt+ts.json"), JSON.stringify(nuxtTS, null, 2)),
  writeFile(join(rootDir, "with-deps.json"), JSON.stringify(withDeps, null, 2)),
]);

console.log("JSONs are successfully generated");
