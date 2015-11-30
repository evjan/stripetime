Meteor.publish("flashCards", function() {
  return FlashCards.find();
});

Meteor.publish("moves", function() {
  return Moves.find();
});
