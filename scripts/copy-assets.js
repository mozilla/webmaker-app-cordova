// Copy
var fs = require('fs-extra');

fs.removeSync('./www');
fs.mkdirSync('www');
fs.copySync('./node_modules/webmaker/build', './www');
fs.copySync('./assets/res', './www/res');

