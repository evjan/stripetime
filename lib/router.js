Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return Meteor.subscribe("flashCards");
  }
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
});

Router.route("/flash-cards/new", {
  name: "flashCardNew"
});

Router.route("/flash-cards/:_id/edit", {
  name: "flashCardEdit",
  data: function() {
    return FlashCards.findOne(this.params._id);
  }
});
