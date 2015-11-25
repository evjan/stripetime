Template.flashCard.onRendered(function() {
  var self = this;
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: self.data.video_path,
      playerVars: {
        controls: 0,
        showinfo: 0,
      },
      events: {
        'onReady': onPlayerReady
      }
    });
  };

  var player;

  playVideo = function(start, end) {
    player.seekTo(start);
    player.playVideo();
    setTimeout(stopVideo, (end - start) * 1000);
  };

  stopVideo = function() {
    player.stopVideo();
  };

  onPlayerReady = function(event) {
    playVideo(0, 8);
  };
});


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
