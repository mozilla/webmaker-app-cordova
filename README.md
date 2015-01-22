### Webmaker App Cordova

[![Build Status](https://travis-ci.org/mozilla/webmaker-app-cordova.svg)](https://travis-ci.org/mozilla/webmaker-app-cordova)

This is a cordova wrapper for webmaker-app.

---

## Get started

Make sure you have `adb` installed and cordova installed (`npm install cordova -g`) and an emulator or an android phone hooked up on USB.

```
npm install
npm start
```

### To link to a local copy of webmaker-app:

In the webmaker-app/ directory
```
npm link
```
In the webmaker-app-cordova/ directory:
```
npm link webmaker
```

### To re-build and run when you change files in webmaker-app
```
npm run android
```
