FlashCards = new Mongo.Collection('flashCards');

FlashCards.allow({
  insert: function(userId, flashCard) {
    return true;
  },
  update: function(userId, flashCard) {
    return true;
  },
  remove: function(userId, flashCard) {
    return true;
  }
});

FlashCards.deny({
  insert: function(){
    return false;
  },
  update: function(userId, flashCard, fieldNames, modifier){
    return _.size(validateFlashCard(modifier.$set)) > 0;
  },
  remove: function(){
    return false;
  }
});

validateFlashCard = function(flashCard) {
  var errors = {};
  if (!flashCard.move_name) {
    errors.move_name = "Please select a move";
  }

  if (!flashCard.question_text) {
    errors.question_text = "Please enter a question";
  }

  if (!flashCard.video_path) {
    errors.video_path = "Please select a video";
  }

  if (!flashCard.question_video_start) {
    errors.question_video_start = "Please choose where the question starts";
  }

  if (!flashCard.question_video_end) {
    errors.question_video_end = "Please choose where the question ends";
  }

  if (!flashCard.answer_video_end) {
    errors.answer_video_end = "Please choose where the answer ends";
  }

  return errors;
};
