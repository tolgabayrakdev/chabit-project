import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,   // Node.js global değişkenlerini ekledik
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-undef": "error",         // Tanımsız değişkenleri hata yap
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Kullanılmayan değişkenlerde uyarı
      "no-console": "off",         // console kullanımı serbest
    },
  },
]);
