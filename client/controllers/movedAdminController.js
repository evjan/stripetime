(function() {
  angular.module('stripetime-ng').controller('movesAdminCtrl', ['$scope', '$meteor', function($scope, $meteor) {
    $scope.moves = $meteor.collection(Moves);
  }]);
})();