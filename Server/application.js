var port = chrome.runtime.connect({ name: "YDREAMS" });

window.Application = {
  debug: true,


  initialize: function() {
    this.trackNavigation(); 
  },

  trackNavigation: function() {
    $('.controls .nav').on('click', this.mapKeyPress);
		$('.explore-options img').on('click', this.trackNavigateOptions);
		$('.backScreen').on('click', this.backToScreen);

  },

  mapKeyPress: function(event) {
    var obj = $(event.target);
    window.Application.sendMessage({ direction: obj.attr('data-direction')});
    window.Application.showDebug(obj.attr('data-direction'));

  },
  sendMessage: function(message) {
  // Make a simple request:
    console.log('Sent Message: %o', message);
    port.postMessage(message);
  },

	trackNavigateOptions: function(event){
		console.log(event.target);
		var obj = $(event.target);
		window.Application.sendMessage({ lat: obj.attr('data-lat'), lng: obj.attr('data-lng')});	

		window.Application.goToDetailScreen();
	},
	
	backToScreen: function() {
		$('.screen[data-screen="1"]').animate({ top: '0', opacity: 1 }, 300);
		$('.screen[data-screen="2"]').animate({ top: 0 }).fadeOut('slow');
		window.Application.sendMessage({ navigation: 'back' });

	},

	goToDetailScreen: function() {
		$('.screen[data-screen="1"]').animate({ top: '-9999px', opacity: 0}, 1000);
		$('.screen[data-screen="2"]').animate({ top: 0 }).fadeIn('slow');
	},

  showDebug: function(text) {
    if (this.debug === false) { return false };

    var debug = $('.debug');
    debug.html(text).fadeIn();
    setTimeout(function(){ debug.fadeOut() }, 800);
  }
};


window.Application.initialize();

