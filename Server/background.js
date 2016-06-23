chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': 1280,
      'height': 800
    }
  });


  chrome.app.window.create('streetview.html', {
    'outerBounds': {
      'width': 600,
      'height': 600
    }
  });
});


var port = chrome.runtime.connect({ name: 'YDREAMS' });

chrome.runtime.onConnect.addListener(function(_port) {
    // ...optional validation of port.name...

    port = _port;
    port.onMessage.addListener(function(msg){
      port.postMessage(msg); 
    });
    port.onDisconnect.addListener(function() {
        port = null;
    });
});


