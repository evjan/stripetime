(function () {
  angular.module('stripetime-ng').controller('moveEditCtrl', ['$scope', '$stateParams', '$meteor', '$document', '$timeout', function ($scope, $stateParams, $meteor, $document, $timeout) {
    $scope.playerVars = {
      showinfo: 0
    };

    $scope.move = $scope.$meteorObject(Moves, $stateParams.moveId);
    $scope.videoId = $scope.move.video_id;
  }]);
})();
