// eslint-disable-next-line no-undef
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        'prefer-const': 'error',
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': ['error', { vars: 'local' }],
        'no-plusplus': 'off',
        'no-cond-assign': ['error', 'always'],
        eqeqeq: ['warn', 'smart']
    }
};
