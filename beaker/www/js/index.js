var app = {
  initialize: function() {
    $.getJSON('config.json', function(json) {
      var iframe = document.getElementById('app-iframe');
      iframe.src = json.appUrl;
      iframe.setAttribute('mozapp', json.appManifestUrl);
    });

  }    
};

app.initialize();