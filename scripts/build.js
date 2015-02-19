#!/usr/bin/env node

var fs = require('fs-extra');
var async = require('async');
var exec = require('child_process').exec;
var colors = require('colors');

function doExec(text) {
    return function (done) {
        exec(text, function (err, stdout, stderr) {
            if (stdout) console.log(stdout.grey);
            if (stderr) console.log(stderr.red);
            done(err);
        });
    };
}

// Let's get started
console.log('starting build...'.bgMagenta);

// Copy assets to www
require('./copy-assets');

// Clean
fs.removeSync('./platforms');
fs.removeSync('./plugins');

async.series([
    doExec('cordova platform add android firefoxos'),
    doExec('cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git'),
    doExec('cordova plugin add org.apache.cordova.network-information'),
    // Allows app to launch links in the default browser:
    doExec('cordova plugin add org.apache.cordova.inappbrowser'),
    // PR in progress for org.apache.cordova.camera to add dataURIs for ffos
    doExec('cordova plugin add https://github.com/k88hudson/cordova-plugin-camera.git')
], function (err) {
    // Done!
    if (err) return console.log('finished build, but there were errors!'.bgMagenta);
    console.log('finished build with no errors.'.bgMagenta);
});


