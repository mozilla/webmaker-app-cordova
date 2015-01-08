var app = {
  initialize: function() {
    var req = new XMLHttpRequest;
    req.onload = function(e) {
      var jsonResponse = JSON.parse(req.responseText);
      var iframe = document.getElementById('app-iframe');
      iframe.src = jsonResponse.appUrl;
      iframe.setAttribute('mozapp', jsonResponse.appManifestUrl);

      var pingpong = new Pingpong({
        remoteOrigin: jsonResponse.appUrl,
        remoteWindow: iframe.contentWindow
      });

      pingpong.ping();
      
    }

    req.open('GET', 'config.json', true);
    req.send();
  },
  connect: function () {

  }
};

// Init on window load
window.addEventListener('load', function () {
    FastClick.attach(document.body);
    app.initialize();
}, false);

document.addEventListener('deviceready', function () {
  navigator.contacts.find(['*'], function (contacts) {
    console.log(contacts);
  }, function (err) {
    console.log(err);
  });
}, false);

// "Active" styles hack for mobile webkit
document.addEventListener('touchstart', function(){}, true);
