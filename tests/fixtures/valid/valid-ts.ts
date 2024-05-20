// No "use strict"

const foo = "bar";
const hoge = "fuga";

console.log(foo, hoge);

// SwitchCase
switch(foo) {
  case "bar":
    console.log("bar");
    break;
  default:
    console.log("default");
}

// URL is not reported by node/no-unsupported-features/node-builtins when you use phanect/ts rule.
new URL("https://example.com");

// comma-dangle for functions
console.log(
  "Very very very very very very very long argument which requires line break"
);

// aliasing `this` is allowed (@typescript-eslint/no-this-alias is disabled)
function funcRequiresCallback(callback: () => void): void {
  callback();
}
const self = this;
funcRequiresCallback(() => {
  console.log(self);
});

// require-await is disabled
async function asyncFunctionWithoutAwait(): Promise<void> {
  console.log();
}
asyncFunctionWithoutAwait();

//
// TypeScript-specific
//

// @template tag is allowed in JSDoc
/**
 * Sample function.
 * @param arr - The argument.
 * @returns The return value.
 * @template T
 */
function tetete<T>(arr: T[]): T[] {
  return arr;
}
tetete([ "a", "b", "c" ]);
