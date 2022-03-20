const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: { type: String },
  description: { type: String },
  steps: {type: String},
  img: { type: String },
  ingredients: {type: String},//array
  stars: { type: Number },
  comments: {type: String}
});

module.exports = mongoose.model("recipes", RecipeSchema);
