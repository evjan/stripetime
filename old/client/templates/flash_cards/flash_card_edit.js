Template.flashCardEdit.onCreated(function() {
  FlashCardForm.clearErrors();
});

Template.flashCardEdit.helpers({
  errorMessage: function(field) {
    return Session.get('flashCardErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('flashCardErrors')[field] ? 'has-error' : '';
  }
});

Template.flashCardEdit.events({
  "submit form": function(event, template) {
    event.preventDefault();

    var flashCardProperties = FlashCardForm.properties(event);

    var errors = validateFlashCard(flashCardProperties);
    if (_.size(errors) > 0) {
      return Session.set('flashCardErrors', errors);
    } else {
      Session.set('flashCardErrors', {});
    }

    var currentFlashCardId = this._id;
    FlashCards.update(currentFlashCardId, {
      $set: flashCardProperties
    }, FlashCardForm.saveErrorHandler);
  }
});
