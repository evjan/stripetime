Meteor.publish("flashCards", function() {
  return FlashCards.find();
});
