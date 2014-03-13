'use strict';

/* Factories */

angular.module('myApp.factories', [])
  .factory('RideFactory', function($http) {
    var urlBase = '/api/rides';
    return {
      newRide: function(email) {
        return $http.post(urlBase, {'email': email});
      }
    }
  });
