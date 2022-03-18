module.exports = {
  extends: ['airbnb/base', 'prettier'],
  overrides: [
    {
      files: ['**/*.tsx'],
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
        __tsconfigRootDir: __dirname,
      },
      rules: {},
    },
  ],
}
