## beaker

Beaker is a privileged loader architecture for Firefox OS that allows for the fetching and execution of hosted application "bundles". Beaker's automatic update system leverages [appcache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) and [semver](http://semver.org/) to allow for bundles that work well offline and only update once beaker has fully downloaded the contents of an `appcache` manifest.

The beaker architecture consists of three major components: an update server, your application bundles, and the beaker wrapper itself.

### Server
Beaker relies on a server to provide information about available bundles. For example, when beaker checks for updates it sends a request to the update server that you specify and will then load the latest bundle (within the `~` semver range) for your wrapper:

```bash
curl -H "User-Agent=Mozilla/5.0 (Mobile; rv:26.0) Gecko/26.0 Firefox/26.0" https://my.domain.org/updater
```

```json
{
    "1.0.0": "https://some.host.org/bundles/1.0.0/index.html",
    "1.0.1": "https://some.host.org/bundles/1.0.1/index.html",
    "1.0.2": "https://some.host.org/bundles/1.0.2/index.html",
    "1.1.0": "https://some.host.org/bundles/1.1.0/index.html"
}
```

### Bundles
Bundles are nothing more than simple hosted apps with an `appcache` manifest
```html
<!DOCTYPE html>
<html manifest="manifest.appcache">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">
        <title>Hello World</title>
    </head>

    <body>
        <h1>Hello from a bundle!</html>
    </body>
</html>
```

```text
CACHE MANIFEST

index.html

NETWORK:
*

FALLBACK:
/ fallback.html

```

### Beaker
Once you have an update server and your first bundle created, you can generate a beaker:
```bash
[sudo] npm install -g beaker
beaker create --name myApp --host https://my.domain.org/updater
```

This will generate a directory called `myApp` and pull down the latest bundle via the update server. To update a beaker to the latest bundle in the future, simply `cd` into the beaker and run:
```bash
beaker update
```

You can test your `beaker` using the Firefox [App Manager](https://developer.mozilla.org/en-US/Firefox_OS/Using_the_App_Manager).

---

### Bundle -> Beaker Communication
One of the advantages of wrapping hosted bundles in a privileged application is that you can have some of the flexibility of a hosted app while still accessing device features. To do this, you can simply require beaker in your application bundle and it will handle communication for you:

```js
var beaker = require('beaker');

var contacts = beaker.navigator.mozContacts.getAll({});
console.dir(contacts);
```

***Note: In order to access privileged features, they will need to be enabled in the `webapp` manifest of your wrapper application. 