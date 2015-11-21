Router.configure({
  layoutTemplate: 'layout',
});

Router.route("/", {
  name:"home"
});

Router.route("/flashCards/next", {
  name: "nextFlashCard",
  template: "flashCard",
  data: function () {
    return FlashCards.findOne();
  }
});
