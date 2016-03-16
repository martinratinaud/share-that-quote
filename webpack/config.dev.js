const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./_config.base');
const APP_DIR = path.join(__dirname, '..', 'app');

// Do not parse react
const nodeModulesDir = path.join(__dirname, '..', 'node_modules');
const deps = [
  // 'react/dist/react.min.js',
  'react-dom/dist/react-dom.min.js'
  // 'react-router/dist/react-router.min.js',
  // 'moment/min/moment.min.js',
  // 'underscore/underscore-min.js',
];

const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"development"',
  ENV: process.env.ENV || JSON.stringify('development')
});

baseConfig.entry = [
  `${APP_DIR}/popup.jsx`,
  'webpack-dev-server/client?http://0.0.0.0:8080',
  'webpack/hot/only-dev-server'
];

baseConfig.output = {
  path: path.join(__dirname, '..', 'build'),
  filename: 'popup.js',
};

baseConfig.plugins = [
  definePlugin,
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

// https://christianalfoni.github.io/react-webpack-cookbook/Optimizing-development
// Run through deps and extract the first part of the path,
// as that is what you use to require the actual node modules
// in your code. Then use the complete path to point to the correct
// file and make sure webpack does not try to parse it
deps.forEach((dep) => {
  const depPath = path.resolve(nodeModulesDir, dep);

  baseConfig.resolve.alias[dep.split(path.sep)[0]] = depPath;
  baseConfig.module.noParse.push(depPath);
});

module.exports = baseConfig;
