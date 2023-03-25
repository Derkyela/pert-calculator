/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/eslint-config-typescript',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 'no-console': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    // TODO: rename components -> prefix with "Pert"
    'vue/multi-word-component-names': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'vite.config.ts',
        ],
      },
    ],
  },
};
