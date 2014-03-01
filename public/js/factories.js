'use strict';

/* Factories */

angular.module('myApp.factories', []).
  factory('RideFactory', function($http) {
    var urlBase = '/api/rides';
    var rideFactory = {};

    rideFactory.newRide = function(user_email) {
      $http.post(urlBase, {'email': user_email})
          .success(function(data, status, headers, config) {

          }).error(function(data, status, headers, config) {

          });
    }

    return rideFactory;
  });