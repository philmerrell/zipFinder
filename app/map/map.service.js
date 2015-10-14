(function(){
	
	'use strict'

	angular
		.module('Map')
		.factory('MapService', MapService)
	;

	function MapService($window) {

		$window.initMap = initMap;

		var geocoder;
		var listOfZips = [];

		var service = {
			getZips							: 				getZips,
			searchZip						:					searchZip
		};

		return service;

		// ----------------------------------------------------------

		function initMap() {
  		$window = new google.maps.Map(document.getElementById('map'), {
    		center: {lat: 45, lng: -114},
    		zoom: 6
  		});

  		geocoder = new google.maps.Geocoder();
		}


		function searchZip(address) {

			var abc =0;

			geocoder.geocode({'address': address}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {

					$window.setCenter(results[0].geometry.location);

					var marker = new google.maps.Marker({
						map: $window,
						position: results[0].geometry.location,
						title: address
					});

					abc = google.maps.GeocoderStatus.OK
					console.log(abc);
					// vm.listOfMarkers.push(marker);
					listOfZips.push(address);
					// console.log('service ' + listOfZips);

				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});

			return abc;
		}


		function getZips() {
			// console.log(listOfZips);
			return listOfZips;
		}
	};

})();