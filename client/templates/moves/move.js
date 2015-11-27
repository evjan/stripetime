var flashCards;
var video;
var firstFlashCard = true;

Template.move.onRendered(function() {
  video = $(".move_video")[0];
  // video.muted = true;

  flashCards = FlashCards.find({
    moveId: this.data._id
  }).fetch();

  showQuestion();
});

var showQuestion = function() {
  hideAnswerOverlay();
  var flashCard = currentFlashCard();
  $(".move_question").text(flashCard.question_text);

  if (firstFlashCard) {
    playVideo(flashCard.question_video_start, flashCard.question_video_end, showQuestionOverlay);
  } else {
    showQuestionOverlay();
  }
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

var hideAnswerOverlay = function() {
  $(".move_video-overlay-answer").hide();
};

var playVideo = function(start, end, finishedCallback) {
  if (firstFlashCard) {
    video.currentTime = start;
  }

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

var showNextQuestion = function() {
  flashCards.shift();
  firstFlashCard = false;

  if (flashCards.length > 0) {
    showQuestion();
  } else {
    showYoureDone();
  }
};

var showYoureDone = function() {
  hideAnswerOverlay();
  $(".move_video-overlay-done").show();
};

Template.move.events({
  "click .show-answer": function() {
    showAnswer();
  },
  "click .next-question": function() {
    showNextQuestion();
  }
});

Template.move.helpers({
  flashCards: function() {
    return FlashCards.find({
      moveId: this._id
    });
  }
});
