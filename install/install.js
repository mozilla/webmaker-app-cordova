(function() {
    var isDev = window.location.search.indexOf('dev') !== -1;
    var parser = new UAParser();
    var ua = parser.getResult();

    function isValidFFOS() {
       return ua.os.name === 'Firefox OS' && parseInt(ua.browser.major, 10) >= 32;
    }

    function isValidAndroid() {
        if (ua.os.name !== 'Android') return false;
        var version = ua.os.version && ua.os.version.split('.').map(function (n) {
            return parseInt(n, 10);
        });

        // FF Android doesn't include any OS version, so we will be optimistic
        if (!version) return true;

        if (version[0] < 4 ) return false;
        if (version[0] === 4 && version[1] < 4) return false;

        return true;
    }

    // Define manifest, apk URL
    var baseUrl = 'https://webmaker-dist.s3.amazonaws.com';
    var apkUrl =  baseUrl + (isDev ? '/dev' : '/staging') + '/android/CordovaApp-debug.apk';
    var manifestUrl = baseUrl + (isDev ? '/manifest-dev.webapp' : '/manifest.webapp');

    var message;

    if (['desktop', 'tablet'].indexOf(ua.device.type) !== -1) {
        message = 'Redirecting to install page...'
        window.location = 'http://mzl.la/webmaker';
    } else if (isValidFFOS()) {
        message = 'Installing...';
        var request = window.navigator.mozApps.installPackage(manifestUrl);

        request.onsuccess = function () {
            var appRecord = this.result;
            alert('Installation successful!');
        };

        request.onerror = function () {
            alert('Install failed, error: ' + this.error.name);
        };
    } else if (isValidAndroid()) {
        message = 'Downloading... Check "Downloads" to install the app once complete.';
        window.location = apkUrl;
    } else {
        document.getElementById('toucan').style.display = 'block';
        message = 'Sorry! Looks like your device is unsupported. Webmaker is only available on Android 4.4+ and FirefoxOS 2.1+';
    }
    document.getElementById('message').innerHTML = message;
})();
