import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended, // используем рекомендуемые настройки напрямую
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node, // <-- Добавляем глобальные переменные Node.js
      },
    },
    rules: {
      "semi": "off",
      "arrow-parens": "off",
      "no-unused-vars": "warn", // необязательно: сделает неиспользуемые переменные предупреждением, а не ошибкой
    },
  },
];
