Template.flashCard.events({
  "click .flash-card_video-play": function(event, template) {
    document.querySelector('video').play();
  },
  "click .flash-card_video-pause": function(event, template) {
    document.querySelector('video').pause();
  },
  "click .flash-card_show-answer": function(event, template) {
    var video = $(".flash-card_video")[0];

    video.currentTime = template.data.question_video_end;
    video.play();

    $(".flash-card_answer").show();
  }
});
