"use strict";

import { expect, test, beforeEach, afterEach } from "vitest";

beforeEach(() => {
  console.log("before");
});

afterEach(() => {
  console.log("after");
});

test("example", () => {
  expect(1).toBe(1);
}, 50000);
