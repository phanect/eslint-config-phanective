export type ConfigOptions = {
  /** Language used in *.vue files */
  vueLang?: "ts" | "js" | [{
    files: string[],
    lang: "ts" | "js",
  }],
};
