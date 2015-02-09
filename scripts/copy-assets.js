// Copy
var fs = require('fs-extra');


fs.removeSync('./www');
fs.mkdirSync('www');
fs.copySync('./node_modules/webmaker/build', './www');
fs.copySync('./assets/res', './www/res');

// Would love to do this with a build configuration but we cant do taht till we merge these repos
fs.removeSync('./www/cordova.js');

// This sucks, but we need a base tag in the web build and not in the cordova build
// We can't do it in a script tag because ffos prevents inline scripts boo.
if (process.argv.indexOf('--android') !== -1) {
    var indexFile = './www/index.html';
    var indexText = fs.readFileSync(indexFile, {encoding: 'utf8'});
    indexText = indexText.replace('<base href="/">', '<base href="/android_asset/www/">');
    fs.writeFileSync(indexFile, indexText);
}
