const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const { mongoose } = require("./database");
const Recipe = require("../models/Recipe");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
//API RECIPES
//GetAll
app.get("/allRecipes", async (req, res) => {
  const allRecipes = await Recipe.find();
  res.json(allRecipes);
});
//GetByID

//GetByFilter

//Save --> POST
app.post("/saveRecipe", async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    stars: req.body.stars,
  });
  await recipe.save()
  res.json(recipe)
});

//Update --> PUT / PATCH

//Delete --> DELETE

//API INGREDIENTS..

//API...

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
