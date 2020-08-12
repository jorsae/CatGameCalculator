const webpack = require('webpack')
var glob = require('glob');
const path = require('path');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'required' : glob.sync('./src/js/required/*.js'),
        'normal': glob.sync('./src/js/normal/*.js'),
        'event': glob.sync('./src/js/event/*.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].min.js'
    },
    plugins: [
        new copyPlugin({
          patterns: [
            { from: 'src/html', to: '../' },
            { from: 'src/css', to: '../css' },
            { from: 'src/images', to:'../images' }
          ],
        }),
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(require("./package.json").version)
        })
      ],
};