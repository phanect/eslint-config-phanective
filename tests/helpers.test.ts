import { toTSRules, mergeConfigs } from "../src/helpers.js";

test("toTSRules", () => {
  const result = toTSRules({
    "no-unused-vars": "error",
    "no-use-before-define": "error",
    "require-await": "error",
    semi: [ "error", "always" ],
  });

  expect(result).toEqual({
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/semi": [ "error", "always" ],
  });
});

test("mergeConfigs", () => {
  const result = mergeConfigs({
    foo: [ "a", "b" ],
    bar: {
      boo: [ "f", "g" ],
    },
  },
  {
    foo: [ "c", "d", "e" ],
    bar: {
      boo: [ "h", "i", "j" ],
    },
  });

  expect(result).toEqual({
    foo: [ "a", "b", "c", "d", "e" ],
    bar: {
      boo: [ "f", "g", "h", "i", "j" ],
    },
  });
});

test("mergeConfigs doesn't modify the original config", () => {
  const config1 = {
    foo: [ "a", "b" ],
    bar: {
      boo: [ "f", "g" ],
    },
  };
  const config2 = {
    foo: [ "c", "d", "e" ],
    bar: {
      boo: [ "h", "i", "j" ],
    },
  };

  mergeConfigs(config1, config2);

  expect(config1).toEqual({
    foo: [ "a", "b" ],
    bar: {
      boo: [ "f", "g" ],
    },
  });

  expect(config2).toEqual({
    foo: [ "c", "d", "e" ],
    bar: {
      boo: [ "h", "i", "j" ],
    },
  });
});
