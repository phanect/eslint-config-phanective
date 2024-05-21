/** Clone my own repositories and try linting with new ESLint configs */

import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { cmd } from "@phanect/utils/nodejs";
import { name as pkgName, version as pkgVersion } from "../package.json";
import repos from "../rwt.json";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

type ConfigType = "plain" | "node" | "react" | "next" | "vue+js" | "vue+ts" | "nuxt+js" | "nuxt+ts" | "svelte" | "with-deps";
type Repo = {
  repo: string;
  branch: string;
  type: ConfigType | ConfigType[];
};

function getRulesetName(type: ConfigType): string;
function getRulesetName(type: ConfigType[]): string[];
function getRulesetName(type: ConfigType|ConfigType[]): string | string[] {
  return Array.isArray(type) ? (type as string[]).map((name) => `phanective/${name}`) : (`phanective/${type}` as string);
}

const projectRoot = join(__dirname, "..");
const reposDir = join(projectRoot, "tmp/repos");

await rm(reposDir, { recursive: true, force: true });
await mkdir(reposDir, { recursive: true });

const cloneCommands = (repos as Repo[]).map(({ repo, branch }) => [
  "git clone",
  (branch ? `--branch="${branch}"` : ""),
  "--depth=1",
  `"git@github.com:phanect/${repo}.git"`,
  `"${join(reposDir, repo)}"`,
].join(" "));

await cmd([
  ...cloneCommands,
  "npm pack",
], { cwd: projectRoot });

const lintPrepCommands: string[] = [];

await Promise.all(
  (repos as Repo[]).map(({ repo, type }) => [
    rm(join(reposDir, repo, ".eslintrc.js"), { force: true }),
    rm(join(reposDir, repo, ".eslintrc.mjs"), { force: true }),
    rm(join(reposDir, repo, ".eslintrc.cjs"), { force: true }),
    rm(join(reposDir, repo, ".eslintrc"), { force: true }),
    rm(join(reposDir, repo, ".git"), { recursive: true, force: true }),
    writeFile(join(reposDir, repo, ".eslintrc.json"), JSON.stringify({
      root: true,
      extends: getRulesetName(type as ConfigType),

      env: {
        node: true,
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    }, null, 2) + "\n"),
    (async () => {
      const pkgsToInstall = [
        join(projectRoot, `${pkgName}-${pkgVersion}.tgz`),
        "eslint@8",
        "typescript",
      ];


      if (
        (Array.isArray(type) && type.includes("svelte"))
        || type === "svelte"
      ) {
        pkgsToInstall.push("svelte");
      }

      if (
        (Array.isArray(type) && type.includes("next"))
        || type === "next"
      ) {
        pkgsToInstall.push("next");
      }

      lintPrepCommands.push(
        `cd "${join(reposDir, repo)}"`
        + " && npm install"
        + ` && npm install ${pkgsToInstall.map(pkg => `"${pkg}"`).join(" ")}`
      );
    })(),
  ]).flat()
);


const lintCommands = (repos as Repo[]).map(({ repo }) =>
  `npx eslint "${join(reposDir, repo)}"`
);

// `npm install` should run sequentially because it is a bit heavy to run parallelly.

for (const lintPrepCommand of lintPrepCommands) {
  await cmd(lintPrepCommand);
}

for (const lintCommand of lintCommands) {
  await cmd(lintCommand);
}
