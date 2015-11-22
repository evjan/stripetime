FlashCardForm = {};

FlashCardForm.clearErrors = function() {
  Session.set('flashCardErrors', {});
};

FlashCardForm.properties = function(event) {
  var formElement = $(event.target);

  var getValue = function(name) {
    return formElement.find('[name=' + name + ']').val();
  };

  return {
    move_name: getValue('move_name'),
    video_path: getValue('video_path'),
    question_text: getValue('question_text'),
    answer_text: getValue('answer_text'),
    question_video_start: getValue('question_video_start'),
    question_video_end: getValue('question_video_end'),
    answer_video_end: getValue('answer_video_end')
  };
};

FlashCardForm.saveErrorHandler = function(error) {
  if (error) {
    throwError(error.reason);
  } else {
    Router.go('flashCardsAdmin');
  }
};
