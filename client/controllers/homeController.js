(function () {
  angular.module('stripetime-ng').controller('homeCtrl', function ($scope, $meteor) {
    $scope.moves = $meteor.collection(Moves);
  });
})();
