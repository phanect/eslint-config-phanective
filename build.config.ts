import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineBuildConfig } from "unbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineBuildConfig({
  entries: [ join(__dirname, "./src/eslint.ts") ],
  declaration: true,
});
