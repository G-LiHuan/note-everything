module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      modules: true,
    }
  },
  rules: {
    'no-console': 'error',
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    'curly': ['error', 'all'],
    'default-case': 'error',
    'dot-location': 'error',
    'eqeqeq': 'error',
    'no-else-return': 'error',
    'no-floating-decimal': 'error',
    'no-shadow': 'error',
    'no-undef': 'error',
    'no-use-before-define': 'error',
    'import/no-extraneous-dependencies': ['error', { "devDependencies": true, "optionalDependencies": false, "peerDependencies": false }]
  },
};
