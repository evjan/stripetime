Template.flashCardEdit.onCreated(function() {
  Session.set('flashCardEditErrors', {});
});

Template.flashCardEdit.helpers({
  errorMessage: function(field) {
    return Session.get('flashCardEditErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('flashCardEditErrors')[field] ? 'has-error' : '';
  }
});

Template.flashCardEdit.events({
  "submit form": function(event, template) {
    event.preventDefault();

    var flashCardProperties = {
      move_name: $(event.target).find('[name=move_name]').val(),
      video_path: $(event.target).find('[name=video_path]').val(),
      question_text: $(event.target).find('[name=question_text]').val(),
      answer_text: $(event.target).find('[name=answer_text]').val(),
      question_video_start: $(event.target).find('[name=question_video_start]').val(),
      question_video_end: $(event.target).find('[name=question_video_end]').val(),
      answer_video_end: $(event.target).find('[name=answer_video_end]').val()
    };

    var errors = validateFlashCard(flashCardProperties);
    if (_.size(errors) > 0) {
      return Session.set('flashCardEditErrors', errors);
    }

    var currentFlashCardId = this._id;
    FlashCards.update(currentFlashCardId, { $set: flashCardProperties }, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('flashCardsAdmin');
      }
    });

  }
});
