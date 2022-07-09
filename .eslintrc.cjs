module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["svelte3", "@typescript-eslint"],
  ignorePatterns: ["*.cjs", "mongodb/*"],
  overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es2017: true,
    es2021: true,
    node: true,
  },
  globals: {
    svelte: true,
  },
  rules: {
    // I disabled this rule because typescript already handles it
    "no-undef": "off",
  },
};
