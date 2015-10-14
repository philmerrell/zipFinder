(function(){
	
	'use strict'

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
			var defer = $q.defer();

			return geocoder.geocode({'address': address + ' US'}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {

					$window.setCenter(results[0].geometry.location);

					var marker = new google.maps.Marker({
						map: $window,
						position: results[0].geometry.location,
						title: address
					});

					defer.resolve(status);

					return defer.promise;
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
					return false;
				}
			});

		}

	};

})();