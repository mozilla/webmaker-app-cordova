var fs = require('fs-extra');

module.exports = function(context) {
    fs.removeSync('www');
    fs.mkdirSync('www');
    fs.copySync('node_modules/webmaker/build', 'www');
    fs.copySync('assets/res', 'www/res');
    // cordova.js is a bunch of Cordova shims for the desktop/developer
    fs.removeSync('www/cordova.js');
};
