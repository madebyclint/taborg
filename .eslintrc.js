module.exports = {
    'extends': 'airbnb',
    'env': {
        'browser': true,
        'jest': true,
        'es6': true,
        'node': true,
    },
    'rules': {
        'import/no-default-export': 'error',
        'import/prefer-default-export': 'no',
        'no-class-assign': 'no',
        'react/jsx-filename-extension': 'no',
    },
};