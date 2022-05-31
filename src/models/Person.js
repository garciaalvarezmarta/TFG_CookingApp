const mongoose = require("mongoose");
const { Schema } = mongoose;

const PersonSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  idFirebase: {type: String},
  savedRecipes: {type: Array}
});

module.exports = mongoose.model("persons", PersonSchema);
