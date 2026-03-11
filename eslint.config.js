const js = require("@eslint/js");
const babelParser = require("@babel/eslint-parser");
const reactPlugin = require("eslint-plugin-react");
const reactNativePlugin = require("eslint-plugin-react-native");

const reactNativeGlobals =
  reactNativePlugin.environments?.["react-native"]?.globals || {};

module.exports = [
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      react: reactPlugin,
      "react-native": reactNativePlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parser: babelParser,
      globals: reactNativeGlobals,
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
