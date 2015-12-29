(function () {
  angular.module('stripetime-ng').controller('moveNewCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    $scope.newMove = {};

    $scope.save = function() {
      Moves.insert($scope.newMove);
      $scope.newMove = {};
    }
  }])
})();