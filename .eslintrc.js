module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json"
    },
    extends: [
        "@roboshoes/eslint-config",
        "plugin:prettier/recommended"
    ],
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "@typescript-eslint/member-ordering": 0,
        "prettier/prettier": "error",
        "space-in-parens": ["error", "always"],
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-explicit-any": "warn"
    }
};
