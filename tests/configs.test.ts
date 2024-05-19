import { test, expect } from "vitest";
import { ESLint, type Linter } from "eslint";
import { join } from "path";
import { fileURLToPath } from "node:url";
import deepmerge from "deepmerge";

import plainConfig from "../dist/plain.json";
import nodeConfig from "../dist/node.json";
import jestConfig from "../dist/jest.json";
import { sortObjects } from "@phanect/utils";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const jsOpts: ESLint.Options = {
  baseConfig: deepmerge(plainConfig as unknown as Linter.Config, {
    env: {
      node: true,
    },
  }),
  useEslintrc: false,
};
const tsOpts: ESLint.Options = {
  baseConfig: deepmerge(plainConfig as unknown as Linter.Config, {
    env: {
      node: true,
    },
    parserOptions: {
      project: join(__dirname, "fixtures/tsconfig.tests.json"),
    },
  }),
  useEslintrc: false,
};

test("js - valid", async () => {
  const eslint = new ESLint(jsOpts);
  const results = await eslint.lintFiles(join(__dirname, "fixtures/valid/valid-js.js"));

  expect(results[0].messages).toHaveLength(0);
  expect(results).toHaveLength(1);
  expect(results[0].errorCount).toBe(0);
  expect(results[0].warningCount).toBe(0);
});

test("js - invalid", async () => {
  const eslint = new ESLint(jsOpts);
  const results = await eslint.lintFiles(join(__dirname, "fixtures/invalid/invalid-js.js"));

  expect(sortObjects(results[0].messages)).toEqual(sortObjects([
    {
      column: 1,
      endColumn: 2,
      endLine: 18,
      line: 3,
      message: "Use the global form of 'use strict'.",
      messageId: "global",
      nodeType: "Program",
      ruleId: "strict",
      severity: 2,
    },
    {
      column: 1,
      endColumn: 9,
      endLine: 7,
      fix: {
        range: [ 102, 110 ],
        text: `;
      const `,
      },
      line: 3,
      message: "Split 'const' declarations into multiple statements.",
      messageId: "split",
      nodeType: "VariableDeclaration",
      ruleId: "one-var",
      severity: 1,
    },
    {
      column: 1,
      endColumn: 7,
      fix: {
        range: [ 104, 110 ],
        text: "  ",
      },
      line: 4,
      endLine: 4,
      message: "Expected indentation of 2 spaces but found 6.",
      messageId: "wrongIndentation",
      nodeType: "Identifier",
      ruleId: "editorconfig/indent",
      severity: 2,
    },
    {
      column: 7,
      endColumn: 11,
      endLine: 4,
      line: 4,
      message: "'hoge' is assigned a value but never used.",
      messageId: "unusedVar",
      nodeType: "Identifier",
      ruleId: "no-unused-vars",
      severity: 2,
    },
    {
      column: 1,
      endColumn: 1,
      fix: {
        range: [ 143, 143 ],
        text: "    ",
      },
      line: 5,
      endLine: 5,
      message: "Expected indentation of 4 spaces but found 0.",
      messageId: "wrongIndentation",
      nodeType: "Identifier",
      ruleId: "editorconfig/indent",
      severity: 2,
    },
    {
      column: 1,
      endColumn: 9,
      fix: {
        range: [ 167, 175 ],
        text: "    ",
      },
      line: 6,
      endLine: 6,
      message: "Expected indentation of 4 spaces but found 8.",
      messageId: "wrongIndentation",
      nodeType: "Identifier",
      ruleId: "editorconfig/indent",
      severity: 2,
    },
    {
      column: 15,
      endColumn: 16,
      endLine: 6,
      fix: {
        range: [ 178, 210 ],
        text: "\"b\", // No trailing comma\n      }",
      },
      line: 6,
      message: "Missing trailing comma.",
      messageId: "missing",
      nodeType: "Property",
      ruleId: "comma-dangle",
      severity: 2,
    },
    {
      column: 1,
      endColumn: 7,
      fix: {
        range: [ 203, 209 ],
        text: "  ",
      },
      line: 7,
      endLine: 7,
      message: "Expected indentation of 2 spaces but found 6.",
      messageId: "wrongIndentation",
      nodeType: "Punctuator",
      ruleId: "editorconfig/indent",
      severity: 2,
    },
    {
      column: 44,
      endColumn: 45,
      endLine: 9,
      fix: {
        range: [ 256, 256 ],
        text: ";",
      },
      line: 9,
      message: "Missing semicolon.",
      messageId: "missingSemi",
      nodeType: "ExpressionStatement",
      ruleId: "semi",
      severity: 2,
    },
    {
      column: 1,
      endColumn: 1,
      fix: {
        range: [ 308, 308 ],
        text: "  ",
      },
      line: 13,
      endLine: 13,
      message: "Expected indentation of 2 spaces but found 0.",
      messageId: "wrongIndentation",
      nodeType: "Keyword",
      ruleId: "editorconfig/indent",
      severity: 2,
    },
    {
      column: 1,
      endColumn: 3,
      fix: {
        range: [ 320, 322 ],
        text: "    ",
      },
      line: 14,
      endLine: 14,
      message: "Expected indentation of 4 spaces but found 2.",
      messageId: "wrongIndentation",
      nodeType: "Identifier",
      ruleId: "editorconfig/indent",
      severity: 2,
    },
    {
      column: 1,
      endColumn: 3,
      fix: {
        range: [ 342, 344 ],
        text: "    ",
      },
      line: 15,
      endLine: 15,
      message: "Expected indentation of 4 spaces but found 2.",
      messageId: "wrongIndentation",
      nodeType: "Keyword",
      ruleId: "editorconfig/indent",
      severity: 2,
    },
    {
      column: 1,
      endColumn: 1,
      fix: {
        range: [ 351, 351 ],
        text: "  ",
      },
      line: 16,
      endLine: 16,
      message: "Expected indentation of 2 spaces but found 0.",
      messageId: "wrongIndentation",
      nodeType: "Keyword",
      ruleId: "editorconfig/indent",
      severity: 2,
    },
    {
      column: 1,
      endColumn: 3,
      fix: {
        range: [ 360, 362 ],
        text: "    ",
      },
      line: 17,
      endLine: 17,
      message: "Expected indentation of 4 spaces but found 2.",
      messageId: "wrongIndentation",
      nodeType: "Identifier",
      ruleId: "editorconfig/indent",
      severity: 2,
    },
  ]));

  expect(results).toHaveLength(1);
  expect(results[0].errorCount).toBe(13);
  expect(results[0].warningCount).toBe(1);
});

test("js - invalid - no-undef", async () => {
  const eslint = new ESLint(jsOpts);
  const results = await eslint.lintFiles(join(__dirname, "fixtures/invalid/invalid-js.no-undef.js"));

  expect(results[0].messages).toEqual([
    {
      column: 1,
      endColumn: 5,
      endLine: 3,
      line: 3,
      message: "'test' is not defined.",
      messageId: "undef",
      nodeType: "Identifier",
      ruleId: "no-undef",
      severity: 2,
    },
    {
      column: 13,
      endColumn: 18,
      endLine: 4,
      line: 4,
      message: "'test2' is not defined.",
      messageId: "undef",
      nodeType: "Identifier",
      ruleId: "no-undef",
      severity: 2,
    },
  ]);

  expect(results).toHaveLength(1);
  expect(results[0].errorCount).toBe(2);
  expect(results[0].warningCount).toBe(0);
});

test("ts - valid", async () => {
  const eslint = new ESLint(tsOpts);
  const results = await eslint.lintFiles(join(__dirname, "fixtures/valid/valid-ts.ts"));

  expect(results[0].messages).toHaveLength(0);
  expect(results).toHaveLength(1);
  expect(results[0].errorCount).toBe(0);
  expect(results[0].warningCount).toBe(0);
});

test("ts - invalid", async () => {
  const eslint = new ESLint(tsOpts);
  const results = await eslint.lintFiles(join(__dirname, "fixtures/invalid/invalid-ts.ts"));

  expect(results[0].messages).toEqual([
    {
      column: 7,
      endColumn: 11,
      endLine: 4,
      line: 4,
      message: "'hoge' is assigned a value but never used.",
      messageId: "unusedVar",
      nodeType: null,
      ruleId: "@typescript-eslint/no-unused-vars",
      severity: 2,
    },
    {
      message: "Expected indentation of 2 spaces but found 0.",
      messageId: "wrongIndentation",
      nodeType: "Keyword",
      ruleId: "editorconfig/indent",
      severity: 2,
      line: 8,
      endLine: 8,
      column: 1,
      endColumn: 1,
      fix: {
        range: [ 173, 173 ],
        text: "  ",
      },
    },
    {
      message: "Expected indentation of 4 spaces but found 2.",
      messageId: "wrongIndentation",
      nodeType: "Identifier",
      ruleId: "editorconfig/indent",
      severity: 2,
      line: 9,
      endLine: 9,
      column: 1,
      endColumn: 3,
      fix:  {
        range: [ 185, 187 ],
        text: "    ",
      },
    },
    {
      message: "Expected indentation of 4 spaces but found 2.",
      messageId: "wrongIndentation",
      nodeType: "Keyword",
      ruleId: "editorconfig/indent",
      severity: 2,
      line: 10,
      endLine: 10,
      column: 1,
      endColumn: 3,
      fix:  {
        range: [ 207, 209 ],
        text: "    ",
      },
    },
    {
      message: "Expected indentation of 2 spaces but found 0.",
      messageId: "wrongIndentation",
      nodeType: "Keyword",
      ruleId: "editorconfig/indent",
      severity: 2,
      line: 11,
      endLine: 11,
      column: 1,
      endColumn: 1,
      fix:  {
        range: [ 216, 216 ],
        text: "  ",
      },
    },
    {
      message: "Expected indentation of 4 spaces but found 2.",
      messageId: "wrongIndentation",
      nodeType: "Identifier",
      ruleId: "editorconfig/indent",
      severity: 2,
      line: 12,
      endLine: 12,
      column: 1,
      endColumn: 3,
      fix:  {
        range: [ 225, 227 ],
        text: "    ",
      },
    },
  ]);

  expect(results).toHaveLength(1);
  expect(results[0].errorCount).toBe(6);
  expect(results[0].warningCount).toBe(0);
});

for (const lang of [ "js", "ts" ]) {
  const config = deepmerge(plainConfig, jestConfig);
  const jestOpts: ESLint.Options = {
    baseConfig: deepmerge(config as unknown as Linter.Config, lang === "ts" ? {
      parserOptions: {
        project: join(__dirname, "fixtures/tsconfig.tests.json"),
      },
    } : {}),
    useEslintrc: false,
  };

  test.skip(`jest - ${lang} - valid`, async () => {
    const eslint = new ESLint(jestOpts);
    const results = await eslint.lintFiles(join(__dirname, `fixtures/valid/jest-valid-${lang}.test.${lang}`));

    expect(results[0].messages).toEqual([]);
    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(0);
    expect(results[0].warningCount).toBe(0);
  });

  test.skip(`jest - ${lang} - invalid`, async () => {
    const eslint = new ESLint(jestOpts);
    const results = await eslint.lintFiles(join(__dirname, `fixtures/invalid/jest-invalid-${lang}.test.${lang}`));

    expect(results[0].messages).toEqual([
      {
        column: 1,
        endColumn: 3,
        endLine: 13,
        line: 11,
        message: "Disabled test",
        messageId: "disabledTest",
        nodeType: "CallExpression",
        ruleId: "jest/no-disabled-tests",
        severity: 2,
      },
      {
        column: 6,
        endColumn: 10,
        endLine: 15,
        line: 15,
        message: "Unexpected focused test",
        messageId: "focusedTest",
        nodeType: "Identifier",
        ruleId: "jest/no-focused-tests",
        severity: 2,
        suggestions: [{
          desc: "Remove focus from test",
          fix:  {
            range: [
              176,
              181,
            ],
            text: "",
          },
          messageId: "suggestRemoveFocus",
        }],
      },
      {
        column: 6,
        endColumn: 23,
        endLine: 23,
        line: 23,
        message: "Test title is used multiple times in the same describe block",
        messageId: "multipleTestTitle",
        nodeType: "Literal",
        ruleId: "jest/no-identical-title",
        severity: 2,
      },
      {
        column: 30,
        endColumn: 34,
        endLine: 28,
        fix: {
          range: [
            404,
            417,
          ],
          text: ").toHaveLength",
        },
        line: 28,
        message: "Use toHaveLength() instead",
        messageId: "useToHaveLength",
        nodeType: "Identifier",
        ruleId: "jest/prefer-to-have-length",
        severity: 1,
      },
      {
        column: 44,
        endColumn: 1,
        endLine: 34,
        fix: {
          range: [
            559,
            559,
          ],
          text: ";",
        },
        line: 33,
        message: "Missing semicolon.",
        messageId: "missingSemi",
        nodeType: "ExpressionStatement",
        ruleId: `${lang === "ts" ? "@typescript-eslint/" : ""}semi`,
        severity: 2,
      },
    ]);

    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(4);
    expect(results[0].warningCount).toBe(1);
  });
}

test("CommonJS needs 'use strict'", async () => {
  const eslint = new ESLint({
    baseConfig: nodeConfig as unknown as Linter.Config,
    useEslintrc: false,
  });
  const results = await eslint.lintFiles(join(__dirname, "fixtures/valid/valid-js.use-strict.cjs"));

  expect(results[0].messages).toEqual([]);
  expect(results).toHaveLength(1);
  expect(results[0].errorCount).toBe(0);
  expect(results[0].warningCount).toBe(0);
});

test("JSM forbids 'use strict'", async () => {
  const eslint = new ESLint({
    baseConfig: nodeConfig as unknown as Linter.Config,
    useEslintrc: false,
  });
  const results = await eslint.lintFiles(join(__dirname, "fixtures/valid/valid-js.use-strict.mjs"));

  expect(results[0].messages).toEqual([]);
  expect(results).toHaveLength(1);
  expect(results[0].errorCount).toBe(0);
  expect(results[0].warningCount).toBe(0);
});

test("Error when no 'use strict' in CommonJS", async () => {
  const eslint = new ESLint({
    baseConfig: nodeConfig as unknown as Linter.Config,
    useEslintrc: false,
  });
  const results = await eslint.lintFiles(join(__dirname, "fixtures/invalid/invalid-js.use-strict.cjs"));

  expect(results[0].messages).toEqual([
    {
      message: "Use the global form of 'use strict'.",
      messageId: "global",
      nodeType: "Program",
      ruleId: "strict",
      severity: 2,
      line: 1,
      endLine: 1,
      column: 1,
      endColumn: 44,
    },
  ]);
  expect(results).toHaveLength(1);
  expect(results[0].errorCount).toBe(1);
  expect(results[0].warningCount).toBe(0);
});

test("Error when 'use strict' in JSM", async () => {
  const eslint = new ESLint({
    baseConfig: nodeConfig as unknown as Linter.Config,
    useEslintrc: false,
  });
  const results = await eslint.lintFiles(join(__dirname, "fixtures/invalid/invalid-js.use-strict.mjs"));

  expect(results[0].messages).toEqual([
    {
      message: "'use strict' is unnecessary inside of modules.",
      messageId: "module",
      nodeType: "ExpressionStatement",
      ruleId: "strict",
      severity: 2,
      line: 1,
      endLine: 1,
      column: 1,
      endColumn: 14,
      fix: {
        range: [
          0,
          13,
        ],
        text: "",
      },
    },
  ]);
  expect(results).toHaveLength(1);
  expect(results[0].errorCount).toBe(1);
  expect(results[0].warningCount).toBe(0);
});
