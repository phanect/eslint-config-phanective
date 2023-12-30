"use strict";

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

// URL is not reported by node/no-unsupported-features/node-builtins when you use phanect/js rule.
new URL("https://example.com");

// comma-dangle for functions
console.log(
  "Very very very very very very very long argument which requires line break"
);

// aliasing `this` is allowed (consistent-this is disabled)
function funcRequiresCallback(callback) {
  callback();
}
const self = this;
funcRequiresCallback(() => {
  console.log(self);
});

// require-await is disabled
async function asyncFunctionWithoutAwait() {
  console.log();
}
asyncFunctionWithoutAwait();
