var flashCards;

Template.move.onRendered(function() {
  var video = document.getElementById("video");

  flashCards = FlashCards.find({
    moveId: this.data._id
  }).fetch();

  var flashCard = currentFlashCard();
  playVideo(flashCard.question_video_start, flashCard.question_video_end);
});

var playVideo = function(start, end) {
  video.currentTime = start;
  video.play();
  setTimeout(function(){
    video.pause();
  }, (end - start) * 1000);
};

var currentFlashCard = function() {
  return flashCards[0];
};

Template.move.events({
  "click .show-answer": function(event, template) {
    playVideo(currentFlashCard().question_video_end, currentFlashCard().answer_video_end);
  }
});

Template.move.helpers({
  flashCards: function() {
    return FlashCards.find({
      moveId: this._id
    });
  }
});
