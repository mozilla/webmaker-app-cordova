## beaker

Beaker is a privileged loader architecture for mobile devices that allows for the fetching and execution of hosted apps. Beaker uses [appcache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) to allow for offline app execution, and provides support for native device functions via a [Cordova](http://cordova.apache.org/) API wrapper.

The beaker architecture consists of two major components: the hosted applications, and the cordova wrapper itself.

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
