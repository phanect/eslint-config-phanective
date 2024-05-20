import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    exclude: [
      "./tests/fixtures/**/*",

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
