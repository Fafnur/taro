const baseConfig = require('../../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    // Override or add rules here
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
];
