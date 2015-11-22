Template.flashCardNew.onCreated(function() {
  Session.set('flashCardErrors', {});
});

Template.flashCardNew.helpers({
  errorMessage: function(field) {
    return Session.get('flashCardErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('flashCardErrors')[field] ? 'has-error' : '';
  }
});

Template.flashCardNew.events({
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
      return Session.set('flashCardErrors', errors);
    } else {
      Session.set('flashCardErrors', {});
    }

    FlashCards.insert(flashCardProperties, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('flashCardsAdmin');
      }
    });

  }
});
