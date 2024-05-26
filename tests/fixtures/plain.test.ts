import { test, expect } from "vitest";

test("prefer toHaveLength", () => {
  expect([ 1, 2, 3 ].length).toBe(3);
});
