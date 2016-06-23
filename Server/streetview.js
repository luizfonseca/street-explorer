var port = chrome.runtime.connect({ name: 'YDREAMS' });


port.onMessage.addListener(function(msg) {
  if (msg.direction) {
    window.StreetView.mapWalk(msg.direction);
  }
});



var panorama;
function initialize() {
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('street-view'),
    {
      position: { lat: 38.7980084, lng: -9.391184 },
      pov: {heading: 0, pitch: 0},
      zoom: 0,
      disableDefaultUI: true,
      linksControl: false,
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
}


window.StreetView = {

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
