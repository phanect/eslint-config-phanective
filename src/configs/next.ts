import react from "./react.js";
import { mergeConfigs } from "../helpers.js";

export default mergeConfigs(react, {
  extends: [ "next/core-web-vitals" ],
});
