const webpack = require('webpack')
var glob = require('glob');
const path = require('path');

module.exports = {
    entry: {
        'classes': glob.sync('./src/js/classes/*.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js'
    }
};