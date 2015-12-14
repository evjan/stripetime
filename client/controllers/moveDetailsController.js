var stripeTime = angular.module('stripetime-ng');
stripeTime.controller('moveDetailsCtrl', function($scope, $stateParams, $meteor, $document, $timeout) {
  $scope.move = $scope.$meteorObject(Moves, $stateParams.moveId);

  $scope.firstFlashCard = false;

  $scope.video = {};

  $scope.moveQuestionText = '';
  $scope.showMoveQuestion = false;

  $scope.moveAnswerText = '';
  $scope.showMoveAnswer = false;

  $scope.showYoureDone = false;

  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'xDe2pUDlTx8',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function stopVideo() {
    player.pauseVideo();
  }

  function moveInit() {
    //$scope.firstFlashCard = true;
    //$scope.video = $document.find('.move_video');
    //
    //$scope.video.one('canplay', function(event){
    //  $scope.flashCards = loadFlashCards();
    //  // wait til the video is loaded
    //  showQuestion();
    //});
  }

  function loadFlashCards() {
    return $scope.$meteorCollection(function() {
      return FlashCards.find({
        moveId: $scope.move._id
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

  $scope.showNextQuestion = function() {
    $scope.flashCards.shift();

    $scope.firstFlashCard = false;

    if ($scope.flashCards.length > 0) {
      showQuestion();
    } else {
      showYoureDone();
    }
  };

  $scope.playAnswer = function() {
    hideQuestionOverlay();

    var flashCard = currentFlashCard();

    $scope.moveAnswerText = flashCard.answer_text || "";

    playVideo(flashCard.question_video_end, flashCard.answer_video_end, showAnswerOverlay);
  };

  function playVideo(start, end, finishedCallback) {
    var $video = $scope.video[0];

    $video.currentTime = start;

    $video.play();

    $timeout(function() {
      $video.pause();
      finishedCallback();
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
});
