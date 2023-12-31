export type ConfigOptions = {
  /** Test libraries to use */
  testLib: "vitest" | "jest" | "none" | undefined,
  /** Language used in *.vue files */
  vueLang?: "ts" | "js" | [{
    files: string[],
    lang: "ts" | "js",
  }],
};
