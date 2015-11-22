Template.flashCard.events({
  "click .flash-card_video-play": function(event, template) {
    document.querySelector('video').play();
  },
  "click .flash-card_video-pause": function(event, template) {
    document.querySelector('video').pause();
  },
  "click .flash-card_show-answer": function(event, template) {
    $(".flash-card_answer").show();

    var video = $(".flash-card_video")[0];

    video.currentTime = template.data.question_video_end;

    var millisecondsToWait = (template.data.answer_video_end - template.data.question_video_end) * 1000;

    video.play();
    Meteor.setTimeout(function(){
      video.pause();
    }, millisecondsToWait);
  }
});
