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

      /**
       * Get a list of rides for a given user
       * @param  {string} netID The netID of the rider to get rides for
       * @return {future}       future object of an array containing all rides
       */
      getRidesByUser: function(netID) {
        return $http.get('/api/userrides/' + netID);
      },

      /**
       * Get a single ride
       * @param  {int} ride_id the ID of the ride
       * @return {future}          future object of the ride
       */
      getRide: function(ride_id) {
        return $http.get(urlBase + '/' + ride_id);
      },

      /**
       * Signup for a ride
       * @param  {int} ride_id    the ID of the ride
       * @param  {string} user_email The email of the rider signing up for the ride
       * @return {data, status, headers, config} for success and failure callbacks
       */
      signup: function(ride_id, user_email) {
        var submission = {"ride_id": ride_id, "email": user_email};
        return $http.post(urlBase + '/' + ride_id, submission);
      },

      /**
       * Remove a rider from a ride
       * @param  {int} ride_id    the ID of the ride
       * @param  {string} user_email email of the rider to remove from the ride
       * @return {data, status, headers, config} for success and failure callbacks
       */
      removeFromRide: function(ride_id, user_email) {
        var submission = {"ride_id": ride_id, "email": user_email};
        return $http.post('/api/rider', submission);
      }
    }
  })
  .factory('FeedbackFactory', function($http) {
    var urlBase = '/api/feedback';
    return {
      addFeedback: function(feedbackinfo) {
        return $http.post(urlBase, feedbackinfo);
      },

      getFeedback: function(user) {
        return $http.get(urlBase+'/'+user);
      }
    }
  });
