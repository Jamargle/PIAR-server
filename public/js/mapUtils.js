

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/**
 *Start here! initializeMap() is called when page is loaded.
 */
function initializeMap(locations) {

	var latlng = new google.maps.LatLng(37.6757925,-3.5652065);
	var myOptions = {
			center: latlng,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

	/**
	 * For the map to be displayed, the googleMap var must be
	 * appended to #mapDiv in resumeBuilder.js. 
	 */
	map = new google.maps.Map(document.querySelector('#poi_map')
	, myOptions);


	/**
	 * createMapMarker(placeData) reads Google Places search results to create map pins.
	 * placeData is the object returned from search results containing information
	 * about a single location.
	 */
	function createMapMarker(placeData) {

		// The next lines save location data from the search result object to local variables
		var lat = placeData.geometry.location.lat();  // latitude from the place service
		var lon = placeData.geometry.location.lng();  // longitude from the place service
		var name = placeData.formatted_address;   // name of the place from the place service
		//var bounds = window.mapBounds;            // current boundaries of the map window


		var greenPin = "43A047";
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + greenPin);

		// marker is an object with additional data about the pin for a single location
		var marker = new google.maps.Marker({
			map: map,
			position: placeData.geometry.location,
			title: name,
			icon: pinImage
		});

		// infoWindows are the little helper windows that open when you click
		// or hover over a pin on a map. They usually contain more information
		// about a location.
		var infoWindow = new google.maps.InfoWindow({
			content: name
		});

		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.open(map, marker);
		});

		// this is where the pin actually gets added to the map.
		// bounds.extend() takes in a map location object
		//bounds.extend(new google.maps.LatLng(lat, lon));
		// fit the map to the new marker
		//map.fitBounds(bounds);
		// center the map
		//map.setCenter(bounds.getCenter());
	}

	/**
	 * callback(results, status) makes sure the search returned results for a location.
	 * If so, it creates a new map marker for that location.
	 */
	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			createMapMarker(results[0]);
		}
	}

	/**
	 * pinPoster(locations) takes in the array of locations created by locationFinder()
	 * and fires off Google place searches for each location
	 */
	function pinPoster(locations) {

		// creates a Google place search service object. PlacesService does the work of
		// actually searching for location data.
		var service = new google.maps.places.PlacesService(map);

		// Iterates through the array of locations, creates a search object for each location
		for (var place in locations) {
			// the search request object
			var request = {
				query: locations[place]
			};

			// Actually searches the Google Maps API for location data and runs the callback
			// function with the search results after each search.
			service.textSearch(request, callback);
		}
	}

	// Sets the boundaries of the map based on pin locations
	window.mapBounds = new google.maps.LatLngBounds();

	// pinPoster(locations) creates pins on the map for each location in
	// the locations array
	pinPoster(locations);


	/****** New markers when clicking the map ********/

	var newPin;

	/**
	 * createNewMarker place a new marker over the map and change lat and lon fields in the form
	 */
	function createNewMarker(location) {

		var bluePin = "33B5E5";
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + bluePin);
		
		//remove previous marker
		if (newPin !== undefined) {
			newPin.setMap(null);
		}

		// marker is an object with additional data about the pin for a single location
		newPin = new google.maps.Marker({
			map: map,
			position: location,
			title: name,
			icon: pinImage
		});
	}

	// When you click the map, it calls createNewMarker for placing a new marker over the map and change 
	// alt, lat and lon fields in the form with this position
	google.maps.event.addListener(map, 'click', function(event) {

		createNewMarker(event.latLng);

		var latitude = document.getElementById('latitude');
		latitude.value = event.latLng.lat().toFixed(8);

		var longitude = document.getElementById('longitude');
		longitude.value = event.latLng.lng().toFixed(8);


		var elevator = new google.maps.ElevationService;
		elevator.getElevationForLocations({
			'locations': [event.latLng]
		}, function(results, status) {
			if (status === google.maps.ElevationStatus.OK) {
				// Retrieve the first result
				if (results[0]) {
					// Open the infowindow indicating the elevation at the clicked position.
					var altitude = document.getElementById('altitude');
					altitude.value = results[0].elevation.toFixed(1);
				}
			} else {
				infowindow.setContent('Elevation service failed due to: ' + status);
			}
		});
	});		

}