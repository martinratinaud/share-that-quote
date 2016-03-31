const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./_config.base');
const APP_DIR = path.join(__dirname, '..', 'src/app');

const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"production"',
  ENV: process.env.ENV || JSON.stringify('production')
});

baseConfig.entry = [`${APP_DIR}/popup.jsx`];

baseConfig.output = {
  path: path.join(__dirname, '..', 'build'),
  filename: 'popup.js',
};

baseConfig.plugins = [
  definePlugin
];

module.exports = baseConfig;
