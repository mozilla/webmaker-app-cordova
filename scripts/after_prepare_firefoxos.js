var fs = require('fs-extra');

module.exports = function(context) {
    fs.copySync('www/manifest.webapp', 'platforms/firefoxos/www/manifest.webapp');
};
