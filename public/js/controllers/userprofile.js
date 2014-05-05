angular.module('myApp.controllers')
  .controller('UserProfileCtrl', function ($scope, $routeParams, RideFactory, FeedbackFactory) {
    var user = $routeParams.netID;
    $scope.user = user;
    RideFactory.getRidesByUser(user).then(function (rides) {
      $scope.rides = rides.data;
    });
    FeedbackFactory.getFeedback(user+'@illinois.edu').then(function(feedbacks) {
      $scope.feedbacks = feedbacks.data;
    });
  });