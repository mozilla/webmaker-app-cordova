# Webmaker App Cordova

[![Build Status](https://travis-ci.org/mozilla/webmaker-app-cordova.svg)](https://travis-ci.org/mozilla/webmaker-app-cordova)

This is a cordova wrapper for webmaker-app.

## Getting started

Make sure you have `adb` installed and cordova installed (`npm install cordova -g`) and an emulator or an android phone hooked up on USB.

```
npm install
npm start
```

To run the Android version of webmaker-app:

* `npm run android`

To run the Firefox OS version of webmaker-app:

* `npm run firefoxos`
* Using Firefox 34 or higher [open the WebIDE](https://developer.mozilla.org/en-US/docs/Tools/WebIDE#Opening_WebIDE)
* In the WebIDE [open a packaged app](https://developer.mozilla.org/en-US/docs/Tools/WebIDE#Open_a_packaged_app), using the `platforms/firefoxos/www/` directory
* You can now [configure a runtime](https://developer.mozilla.org/en-US/docs/Tools/WebIDE#Setting_up_runtimes) and run it on a simulator or device

### To link to a local copy of webmaker-app:

In the webmaker-app/ directory
```
npm link
```
In the webmaker-app-cordova/ directory:
```
npm link webmaker
```
