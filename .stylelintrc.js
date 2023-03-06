module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order'
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-high-performance-animation',
  ],
  rules: {
    'color-hex-length': 'long',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global']
    }],
    'plugin/no-low-performance-animation-properties': true,
    'selector-type-no-unknown': [true, { ignore: ['custom-elements', 'default-namespace'] }],
    'selector-type-case': ['lower', { ignoreTypes: ['/.+/'] }],
    'value-keyword-case': ['lower', { 'ignoreKeywords': ['/.+/'] }],
  },
};
