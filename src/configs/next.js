import react from "./react";
import { mergeConfigs } from "../helpers";

export default mergeConfigs(react, {
  extends: [ "next/core-web-vitals" ],
});
