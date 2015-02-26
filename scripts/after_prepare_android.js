var fs = require('fs');
var xml = require('xml2js');
var parseString = xml.parseString;
var builder = new xml.Builder();

module.exports = function(context) {
    var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    var indexFile = 'platforms/android/assets/www/index.html';
    var androidManifestPath = 'platforms/android/AndroidManifest.xml';
    var indexText = fs.readFileSync(indexFile, {encoding: 'utf8'});
    indexText = indexText.replace('<base href="/">', '<base href="/android_asset/www/">');
    fs.writeFileSync(indexFile, indexText);
    var androidManifest = fs.readFileSync(androidManifestPath, {encoding: 'utf8'});
    androidManifest = parseString(androidManifest, function (err, result) {
        if (err) return deferral.resolve(error);
        result.manifest.application[0].activity[0].$['android:screenOrientation'] = 'portrait';
        var xml = builder.buildObject(result);
        fs.writeFileSync(androidManifestPath, xml);
        deferral.resolve();
    });

    return deferral.promise;
};
