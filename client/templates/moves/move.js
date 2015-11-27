var flashCards;
var video;

Template.move.onRendered(function() {
  video = $(".move_video")[0];
  video.muted = true;

  flashCards = FlashCards.find({
    moveId: this.data._id
  }).fetch();

  showQuestion();
});

var showQuestion = function() {
  var flashCard = currentFlashCard();
  $(".move_question").text(flashCard.question_text);

  playVideo(flashCard.question_video_end, flashCard.answer_video_end, showQuestionOverlay);
};

var showQuestionOverlay = function() {
  $(".move_video-overlay-question").show();
};

var playAnswer = function() {
  hideQuestion();

  var flashCard = currentFlashCard();
  playVideo(flashCard.question_video_end, flashCard.answer_video_end, showAnswerOverlay);
};

var showAnswerOverlay = function() {
  $(".move_video-overlay-answer").show();
};

var playVideo = function(start, end, finishedCallback) {
  video.currentTime = start;
  video.play();
  setTimeout(function() {
    video.pause();
    finishedCallback();
  }, (end - start) * 1000);
};

var hideQuestion = function() {
  $(".move_video-overlay-question").hide();
};

var showAnswer = function() {
  playAnswer();
};

var currentFlashCard = function() {
  return flashCards[0];
};

Template.move.events({
  "click .show-answer": function(event, template) {
    showAnswer();
  }
});

Template.move.helpers({
  flashCards: function() {
    return FlashCards.find({
      moveId: this._id
    });
  }
});
