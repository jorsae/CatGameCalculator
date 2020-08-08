const webpack = require('webpack')
const path = require('path');

module.exports = {
    entry: './src/js/test.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js'
    }
};