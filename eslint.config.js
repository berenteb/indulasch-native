const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'assets/**',
      'dist/**',
      'web-build/**',
      'babel.config.js',
      'metro.config.js',
      'eslint.config.js',
    ],
  },
  ...compat.config({
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      browser: true,
      es2021: true,
    },
    parser: '@typescript-eslint/parser',
    extends: ['plugin:react/recommended', 'prettier'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: 'tsconfig.json',
    },
    plugins: ['react', 'react-native', 'prettier', 'simple-import-sort'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  }),
];
