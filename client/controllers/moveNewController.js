(function() {
  angular.module('stripetime-ng').controller('moveNewCtrl', ['$scope', '$meteor', '$location', function($scope, $meteor, $location) {
    $scope.newMove = {};

    $scope.stripes = $meteor.collection(Stripes);

    $scope.save = function() {
      Moves.insert($scope.newMove);
      $scope.newMove = {};
      $location.path('/moves/admin');
    };
  }])
})();