import { test, expect, afterEach, beforeEach } from "vitest";

beforeEach(() => {
  console.log("before");
});

afterEach(() => {
  console.log("after");
});

test("tetete", () => {
  expect(1).toBe(1);
}, 50000);
