const path = require('path');
const popupConfig = require('./config.popup');
const APP_DIR = path.join(__dirname, '..', 'app');

popupConfig.entry = [`${APP_DIR}/content_script.js`];

popupConfig.output = {
  path: path.join(__dirname, '..', 'build'),
  filename: 'content_script.js',
};


module.exports = popupConfig;
