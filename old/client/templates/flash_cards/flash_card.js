var playVideo = function(start, end) {
  var video = $(".flash-card_video")[0];

  video.currentTime = start;

  var millisecondsToWait = (end - start) * 1000;

  video.play();
  Meteor.setTimeout(function() {
    video.pause();
  }, millisecondsToWait);
};

var showNextCard = function(event, template) {
  $(".flash-card_answer").hide();
  var allCards = FlashCards.find().fetch();
  var nextCard = allCards[_.random(0, allCards.length - 1)];
  Router.go('flashCard', {
    "_id": nextCard._id
  });
};

Template.flashCard.events({
  "click .flash-card_video-play": function(event, template) {
    playVideo(template.data.question_video_start, template.data.question_video_end);
  },
  "click .flash-card_show-answer": function(event, template) {
    $(".flash-card_answer").show();
    playVideo(template.data.question_video_end, template.data.answer_video_end);
  },
  "click .flash-card_wrong-answer": showNextCard,
  "click .flash-card_right-answer": showNextCard
});
