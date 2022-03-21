module.exports = {
  env: {
    node: true,
  },
  globals: {
    expect: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'clean-code',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    "prettier/prettier": 2
  }
};
