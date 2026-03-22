export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: (await import("@typescript-eslint/parser")).default,
    },
    plugins: {
      "@typescript-eslint": (await import("@typescript-eslint/eslint-plugin")).default,
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-restricted-properties": [
        "error",
        {
          object: "req",
          property: "body",
          message: "Use req.validated instead of req.body",
        },
        {
          object: "req",
          property: "query",
          message: "Use req.validated instead of req.query",
        },
      ],
    },
  },
];