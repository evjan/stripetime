(function() {
  angular.module('stripetime-ng').controller('movesAdminCtrl', ['$scope', '$meteor', function($scope, $meteor) {
    $scope.stripes = $meteor.collection(Stripes);

    var moves = $meteor.collection(Moves);
    var groupedMoves;

    $scope.movesForStripe = function(stripe) {
      if(groupedMoves === undefined) {
        groupedMoves = _.groupBy(moves, function(m) {
          return m.stripe_id;
        });
      }

      return groupedMoves[stripe._id];
    }
  }]);
})();