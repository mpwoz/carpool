'use strict';

/* Declare App level module */

angular.module('myApp', [
  'myApp.controllers',
  'myApp.factories',
  'myApp.filters',
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
    when('/ride/:rideID', {
      templateUrl: 'partials/ride',
    }).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
});
