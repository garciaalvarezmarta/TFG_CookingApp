const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  commentValue: { type: String },
  recipeId: { type: String },
  userId: { type: String },
  date: {type: Date},
  stars: {type: Number}
});

module.exports = mongoose.model("comments", CommentSchema);
