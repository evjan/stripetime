(function () {
  angular.module('stripetime-ng').controller('moveNewCtrl', ['$scope', function ($scope) {
    $scope.newMove = {};

    $scope.save = function() {
      Moves.insert($scope.newMove);
      $scope.newMove = {};
    }
  }])
})();