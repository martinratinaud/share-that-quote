var path = require('path');
var popupConfig = require('./config.popup');

popupConfig.entry = [path.join(__dirname, '..', 'app') + '/content_script.js'];

popupConfig.output = {
  path: path.join(__dirname, '..', 'build'),
  filename: 'content_script.js',
};


module.exports = popupConfig;
