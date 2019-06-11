
function initialize() {
  initMap();
  initAutocomplete();
}
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 14,
    center: {lat: 42.3505, lng: -71.1054},
    mapTypeControl: false,
    streetViewControl: false,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  });
  directionsDisplay.setMap(map);

  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    sendRequest()
      
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];

    } else {
      window.alert('Directions request failed due to ' + status);
      return;
    }
  });
}
      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        start = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('start')),
            {types: ['geocode']});

        
         end = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('end')),
            {types: ['geocode']});

      }


      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            start.setBounds(circle.getBounds());
            end.setBounds(circle.getBounds());
          });  
      }
    }

    function sendRequest() {
      var geocoder = new google.maps.Geocoder();
      var startingAddress = document.getElementById('start').value
      var destinationAddress = document.getElementById('end').value;
      var budget = document.getElementById('budget').value
      var ridetype = document.getElementById('ride-type').value
      var seatcount = document.getElementById('seat-count').value
      
      // Handle error cases
      if (ridetype==="") {
        window.alert('Please select your ride type');
        return;
      }
      if (budget==="") {
        window.alert('Please tell us your budget in a number');
        return;
      }
      if (ridetype==="UberPool" && seatcount==="") {
        window.alert('Please select your seat count for pool');
        return;
      }

      var addresses = [startingAddress, destinationAddress];
      // geocode = [starting, destionation]
      // var geocodes = [];
      var geocodes = [];
      // find geocode for both start and destination 
      
      // for (var i = 0; i < 2; i++) {
      //   geocoder.geocode({'address': addresses[i]}, function(results, status) {
      //     if (status === 'OK') {
      //       //[lat,long]
      //       geocodes.push(results[0].geometry.location.toString().replace(/\(|\)/g, '').split(', '));
      //     } else {
      //       alert('Geocode was not successful for the following reason: ' + status);
      //     }
      //   });
      // }

      //   geocoder.geocode({'address': addresses[i]}, function(results, status) {
      //     if (status === 'OK') {
      //       //[lat,long]
      //       geocodes.push(results[0].geometry.location.toString().replace(/\(|\)/g, '').split(', '));
      //     } else {
      //       alert('Geocode was not successful for the following reason: ' + status);
      //     }
      //   });
      var processed = 0;
      $.each(addresses, function(i,v) {
        geocoder.geocode({'address':v}, function(results, status) {
           if (status === 'OK') {
             geocodes[i] = results[0].geometry.location.toString().replace(/\(|\)/g, '').split(', ');
            }
            if (++processed >= geocodes.length) {
               // code goes here for processing after all locations received
               liveRate(geocodes,budget,ridetype,seatcount);
               
            }
        });
     });
    
     // Repeat liveRate function 30 sec each
    setTimeout(sendRequest, 30000);
    
      
    }

    
    