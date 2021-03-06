const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: { type: String },
  description: { type: String },
  steps: { type: String },
  img: { type: String }, //Falta
  ingredients: { type: Array }, 
  stars: { type: Number },
  comments: { type: String },
  userId: {type: String},
  userName: {type: String},
  category: {type: String},
  cost: {type: String},
  duration: {type: Number}
});

module.exports = mongoose.model("recipes", RecipeSchema);
