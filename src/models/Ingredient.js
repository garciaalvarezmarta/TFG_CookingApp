const mongoose = require("mongoose");
const { Schema } = mongoose;

const IngredientSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  calories: { type: Number },
  isVeggie: { type: Boolean },
  isCeliac: { type: Boolean },
});

module.exports = mongoose.model("ingredients", IngredientSchema);
