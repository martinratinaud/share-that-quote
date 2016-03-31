const path = require('path');
const popupConfig = require('./config.popup');
const APP_DIR = path.join(__dirname, '..', 'src/app');

popupConfig.entry = [`${APP_DIR}/event.js`];

popupConfig.output = {
  path: path.join(__dirname, '..', 'build'),
  filename: 'event.js',
};


module.exports = popupConfig;
