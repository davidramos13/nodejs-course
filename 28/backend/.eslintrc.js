module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  plugins: ['@typescript-eslint', 'import', 'prettier', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        singleQuote: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
};
