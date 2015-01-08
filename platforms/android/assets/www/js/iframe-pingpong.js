(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Pingpong = factory();
    }
}(this, function () {
    function Pingpong(options) {
        var self = this;
        var defaults = {
            dev: false,
            origin: window.location.origin,
            remoteOrigin: '',
            remoteWindow: null
        };
        Object.keys(defaults).forEach(function (key) {
            self[key] = typeof options[key] !== 'undefined' ? options[key] : defaults[key];
        });

        if (self.dev) {
            self._log('WARNING. You are using Pingpong in dev mode, which could make you vulnerable to XSS attacks.');
        }

        // State
        self.connected = false;
    }

    Pingpong.prototype._log = function (text) {
        if (!this.dev) return;
        console.log('[Pingpong ' + this.origin + ']: ' + text);
    };

    Pingpong.prototype.trustEvent = function (event) {
        return this.dev || event.origin === this.remoteOrigin;
    };

    Pingpong.prototype.ping = function (callback) {
        var self = this;
        var interval;

        function onPong(e) {
            if (!self.trustEvent(e)) return;
            self.connected = true;
            self._log('Received pong.');
            window.clearInterval(interval);
            window.removeEventListener('message', onPong);
            if (callback) callback();
        }

        window.addEventListener('message', onPong, false);
        
        interval = window.setInterval(function() {
            self._log('Sending ping...');
            self.remoteWindow.postMessage('ping', self.remoteOrigin);
        }, 1000);
    };

    Pingpong.prototype.pong = function (callback) {
        var self = this;
        function onPing(e) {
            if (!self.trustEvent(e)) return;
            self.connected = true;
            self._log('Received ping.');
            self._log('Sending pong...');
            self.remoteWindow.postMessage('pong', self.remoteOrigin);
            window.removeEventListener('message', onPing);
            if (callback) callback();
        }
        window.addEventListener('message', onPing, false);
    };

    return Pingpong;
}));
