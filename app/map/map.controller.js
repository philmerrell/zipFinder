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
		vm.groups = [];
		vm.listOfZips = [];


		// Functions
		vm.addToGroup = addToGroup;
		vm.remove = remove;
		vm.searchZip = searchZip;

		function searchZip(address) {
			MapService.searchZip(address);
			vm.listOfZips = vm.MapService.getZips();


			// console.log(vm.listOfZips);
		}

		function addToGroup() {
			var chk_arr =  document.getElementsByName("check");
			var zip_holder = [];          

			var i;
			for(i = 0; i < chk_arr.length; i++) {
    		if (chk_arr[i].checked) {
    			zip_holder.push(chk_arr[i].value);
    			chk_arr[i].checked = false;
    		}
			} 

			vm.groups.push(zip_holder);
		}

		function remove() {
			var chk_arr =  document.getElementsByName("check");
			var zip_holder = [];          

			var i;
			var j;
			for(i = 0; i < chk_arr.length; i++) {

    		if (chk_arr[i].checked) {
    			zip_holder.push(chk_arr[i].value);
    			chk_arr[i].checked = false;
    		}
			} 

			for(i = 0; i < zip_holder.length; i++) {
				for(j = 0; j < vm.listOfMarkers.length; j++) {
					if((zip_holder[i] === vm.listOfMarkers[j].title)) {
						vm.listOfMarkers[j].setMap(null);
					}
				}

				var index = vm.listOfZips.indexOf(zip_holder[i]);

				if(index > -1) {
					vm.listOfZips.splice(index, 1);
				}
			}


		}

		$scope.$watch(function() {
			return MapService.getZips();
		}, function(newVal, oldVal) {
			console.log(newVal);
		});


	};
})();