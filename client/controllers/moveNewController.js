(function () {
  angular.module('stripetime-ng').controller('moveNewCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.newMove = {};

    $scope.save = function() {
      Moves.insert($scope.newMove);
      $scope.newMove = {};
      $location.path('/moves/admin');
    }
  }])
})();