// Copy
var fs = require('fs-extra');

module.exports = function copyAssets() {
    fs.removeSync('./www');
    fs.mkdirSync('www');
    fs.copySync('./node_modules/webmaker/build', './www');
    fs.copySync('./assets/res', './www/res');
};
