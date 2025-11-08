//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: false,
  trailingComma: "none",
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  asNeeded: true,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  tailwindFunctions: ["cn"],
  tailwindStylesheet: "./styles.css"
};

export default config;
