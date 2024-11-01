module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],

  plugins: ['@typescript-eslint'],

  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    'comma-dangle': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'eol-last': ['error', 'always'],
    indent: ['error', 2],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'linebreak-style': ['error', 'unix'],
    semi: ['off', 'always'],
    'max-len': [
      'error',
      {
        code: 120, // Maximum line length
        tabWidth: 2, // Number of spaces per indentation level
        ignoreComments: true, // Ignore comments
        ignoreUrls: true, // Ignore URLs
        ignoreStrings: true, // Ignore string literals
        ignoreTemplateLiterals: true, // Ignore template literals
        ignoreRegExpLiterals: true // Ignore regular expressions
      }
    ],
  }
};
