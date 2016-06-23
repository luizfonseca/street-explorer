function initialize() { };

var port = chrome.runtime.connect({ name: 'YDREAMS' });


port.onMessage.addListener(function(msg) {
	console.log("Message received: %o", msg);

		if (msg["direction"]) {
			window.StreetView.mapWalk(msg.direction);
		}
		else if (msg["lat"]) {
			window.StreetView.setupPanorama(msg.lat, msg.lng)
		} 
		else if (msg['navigation']) {
			window.StreetView.toggleStreetView();	
		}

});


window.StreetView = {
	setupPanorama: function(msg_lat, msg_lng) {
		$('#StreetMap').append('<div id="street-view"></div>');
		
		var pano = new google.maps.StreetViewPanorama(
    document.getElementById('street-view'), {
      position: { lat: parseFloat(msg_lat) , lng: parseFloat(msg_lng) },
      pov: {heading: 1, pitch: 0},
      zoom: 0,
      disableDefaultUI: false,
      linksControl: true,
      panControl: true,
      addressControl: false,
      enableCloseButton: false,
      zoomControl: false,
      fullScreenControl: false,
      enableCloseButton: false,
      addressControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER
      }

    });
		$('.video').fadeOut();
		$('#street-view').fadeIn();
		return pano;
	},

	toggleStreetView: function() {
		$('#street-view').fadeOut();
		$('#street-view').remove();
		$('.video').fadeIn();
	},


  mapWalk: function(direction) {
    var which;

    switch(direction) {
      case "left": 
        which = '.iv-tactile-compass-turn:not(".iv-tactile-compass-turn-opposite")';
        break;
      case "right":
        which = '.iv-tactile-compass-turn-opposite';
        break;
      case "top": 
        which = 38;
        break;
      case "bottom":
        which = 40
        break;
    }
    console.log(which);

    $(which).trigger('click'); 
  },
}
