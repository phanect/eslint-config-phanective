// Currently this file exists to determine if ESLint works correctly for *.js files

const foo = "bar",
      hoge = { // Combined declaration
a: "a", // Wrong indent
        b: "b" // No trailing comma
      };

console.log("Statement without semi-colon") // without semi-colon

// SwitchCase
switch(foo) {
case "bar":
  console.log("bar");
  break;
default:
  console.log("default");
}
