module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-perf',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'react/jsx-props-no-spreading': 'off',
    'no-nested-ternary': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-null': 'off',
    'import/prefer-default-export': 'off',
    'no-case-declarations': 'off',
    'no-param-reassign': 'off',
    'react/no-array-index-key': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    /* 'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: false, optionalDependencies: false, peerDependencies: false },
    ], */
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/prop-types': 'off',
    'no-mixed-operators': 'off',
    'unicorn/no-array-reduce': 'off',
    // 'react/style-prop-object': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};
