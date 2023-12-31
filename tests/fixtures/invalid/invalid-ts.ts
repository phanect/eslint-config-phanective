// Currently this file exists to determine if ESLint works correctly for *.ts files

const foo = "bar";
const hoge = "fuga"; // Unused variable

// SwitchCase
switch(foo) {
case "bar":
  console.log("bar");
  break;
default:
  console.log("default");
}
