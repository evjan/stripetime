var stripeTime = angular.module('stripetime-ng');
stripeTime.controller('moveDetailsCtrl', function($scope, $stateParams, $meteor, $document, $timeout){

    $scope.move = $scope.$meteorObject(Moves, $stateParams.moveId);

    $scope.flashCards = $scope.$meteorCollection(function(){
        return FlashCards.find({
            moveId: $scope.move._id
        },
        {
            sort: {
                question_video_start: 1
            }
        });
    }, false);

    $scope.firstFlashCard = false;

    $scope.video = {};

    $scope.moveQuestionText = '';
    $scope.showMoveQuestion = false;

    $scope.moveAnswerText = '';
    $scope.showMoveAnswer = false;

    $scope.showYoureDone = false;

    function moveInit() {
        $scope.firstFlashCard = true;
        $scope.video = $document.find('.move_video');

        $scope.video.on('loadeddata', function(event){
            // wait til the video is loaded
            showQuestion();
        });
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

    function hideQuestionOverlay(){
        $scope.showMoveQuestion = false;
    }

    function showAnswerOverlay() {
        $scope.showMoveAnswer = true;
    }

    function hideAnswerOverlay(){
        $scope.showMoveAnswer = false;
    }

    function showYoureDone() {
        hideAnswerOverlay();
        $scope.showYoureDone = true;
    }

    moveInit();
});
