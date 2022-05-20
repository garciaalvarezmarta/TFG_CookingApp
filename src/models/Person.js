const mongoose = require("mongoose");
const { Schema } = mongoose;

const PersonSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String }
});

module.exports = mongoose.model("persons", PersonSchema);
