var path = require('path');
var popupConfig = require('./config.popup');

popupConfig.entry = [path.join(__dirname, '..', 'app') + '/event.js'];

popupConfig.output = {
  path: path.join(__dirname, '..', 'build'),
  filename: 'event.js',
};


module.exports = popupConfig;
