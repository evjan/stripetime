Moves = new Mongo.Collection('moves');

Moves.allow({
  insert: function(title, video_path) {
    return true;
  },
  remove: function(title, video_path) {
    return true;
  }
});
