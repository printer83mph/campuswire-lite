module.exports = {
  extends: ['airbnb/base', 'prettier'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        browser: true,
        es2021: true,
      },
      extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
}
