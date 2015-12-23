//noinspection JSUnresolvedFunction
var stripeTime = angular.module('stripetime-ng');

stripeTime.controller('moveDetailsCtrl', ['$scope', '$stateParams', '$meteor', '$document', '$timeout', function ($scope, $stateParams, $meteor, $document, $timeout) {
  $scope.firstFlashCard = false;

  $scope.moveQuestionText = '';
  $scope.showMoveQuestion = false;

  $scope.moveAnswerText = '';
  $scope.showMoveAnswer = false;

  $scope.showYoureDone = false;

  $scope.playerVars = {
    controls: 0,
    showinfo: 0
  };

  $scope.$on('youtube.player.ready', function ($event, player) {
    $scope.player = player;
    showQuestion();
  });

  function moveInit() {
    $scope.firstFlashCard = true;
    $scope.move = $scope.$meteorObject(Moves, $stateParams.moveId);
    $scope.videoId = $scope.move.video_id;

    $scope.flashCards = loadFlashCards();
  }

  function loadFlashCards() {
    return $scope.$meteorCollection(function () {
      return FlashCards.find({
        moveId: $scope.move.$$id
      }, {
        sort: {
          question_video_start: 1
        }
      });
    }, false);
  }

  function currentFlashCard() {
    return $scope.flashCards[0];
  }

  function showQuestion() {
    hideAnswerOverlay();
    var flashCard = currentFlashCard();

    $scope.moveQuestionText = flashCard.question_text || "What do you do next?";

    if ($scope.firstFlashCard) {
      playVideo(flashCard.question_video_start, flashCard.question_video_end, showQuestionOverlay);
    } else {
      showQuestionOverlay();
    }
  }

  $scope.showNextQuestion = function () {
    $scope.flashCards.shift();

    $scope.firstFlashCard = false;

    if ($scope.flashCards.length > 0) {
      showQuestion();
    } else {
      showYoureDone();
    }
  };

  $scope.playAnswer = function () {
    hideQuestionOverlay();

    var flashCard = currentFlashCard();

    $scope.moveAnswerText = flashCard.answer_text || "";

    playVideo(flashCard.question_video_end, flashCard.answer_video_end, showAnswerOverlay);
  };

  function playVideo(start, end, finishedCallback) {
    //noinspection JSUnresolvedFunction
    $scope.player.seekTo(start);

    $scope.player.playVideo();

    $timeout(function () {
      try {
        //noinspection JSUnresolvedFunction
        $scope.player.pauseVideo();
        finishedCallback();
      } catch (e) {
        console.log("Error when trying to pause the video: " + e);
      }
    }, (end - start) * 1000);
  }

  function showQuestionOverlay() {
    $scope.showMoveQuestion = true;
  }

  function hideQuestionOverlay() {
    $scope.showMoveQuestion = false;
  }

  function showAnswerOverlay() {
    $scope.showMoveAnswer = true;
  }

  function hideAnswerOverlay() {
    $scope.showMoveAnswer = false;
  }

  function showYoureDone() {
    hideAnswerOverlay();
    $scope.showYoureDone = true;
  }

  moveInit();
}]);
