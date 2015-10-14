(function(){

	'use strict';

	angular
		.module('Map')
		.controller('MapDisplayController', MapDisplayController)
	;


	function MapDisplayController(MapService) {
		var vm = this;

		// Variables
		vm.address = '';
		vm.listOfZips = [];


		// Functions
		vm.searchZip = searchZip;

		function searchZip(address) {
			MapService.searchZip(address)
				.then(function(result) {
					if(result === 'OK') {
						vm.listOfZips.push(address);
						resetZip();
					} else if (result === 'ZERO_RESULTS') {
						alert('Couldn\'t find that zip code');
						resetZip();
					}

				})
				.catch(function(error) {
					console.log(error);
					resetZip();
					alert('Couldn\'t find that zip code');
				});
		}

		function resetZip() {
			vm.address = '';
			return vm.address;
		}

	}
})();