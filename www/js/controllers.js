angular.module('mobaFree.controllers', [])
.controller('AppCtrl', function($scope, $rootScope) {
	console.log($scope.devices);
	$scope.devices = $rootScope.devices;
})
.controller('DeviceCtrl', function($scope, $stateParams, $rootScope, UserDevices) {
	$scope.id = $stateParams.devId;
	var obj = UserDevices.getObject($scope.id);
	var objID = obj.objectId;
	console.log(JSON.stringify(obj));
	//console.log(objID);
	// valido cuantos focos mostrar
	if(obj.states.length > 1) {
		$scope.second = true;
	} else {
		$scope.second = false;
	}
	if(obj.states.length > 2) {
		$scope.third = true;
	} else {
		$scope.third = false;
	}

	if(obj.states[0] != 0) {
	  $scope.imagen = "bulb_icon.png";
	  $scope.check0 = false;
	  $scope.uncheck0 = true;
	} else {
	  $scope.imagen = "bulb_icon2.png";
	  $scope.check0 = true;
	  $scope.uncheck0 = false;
	}
	if(obj.states[1] != 0) {
	  $scope.imagen1 = "bulb_icon.png";
	  $scope.check1 = false;
	  $scope.uncheck1 = true;
	} else {
	  $scope.imagen1 = "bulb_icon2.png";
	  $scope.check1 = true;
	  $scope.uncheck1 = false;
	}
	if(obj.states[2] != 0) {
	  $scope.imagen2 = "bulb_icon.png";
	  $scope.check2 = false;
	  $scope.uncheck2 = true;
	} else {
	  $scope.imagen2 = "bulb_icon2.png";
	  $scope.check2 = true;
	  $scope.uncheck2 = false;
	}
	$scope.toggle = function() {
		if($scope.check0) {
			$scope.check0 = false;
			$scope.uncheck0 = true;
			obj.states[0] = 1;
			$scope.imagen = "bulb_icon.png";
			bluetoothSerial.write("Off");
		} else {
			$scope.check0 = true;
			$scope.uncheck0 = false;
			obj.states[0] = 0;
			$scope.imagen = "bulb_icon2.png";
			bluetoothSerial.write("On");
		}
		UserDevices.update(objID, {states:obj.states});
	}
	$scope.toggle1 = function() {
		if($scope.check1) {
			$scope.check1 = false;
			$scope.uncheck1 = true;
			obj.states[1] = 1;
			$scope.imagen1 = "bulb_icon.png";
			bluetoothSerial.write("Off");
		} else {
			$scope.check1 = true;
			$scope.uncheck1 = false;
			obj.states[1] = 0;
			$scope.imagen1 = "bulb_icon2.png";
			bluetoothSerial.write("On");
		}
		UserDevices.update(objID, {states:obj.states});
	}
	$scope.toggle2 = function() {
		if($scope.check2) {
			$scope.check2 = false;
			$scope.uncheck2 = true;
			obj.states[2] = 1;
			$scope.imagen2 = "bulb_icon.png";
			bluetoothSerial.write("Off");
		} else {
			$scope.check2 = true;
			$scope.uncheck2 = false;
			obj.states[2] = 0;
			$scope.imagen2 = "bulb_icon2.png";
			bluetoothSerial.write("On");
		}
		UserDevices.update(objID, {states:obj.states});
	}
	
})

.controller('RetrieveCtrl', function(UserDevices) {
	var promise = UserDevices.all();
	
	promise.then(
	  function(data) {
	  	window.location.href = ('#/app/nada');
	  },
	  function(error) {
	  	console.log("Promised failed. Couldn't get devices.");
	  });
})
.controller('NadaCtrl', function() {
	
})
.controller('ConnectCtrl', function($scope, $ionicPlatform, $ionicViewService) {
	var macAddress = "20:13:01:22:13:71";

	//console.log("TRING TO: "+macAddress);
	$ionicPlatform.ready(function() {
		//console.log("TRING TO 2: "+macAddress);
		//bluetoothSerial.clear();
		bluetoothSerial.connect(macAddress, onConnect, onDisconnect);
    });
    var onConnect =  function() {
    	console.log("SUCCESS");
    	bluetoothSerial.write("On", onConnect2, onDisconnect);
		//window.location.href = ('#/retrieving');
	};
	var onConnect2 =  function(data) {
    	console.log(data);
    	bluetoothSerial.write("On");
		//window.location.href = ('#/retrieving');
	};
	var onDisconnect =  function(error) {
		console.log("Could not conect: "+error);
	};
	$ionicViewService.nextViewOptions({
	  disableBack: true
	});
});
