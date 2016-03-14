var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./_config.base');

var definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"production"',
  ENV: process.env.ENV || JSON.stringify('production')
});

baseConfig.entry = [path.join(__dirname, '..', 'app') + '/popup.jsx'];

baseConfig.output = {
  path: path.join(__dirname, '..', 'build'),
  filename: 'popup.js',
};

baseConfig.plugins = [
  definePlugin
];

module.exports = baseConfig;
