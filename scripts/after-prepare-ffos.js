var fs = require('fs-extra');
var archiver = require('archiver');
var buildDir = './platforms/firefoxos/build/';

console.log('Copying manifest...');
fs.copySync('./www/manifest.webapp', './platforms/firefoxos/www/manifest.webapp');

console.log('Preparing zip...');
fs.ensureDir(buildDir);
var stream = fs.createWriteStream(buildDir + 'package.zip');
var archive = archiver('zip');

stream.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('All done archiving!');
    process.exit();
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(stream);
archive.bulk([{
    expand: true,
    cwd: './platforms/firefoxos/www',
    src: ['**/*'],
    dest: ''
}]);

archive.finalize();
