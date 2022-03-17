module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {},
  overrides: [
    {
      files: ['**/*.ts'],
      extends: ['airbnb/base', 'airbnb-typescript/base', 'prettier'],
      parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',

        'no-use-before-define': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'consistent-return': 'off',
      },
    },
  ],
}
