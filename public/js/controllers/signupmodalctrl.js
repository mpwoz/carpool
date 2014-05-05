angular.module('myApp.controllers')
  .controller('SignupModalCtrl', function ($scope, $modalInstance, RideFactory, ride_id) {
    $scope.submit = function (email) {
      RideFactory.signup(ride_id, email)
        .success(function(data, status, headers, config) {
          $scope.success = true;
          $scope.ride_id = ride_id;
          $modalInstance.close($scope.success);
        }).error(function(data, status, headers, config) {
          $scope.success = false;
          $modalInstance.close($scope.success);
        });
    }
  });