"use strict";

import { expect, test, beforeEach, afterEach } from "vitest";

beforeEach(() => {
  console.log("before");
});

afterEach(() => {
  console.log("after");
});

test.skip("disabled test", () => {
  expect(1).toBe(1);
});

test.only("focused test", () => {
  expect(1).toBe(1);
});

test("identical title", () => {
  expect(1).toBe(1);
});

test("identical title", () => {
  expect(1).toBe(1);
});

test("prefer toHaveLength", () => {
  expect([ 1, 2, 3 ].length).toBe(3);
});

test("TS rules are properly applied", () => {
  // Missing semicolon error should happen
  expect("some string").toBe("some string")
});
