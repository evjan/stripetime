(function() {
  angular.module('stripetime-ng').controller('moveEditCtrl', ['$scope', '$stateParams', '$meteor', '$document', '$timeout', function($scope, $stateParams, $meteor, $document, $timeout) {
    $scope.playerVars = {
      showinfo: 0
    };

    $scope.move = $scope.$meteorObject(Moves, $stateParams.moveId);

    var loadFlashCards = function() {
      return $scope.$meteorCollection(function() {
        return FlashCards.find({
          moveId: $scope.move.$$id
        }, {
          sort: {
            question_video_start: 1
          }
        });
      }, false);
    };

    $scope.flashCards = loadFlashCards();
    $scope.videoId = $scope.move.video_id;

    $scope.newFlashCard = {};

    $scope.save = function() {
      $scope.newFlashCard.moveId = $scope.move.$$id;
      FlashCards.insert($scope.newFlashCard);
      $scope.newFlashCard = {};
    };
  }]);
})();
