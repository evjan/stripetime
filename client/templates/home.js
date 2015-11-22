Template.home.helpers({
  randomCard: function(){
    var allCards = FlashCards.find().fetch();
    var nextCard = allCards[_.random(0, allCards.length - 1)];
    return FlashCards.findOne(nextCard._id);
  }
});
