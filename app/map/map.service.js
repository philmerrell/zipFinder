(function(){

	'use strict';

	angular
		.module('Map')
		.factory('MapService', MapService)
	;

	function MapService($window, $q) {

		$window.initMap = initMap;

		var geocoder;

		var service = {
			searchZip			:			searchZip
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
			// Set up our promise so we can handle async data elegantly
			var defer = $q.defer();

			geocoder.geocode({'address': address + ' US'}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {

					$window.setCenter(results[0].geometry.location);

					var marker = new google.maps.Marker({
						map: $window,
						position: results[0].geometry.location,
						title: address
					});

					// once we have status back we can send the data back, aka, 'resolve' the promise
					defer.resolve(status);


				} else {
					// if Something bad happens with the Google API Call we can reject the promise and 'catch' the rejection.
					defer.reject(status);
				}

			});

			// We can return this immediately because we are 'promising' the caller of this function a result at some point
			return defer.promise;

		}

	}

})();