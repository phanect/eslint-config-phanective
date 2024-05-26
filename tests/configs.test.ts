import { join } from "node:path";
import { fileURLToPath } from "node:url";
import deepmerge from "deepmerge";
import { ESLint, type Linter } from "eslint";
import { describe, it, expect } from "vitest";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

type Ruleset = "plain" | "node" | "svelte" | "nuxt+js" | "nuxt+ts" | "vue+js" | "vue+ts" | "next" | "react" | "with-deps";
type Extension = "js" | "mjs" | "cjs" | "ts" | "test.js" | "test.mjs" | "test.cjs" | "test.ts" | "jsx" | "tsx" | "vue" | "svelte";

const getOptions = async (rulesetName: Ruleset, ext: Extension): Promise<ESLint.Options> => {
  const ruleset = await import(join("../src/configs/", rulesetName));

  return {
    baseConfig: deepmerge(ruleset as Linter.Config, {
      env: {
        node: ruleset === "node",
      },
      parserOptions: {
        project: ext === "ts" ? join(__dirname, "fixtures/tsconfig.tests.json") : undefined,
      },
    }),
    useEslintrc: false,
  };
};

const combinations: { ruleset: Ruleset, ext: Extension }[] = [
  { ruleset: "plain", ext: "js" },
  { ruleset: "plain", ext: "mjs" },
  { ruleset: "plain", ext: "cjs" },
  { ruleset: "plain", ext: "ts" },
  { ruleset: "plain", ext: "test.js" },
  { ruleset: "plain", ext: "test.ts" },
  { ruleset: "node", ext: "ts" },
  // TODO
  // { ruleset: "svelte", ext: "svelte" },
  // { ruleset: "nuxt+js", ext: "vue" },
  // { ruleset: "nuxt+ts", ext: "vue" },
  // { ruleset: "vue+js", ext: "vue" },
  // { ruleset: "vue+ts", ext: "vue" },
  // { ruleset: "next", ext: "tsx" },
  // { ruleset: "react", ext: "jsx" },
  // { ruleset: "with-deps", ext: "ts" },
];

describe.each(combinations)("ESLint", ({ ruleset, ext }) => {
  it("should raise an error while linting $ruleset.$ext", async () => {
    expect.hasAssertions();

    const options = await getOptions(ruleset, ext);

    const eslint = new ESLint(options);
    const lintTarget = join(__dirname, `fixtures/${ruleset}.${ext}`);
    const results = await eslint.lintFiles(lintTarget);

    expect(results[0].messages).toHaveLength(0);
    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(0);
    expect(results[0].warningCount).toBe(0);
  });
});
