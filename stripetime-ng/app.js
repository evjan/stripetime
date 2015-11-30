if (Meteor.isClient){
    angular.module('stripetime-ng',
    [
        'angular-meteor',
        'ui.router'
    ]);

    angular.module('stripetime-ng').config(function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        $stateProvider
        .state('moves', {
            url: '/moves',
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
        .state('moveDetails', {
            url: '/moves/:moveId',
            templateUrl: 'move-detail.html',
            controller: 'moveDetailsCtrl'
        });

        $urlRouterProvider.otherwise('/moves');
    });

    angular.module('stripetime-ng').controller('homeCtrl', function($scope, $meteor){
        $scope.moves = $meteor.collection(Moves);
    });

    angular.module('stripetime-ng').controller('moveDetailsCtrl', function($scope, $stateParams, $meteor, $document){

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

        var moveInit = function() {

            $scope.firstFlashCard = true;
            $scope.video = $document.find('.move_video');

            // video.muted = true

            $scope.video.on('loadeddata', function(event){
                // wait til the video is loaded
                showQuestion();
            });

        };

        var currentFlashCard = function() {
            return $scope.flashCards[0];
        };

        var showQuestion = function() {
            hideAnswerOverlay();
            var flashCard = currentFlashCard();

            $scope.moveQuestionText = flashCard.question_text || "What do you do next?";

            if ($scope.firstFlashCard) {
                playVideo(flashCard.question_video_start, flashCard.question_video_end, showQuestionOverlay);
            } else {
                showQuestionOverlay();
            }
        };

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

        var playVideo = function(start, end, finishedCallback) {

            var $video = $scope.video[0];


            $video.currentTime = start;

            $video.play();

            setTimeout(function() {
                $video.pause();
                finishedCallback();
            }, (end - start) * 1000);
        };

        var showQuestionOverlay = function() {
            $scope.showMoveQuestion = true;
            $scope.$apply();
        };

        var hideQuestionOverlay = function(){
            $scope.showMoveQuestion = false;
        }

        var showAnswerOverlay = function() {
            $scope.showMoveAnswer = true;
        };

        var hideAnswerOverlay = function(){
            $scope.showMoveAnswer = false;
        }

        var showYoureDone = function() {
            hideAnswerOverlay();
            $scope.showYoureDone = true;
        };

        moveInit();



    });
}
