var path = require('path');
var webpack = require('webpack');

var config = {
  // entry has to be defined
  resolve: {
    alias: {}
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
        loader: 'babel-loader', // The module to load. "babel" is short for "babel-loader"
        query: {
          presets: [ "es2015", "react" ]
        },
        env: {
          start: {
            plugins: [
              [
                'react-transform', {
                  transforms: [{
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }]
                }
              ]
            ]
          }
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'file-loader' }
    ],
    noParse: []
  },
  modulesDirectories: [
    'node_modules'
  ]
};

module.exports = config;
