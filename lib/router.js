Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return Meteor.subscribe("moves") && Meteor.subscribe("flashCards");
  }
});

Router.route("/", {
  name: "home"
});

Router.route('/moves/:_id', {
  name: 'move',
  data: function() {
    return Moves.findOne(this.params._id);
  }
});

// Router.route("/flash-cards/:_id", {
//   name: "flashCard",
//   data: function() {
//     return FlashCards.findOne(this.params._id);
//   }
// });
