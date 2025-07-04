// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
