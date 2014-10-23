### beaker

Beaker is a privileged loader architecture for mobile devices that allows for the fetching and execution of hosted apps. Beaker uses [appcache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) to allow for offline app execution, and provides support for native device functions via a [Cordova](http://cordova.apache.org/) API wrapper.

The beaker architecture consists of two major components: the hosted applications, and the cordova wrapper itself.

---

### To Run

#### Firefox OS
The source for the Firefox OS distribution is found within `/platforms/firefoxos`. To run, install the contents of the `www` directory using [WebIDE](https://developer.mozilla.org/en-US/docs/Tools/WebIDE) in the latest Firefox or Firefox Nightly. The Webmaker app is tested against Firefox OS versions 1.3 and later.

#### Android
The source for the Android distribution is found within `/platforms/android`. The Webmaker app is tested against Android 4.4 and later. To run:
- [Install the Android SDK](https://developer.android.com/sdk) for your platform
- If you've never developed for Android before, try going through the "[Building Your First App](https://developer.android.com/training/basics/firstapp/index.html)" guide to ensure your environment is setup properly
- Add the `/platforms/android` directory to your Eclipse workspace
- "Run" the project against either a device or an [AVD](https://developer.android.com/tools/devices/)

#### iOS
The source for the iOS distribution is found within `/platforms/ios`. The Webmaker app is tested against iOS 7 and later. To run:
- Install XCode (Latest)
- Open the `Webmaker.xcodeproj` 
- "Run" the project against a device if you have an Apple Developer account or against the simulator

---

### Hosted App -> Beaker Communication
One of the advantages of wrapping hosted apps in a privileged application is that you can have some of the flexibility of a hosted app while still accessing device features. To do this, you can simply require beaker in your application  and it will handle communication for you:

```js
var beaker = require('beaker');

var contacts = beaker.navigator.contacts.getAll({});
console.dir(contacts);
```

***Note: In order to access privileged features, they will need to be enabled in the `webapp` manifest of your wrapper application. 

### Development
For normal development you will want to have the Cordova CLI installed:
```bash
[sudo] npm install -g cordova
```

Changes made to config.xml can be reflected in each platform by running:
```bash
cordova prepare
```
