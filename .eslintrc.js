module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    'class-methods-use-this': 0,
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'no-useless-constructor': 0,
    'no-prototype-builtins': 0,
    'guard-for-in': 0,
  },
};
