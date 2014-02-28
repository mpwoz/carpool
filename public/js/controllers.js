'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }).
  controller('AppCtrl', function ($scope) {

  }).
  controller('NewRideCtrl', function ($scope) {

  });
