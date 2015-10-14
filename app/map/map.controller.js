(function(){

	'use strict';

	angular
		.module('Map')
		.controller('MapDisplayController', MapDisplayController)
	;


	function MapDisplayController($scope, MapService) {
		var vm = this; 
		vm.MapService = MapService;

		// Variables
		vm.address = '';
		vm.listOfZips = [];


		// Functions
		vm.searchZip = searchZip;

		function searchZip(address) {
			MapService.searchZip(address).then(function(result) {
				console.log(result);
			});
			vm.listOfZips.push(address);
		}

	};
})();