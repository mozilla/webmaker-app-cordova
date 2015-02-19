var archiver = require('archiver');
var fs = require('fs');

var platformWwwDir = 'platforms/firefoxos/www';
var packageFile = 'platforms/firefoxos/build/package.zip';

module.exports = function(context) {
    var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    var zipFileStream = fs.createWriteStream(packageFile);
    zipFileStream.on('finish', function() {
        deferral.resolve();
    });
    zipFileStream.on('error', function(err) {
        deferral.resolve(err);
    });

    var zipFile = archiver('zip');
    zipFile.directory(platformWwwDir, false);
    zipFile.pipe(zipFileStream);
    zipFile.finalize();
    zipFile.on('error', function(err) {
        deferral.resolve(err);
    });

    return deferral.promise;
};
