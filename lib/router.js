Router.configure({
  layoutTemplate: 'layout',
});

Router.route("/", {
  name: "home"
});

Router.route("/flash-cards/next", {
  name: "nextFlashCard",
  template: "flashCard",
  data: function() {
    return FlashCards.findOne();
  }
});

Router.route("/flash-cards/admin", {
  name: "flashCardsAdmin",
  waitOn: function() {
    return Meteor.subscribe("flashCards");
  }
});

Router.route("/flash-cards/:_id/edit", {
  name: "flashCardEdit",
  waitOn: function() {
    return Meteor.subscribe("flashCards");
  },
  data: function() {
    return FlashCards.findOne(this.params._id);
  }
});
