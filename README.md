eslint-config-phanective
==============================================

[![CircleCI](https://circleci.com/gh/phanect/eslint-config-phanective.svg?style=svg)](https://circleci.com/gh/phanect/eslint-config-phanective)

ESLint config for my own projects.

Install
-------

Set `overrides` in package.json first:

```json
  "overrides": {
    "@typescript-eslint/eslint-plugin": "latest"
  }
```

Then install eslint and this package:

```shell
npm install -D eslint eslint-config-phanective
```

Usage
------

Create an .eslintrc.js like following on the project root:

```javascript
const { join } = require("path");

module.exports = {
  extends: "phanective",
  root: true,

  env: {
    browser: true, // or: "node": true
  },
  // If your project is TypeScript-based, you need to specify the tsconfig.json location
  parserOptions: {
    project: join(__dirname, "./tsconfig.eslint.json"),
  },
  // Add `sourceType: "script"` if \*.js files should be treated as CommonJS.
  overrides: [{
    files: [ "*.js", "**/*.js" ],
    parserOptions: {
      sourceType: "script",
    },
  }],
};
```

Supported configs:

- phanective
- phanective/node
- phanective/react
- phanective/next
- phanective/vue+js (Vue 3)
- phanective/vue+ts (Vue 3)
- phanective/nuxt+js (Nuxt 3)
- phanective/nuxt+ts (Nuxt 3)
- phanective/with-deps
  - Use this rules in addition to the above rules if the project depends on package.json's `dependencies` on production i.e. npm packages and backend Node.js app without bundling.

Test with realworld projects
----------------------------

1. Generate npm package

```shell
$ cd /path/to/eslint-config-phanective
$ npm pack
```

2. Install new package on a realworld project

```shell
$ cd /path/to/target/project
$ npm install ../eslint-config-phanective/eslint-config-phanective-2022.1.1.tgz
```

3. Test

```shell
# $ cd /path/to/target/project
$ npm run lint
```
