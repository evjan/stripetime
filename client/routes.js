angular.module('stripetime-ng').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('yt', {
      url: '/yt',
      templateUrl: 'client/views/yt.html',
      controller: 'ytCtrl'
    })
    .state('moves', {
      url: '/moves',
      templateUrl: 'client/views/home.html',
      controller: 'homeCtrl'
    })
    .state('moveDetails', {
      url: '/moves/:moveId',
      templateUrl: 'client/views/move-detail.html',
      controller: 'moveDetailsCtrl'
    });

  $urlRouterProvider.otherwise('/moves');
});
