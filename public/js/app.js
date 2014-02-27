'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
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
