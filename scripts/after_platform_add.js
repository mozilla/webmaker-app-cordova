var async = require('async');
var spawn = require('./spawn');

var addPlugin = function(plugin, callback) {
    spawn('cordova', ['plugin', 'add', plugin], callback);
};

module.exports = function(context) {
    var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    var plugins = [
        'https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git',
        'org.apache.cordova.network-information',
        'org.apache.cordova.inappbrowser',
        // PR in progress for org.apache.cordova.camera to add dataURIs for ffos
        'https://github.com/k88hudson/cordova-plugin-camera.git'
    ];

    async.eachSeries(plugins, addPlugin, function (error) {
      deferral.resolve(error);
    });

    return deferral.promise;
};
