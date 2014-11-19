angular.module('mobaFree.services', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('UserDevices', function($localstorage, $http, $rootScope, $q) {

  return {
    all: function() {
      if($rootScope.devices == null) {
        var deferred = $q.defer();
        $http({
          url: 'https://api.parse.com/1/classes/Settings',
          method: "GET",
          params: {'order': 'devID'},
          headers: {
              'X-Parse-Application-Id': 'TEbXsZIAJikaYh8RXKgepFbSwc4yzou12HuToU5o',
              'X-Parse-REST-API-Key': 'i6krTjwkolJNCWZjXz6LZbPWNLJbvvh6xJyU3rYl'}
        }).success(function (data) {
          //window.location.href = ('#/app/0');
          $rootScope.devices = data.results;
          deferred.resolve(data.results);
        }).error(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      } else {
        return $rootScope.devices;
      }
    },
    update: function(objID, form) {
      $http({
          url: 'https://api.parse.com/1/classes/Settings/'+objID,
          method: "PUT",
          data:form,
          headers: {
              'X-Parse-Application-Id': 'TEbXsZIAJikaYh8RXKgepFbSwc4yzou12HuToU5o',
              'X-Parse-REST-API-Key': 'i6krTjwkolJNCWZjXz6LZbPWNLJbvvh6xJyU3rYl'}
        }).success(function (data) {
          console.log(data);
        }).error(function (error) {
          console.log(error);
        });
    },
    getObject: function(id) {
      //console.log(devices[id]);
      return $rootScope.devices[id];
    },
    updateDeviceState: function(id, state) {
      $rootScope.devices[id].state = state;
      $localstorage.setObject("userdevices",  $rootScope.devices); 
    }
  }
});
