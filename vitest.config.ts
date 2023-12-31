import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    exclude: [
      "./tests/fixtures/**/*",

      "./tests/configs.test.ts", // TODO Fix this file after ESLint 9 is released and flat config is GA.
      "./tests/testutils.ts", // TODO replace this file with @phanect/utils

      // Default exclusion list
      // See https://vitest.dev/config/#exclude
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],
  },
});
