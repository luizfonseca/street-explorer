var port = chrome.runtime.connect({ name: "YDREAMS" });

window.Application = {
  debug: true,


  initialize: function() {
    this.trackNavigation(); 
  },

  trackNavigation: function() {
    $('.controls .nav').on('click', this.mapKeyPress);
  },

  mapKeyPress: function(event) {
    var obj = $(event.target);
    window.Application.sendMessage(obj.attr('data-direction'));
    window.Application.showDebug(obj.attr('data-direction'));

  },
  sendMessage: function(message) {
  // Make a simple request:
    console.log('Send direction: ', message);
    port.postMessage({direction: message});
  },


  showDebug: function(text) {
    if (this.debug === false) { return false };

    var debug = $('.debug');
    debug.html(text).fadeIn();
    setTimeout(function(){ debug.fadeOut() }, 800);
  }
};


window.Application.initialize();

