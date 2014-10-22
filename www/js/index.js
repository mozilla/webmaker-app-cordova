var app = {
  initialize: function() {
    var req = new XMLHttpRequest;

    req.onload = function(e) {
      var jsonResponse = JSON.parse(req.responseText);
      var iframe = document.getElementById('app-iframe');
      iframe.src = jsonResponse.appUrl;
      iframe.setAttribute('mozapp', jsonResponse.appManifestUrl);
    }

    req.open('GET', 'config.json', true);
    req.send();
  }    
};

window.addEventListener('load', function () {
    FastClick.attach(document.body);
    app.initialize();
}, false);
