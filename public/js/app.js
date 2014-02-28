'use strict';

/* Declare App level module */

angular.module('myApp', [
  'myApp.controllers',
//  'myApp.filters',
//  'myApp.services',
//  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/rides', {
      templateUrl: 'partials/rides'
    }).
    when('/newride', {
      templateUrl: 'partials/newride',
      controller: 'NewRideCtrl'
    }).
    otherwise({
      redirectTo: '/rides',
      controller: 'NewRideCtrl'
    });

  $locationProvider.html5Mode(true);
});
