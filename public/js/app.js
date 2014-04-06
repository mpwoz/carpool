'use strict';

/* Declare App level module */

angular.module('myApp', [
  'myApp.controllers',
  'myApp.factories',
  'myApp.filters',
  'ui.bootstrap'
//  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'partials/home'
    }).
    when('/rides', {
      templateUrl: 'partials/rides'
    }).
    when('/newride', {
      templateUrl: 'partials/newride',
      controller: 'NewRideCtrl'
    }).
    when('/rides/:rideID', {
      templateUrl: 'partials/ride',
    }).
    when('/user/:netID', {
      templateUrl: 'partials/profile',
    }).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
});
