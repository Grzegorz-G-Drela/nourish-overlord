import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["server.js"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: globals.node,
            sourceType: "commonjs",
        },
    },
    {
        files: ["public/**/*.js"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: globals.browser,
            sourceType: "script",
        },
    },
]);