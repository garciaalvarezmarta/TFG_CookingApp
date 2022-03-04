const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: { type: String },
  description: { type: String },
  img: { type: String },
  stars: { type: Number },
});

module.exports = mongoose.model("recipes", RecipeSchema);
