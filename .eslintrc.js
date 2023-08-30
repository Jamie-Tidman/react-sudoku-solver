module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'airbnb', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'jest/no-conditional-expect': 'off',
    camelcase: 'error',
    'comma-dangle': 'off',
    indent: ['warn', 2],
    'import/extensions': [
      // Airbnb's config includes this rule but it causes problems for TypeScript
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'linebreak-style': 'off',
    'max-len': ['error', {
      code: 160,
      ignoreTrailingComments: true,
      ignoreUrls: true
    }],
    'no-async-promise-executor': 'off',
    'no-promise-executor-return': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    'no-empty': 'warn', // Empty blocks of code should not be allowed, especially empty 'catch' blocks
    'no-duplicate-imports': 'warn',
    'no-console': 'warn', // Console.log statements should be fixed before committing
    'no-trailing-spaces': 'warn',
    'padded-blocks': 'warn',
    'eol-last': 'off',
    'no-unused-vars': 'off', // All vars must be used
    'no-multiple-empty-lines': 'warn',
    quotes: ['warn', 'single'],
    'react/jsx-filename-extension': [
      // Only allow JSX within certain file types
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ],
    'react/jsx-one-expression-per-line': 'off',
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'react-hooks/rules-of-hooks': 'error', // See https://reactjs.org/docs/hooks-rules.html
    'react-hooks/exhaustive-deps': 'warn', // See https://stackoverflow.com/questions/58866796/understanding-the-react-hooks-exhaustive-deps-lint-rule
    semi: ['warn', 'always'],
    '@typescript-eslint/explicit-function-return-type': 'off', // Consider using explicit annotations for object literals and function return types even when they can be inferred.
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error']
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        'no-undef': 'off'
      }
    }
  ]
};
