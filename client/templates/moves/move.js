var flashCards;
var video;

Template.move.onRendered(function() {
  video = $(".move_video")[0];
  video.muted = true;

  flashCards = FlashCards.find({
    moveId: this.data._id
  }).fetch();

  playQuestion();
});

var playQuestion = function() {
  var flashCard = currentFlashCard();
  $(".move_question").text(flashCard.question_text);

  video.currentTime = flashCard.question_video_start;
  video.play();
  setTimeout(function() {
    video.pause();
    $(".move_video-overlay-question").show();
  }, (flashCard.question_video_end - flashCard.question_video_start) * 1000);
};

var playAnswer = function(start, end) {
  video.currentTime = start;
  video.play();
  setTimeout(function() {
    video.pause();
    $(".move_video-overlay-answer").show();
  }, (end - start) * 1000);
};

var hideQuestion = function() {
  $(".move_video-overlay-question").hide();
};

var showAnswer = function() {
  hideQuestion();
  playAnswer(currentFlashCard().question_video_end, currentFlashCard().answer_video_end);
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
