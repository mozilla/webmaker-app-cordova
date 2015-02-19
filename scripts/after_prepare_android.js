var fs = require('fs');

module.exports = function(context) {
    var indexFile = 'platforms/android/assets/www/index.html';
    var indexText = fs.readFileSync(indexFile, {encoding: 'utf8'});
    indexText = indexText.replace('<base href="/">', '<base href="/android_asset/www/">');
    fs.writeFileSync(indexFile, indexText);
};
