
angular.module('mobaFree', ['ionic', 'mobaFree.controllers', 'mobaFree.services'])

.run(function($ionicPlatform, $localstorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    /*var devices = [
      {id: 0, name: 'Device:one', mac: "00:FF:01", state:"0"},
      {id: 1, name: 'Device:two', mac: "00:EE:02", state:"1"},
      {id: 2, name: 'Device:three', mac: "00:DD:03", state:"0"}
    ];
    $localstorage.setObject('userdevices', devices);*/
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('retrieve', {
      url: "/retrieving",
      templateUrl: "templates/retrieving.html",
      controller: "RetrieveCtrl"
    })
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('early', {
      url: "/connecting",
      templateUrl: "templates/connecting.html",
      controller: "ConnectCtrl"
    })
    .state('app.nada', {
      url: "/nada",
      views: {
        'menuContent':{
        templateUrl: "templates/nada.html",
        controller: "NadaCtrl"
        }
      }
    })
    .state('app.device', {
      url: '/device:devId',
      views: {
        'menuContent': {
          templateUrl: 'templates/room.html',
          controller: 'DeviceCtrl'
        }
      }
    });

  //$urlRouterProvider.otherwise('/app/0');
  //$urlRouterProvider.otherwise('/retrieving');
  $urlRouterProvider.otherwise('/connecting');
});

