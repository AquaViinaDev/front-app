/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals", "plugin:prettier/recommended"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        endOfLine: "auto",
      },
    ],
  },
};
