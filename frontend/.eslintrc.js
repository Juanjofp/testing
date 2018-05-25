module.exports = {
  root: true,
  parser: 'babel-eslint',

  parserOptions: {
    sourceType: 'module'
  },

  plugins: [
    'jest',
    'jsx-a11y',
    'react',
  ],

  env: {
    browser: true,
    'jest/globals': true,
  },

  globals: {
    toJson:  true,
    shallow: true,
    mount:   true,
    render:  true,
  },

  extends: 'airbnb',

  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.config.dev.js',
      },
    },
  },

  rules: {
    'import/extensions': ['error', 'always', {
      js:  'never',
      jsx: 'never',
    }],

    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],

    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'key-spacing': ['error', { 'mode': 'minimum' }],
    'no-multi-spaces': ['error', { exceptions: { VariableDeclarator: true, AssignmentExpression: true } }],
    'no-irregular-whitespace': 'off',
    'no-multi-spaces': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'eqeqeq': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-bitwise': 'off',
    'no-return-assign': 'off',
    'no-unused-expressions': 'off',
    'react/jsx-filename-extension': 'off',

    'jsx-a11y/anchor-is-valid': [ 'error', {
      'components': [ 'Link' ],
      'specialLink': [ 'hrefLeft', 'hrefRight', 'to' ],
      'aspects': [ 'noHref', 'invalidHref', 'preferButton' ]
    }],

    'jsx-a11y/href-no-hash': 'off',
  }
}
