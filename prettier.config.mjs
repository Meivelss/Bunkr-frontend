// to run that bitch on everything:
// prettier --write "**/*.js"

import prettierPluginAstro from "prettier-plugin-astro";
import prettierPluginTailwindCSS from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
export default {
  plugins: [prettierPluginAstro, prettierPluginTailwindCSS],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.vue",
      options: {
        parser: "vue",
      },
    },
  ],
};
