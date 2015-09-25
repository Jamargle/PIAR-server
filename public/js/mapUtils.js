

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable
var infoWindow;
var pois = [];


/**
 *Start here! initializeMap() is called when page is loaded.
 */
function initializeMap() {

	var latlng = new google.maps.LatLng(37.6757925,-3.5652065);
	var myOptions = {
			center: latlng,
			zoom: 14,
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

		var myLatLng = {
			lat: placeData.latitud, 
			lng: placeData.longitud
		};

		var name = placeData.nombre;   // name of the place from the place service
		//var bounds = window.mapBounds;            // current boundaries of the map window

		var greenPin = "43A047";
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + greenPin);

		// marker is an object with additional data about the pin for a single location
		var marker = new google.maps.Marker({
			map: map,
			position: myLatLng,
			title: name,
			icon: pinImage
		});


		// Callback to open and close infowindow 
		google.maps.event.addListener(marker, 'click', function() {
			if (infoWindow) {
				infoWindow.close();
			}

			infoWindow = new google.maps.InfoWindow({
				content: name
			});
			infoWindow.open(map, marker);

			//POR AQUI VOY METER LOS DATOS EN LOS CAMPOS PARA PODER EDITARLOS
			/******************************************
			*
			1- Al principio sale la página de new con formulario sin nada
			2- Si pinchas el mapa para un nuevo poi sale boton con crear y el method es post
			3- Si pinchas en un poi sale en el formulario sus datos y el method es put para
			actualizar y delete para borrar

			Mirar si se puede enviar el formulario a través de los botones para que se pueda
			quitar el atributo method del form y que sea independiente.

			**************************************************************/
			showPoiData(placeData);
		});
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


	// Sets the boundaries of the map based on pin locations
	window.mapBounds = new google.maps.LatLngBounds();

	var urlApi = 'http://localhost:3000/pois_by_location/',
	urlLat = '?lat=',
	urlLng = '&lon=',
	urlDist = '&dist=';
	
	// Get data from the server and show pois in the map
	$.getJSON(urlApi + urlLat + map.getCenter().lat() + urlLng + map.getCenter().lng() + urlDist + '15', function(data) {
		for (poi in data.api_pfc) {
			pois.push(data.api_pfc[poi]);

			createMapMarker(data.api_pfc[poi]);
		}
	});


	google.maps.event.addListener(map, 'dragend', function(event) {
		// Get updated data for the new center and show markers
		$.getJSON(urlApi + 'all_pois', function(data) {
			for (poi in data.api_pfc) {
				pois.push(data.api_pfc[poi]);

				createMapMarker(data.api_pfc[poi]);
			}
		});
	});



	/**
	 * showPoiData is a function for refresh content in fields of the form with data
	 */
	function showPoiData(data) {
		var name = document.getElementById('nombre');
		name.value = data.nombre;

		var image = document.getElementById('image');
		image.value = data.multimedia;

		var altitude = document.getElementById('altitude');
		altitude.value = data.altitud;

		var latitude = document.getElementById('latitude');
		latitude.value = data.latitud.toFixed(8);

		var longitude = document.getElementById('longitude');
		longitude.value = data.longitud.toFixed(8);

		var category = document.getElementById('categ');
		category.value = data.categoria;

		var description = document.getElementById('description');
		description.value = data.descripcion;

		var website = document.getElementById('website');
		website.value = data.sitio_web;
	}

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

		var poi = {};

		poi.nombre = 'Nombre del PI';
		poi.multimedia = 'URL de la imagen';
		poi.categoria = 'Categoria';
		poi.descripcion = 'Descripcion del PI';
		poi.sitio_web = 'Web del PI';

		poi.latitud = event.latLng.lat();
		poi.longitud = event.latLng.lng();

		var elevator = new google.maps.ElevationService;
		elevator.getElevationForLocations({
			'locations': [event.latLng]
		}, function(results, status) {
			if (status === google.maps.ElevationStatus.OK) {
				// Retrieve the first result
				if (results[0]) {
					// Open the infowindow indicating the elevation at the clicked position.
					poi.altitud = results[0].elevation.toFixed(1);
					showPoiData(poi);
				}
			} else {
				infowindow.setContent('Elevation service failed due to: ' + status);
			}
		});

		showPoiData(poi);
	});

}