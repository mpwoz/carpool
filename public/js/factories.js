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
      newRide: function(ride) {
        return $http.post(urlBase, ride);
      },

      /**
       * Get a list of all rides
       * @return {future} future object of an array containing all the rides
       */
      getRides: function() {
        return $http.get(urlBase);
      },

      getRidesByUser: function(netID) {
        return $http.get('/api/userrides/' + netID);
      },

      // Get a single
      getRide: function(ride_id) {
        return $http.get(urlBase + '/' + ride_id);
      }
    }
  })
  .factory('FeedbackFactory', function($http) {
    var urlBase = '/api/feedback';
    return {
      getFeedback: function(user) {
        return $http.get(urlBase+'/'+user);
      }
    }
  });
