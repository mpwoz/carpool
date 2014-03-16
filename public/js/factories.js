'use strict';

/* Factories */

angular.module('myApp.factories', [])
  .factory('RideFactory', function($http) {
    var urlBase = '/api/rides';
    return {

      /**
       * Create a new ride with the given parameters
       * @param  {string} email The email of the driver creating the ride
       * @return {data, status, headers, config} for success and failure callbacks
       */
      newRide: function(email) {
        return $http.post(urlBase, {'email': email});
      },

      /**
       * Get a list of all rides
       * @return {future} future object of an array containing all the rides
       */
      getRides: function() {
        return $http.get(urlBase);
      }

      // Get a single
    }
  });