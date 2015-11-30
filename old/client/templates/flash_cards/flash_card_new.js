Template.flashCardNew.onCreated(function() {
  FlashCardForm.clearErrors();
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

    var flashCardProperties = FlashCardForm.properties(event);

    var errors = validateFlashCard(flashCardProperties);
    if (_.size(errors) > 0) {
      return Session.set('flashCardErrors', errors);
    } else {
      Session.set('flashCardErrors', {});
    }

    FlashCards.insert(flashCardProperties, FlashCardForm.saveErrorHandler);
  }
});
