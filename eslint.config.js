const nx = require('@nx/eslint-plugin');
const eslintPluginSimpleImportSort = require('eslint-plugin-simple-import-sort');
const eslintPluginImport = require('eslint-plugin-import');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/public'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      import: eslintPluginImport,
    },
    rules: {
      complexity: 'error',
      'no-new-wrappers': 'error',
      'no-throw-literal': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      // '@typescript-eslint/consistent-type-imports': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
        {
          selector: 'property',
          format: null,
          filter: {
            regex: '^(host)$',
            match: false,
          },
        },
      ],
      'sort-imports': 'off',
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/first': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000'], ['^@?(?!taro)\\w'], ['^@taro?\\w'], ['^\\w'], ['^[^.]'], ['^\\.']],
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
  {
    files: ['**/*.stories.ts'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
        {
          selector: 'property',
          format: null,
          filter: {
            regex: '^(host)$',
            match: false,
          },
        },
      ],
    },
  },
  eslintConfigPrettier,
];
