const context = require.context('../src', true, /.+\.spec\.jsx?$/);

require('core-js/es5');

context.keys().forEach(context);
module.exports = context;
