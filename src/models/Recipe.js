const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    name: {type: String},
    description :  {type: String}
});

module.exports = mongoose.model('recipes', RecipeSchema);