import playwright from 'eslint-plugin-playwright';

export default [
  {
    files: ['tests/**/*.ts'],
    plugins: { playwright },
    rules: {
      'playwright/missing-playwright-await': [
        'error',
        { includePageLocatorMethods: true },
      ],
    },
  },
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**'],
  },
];
