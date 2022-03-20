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
app.get("/", async (req, res) => {
  const allRecipes = await Recipe.find();
  res.json(allRecipes);
});

//GetByID
app.get("/:id", async(req,res) =>{
  const id = req.params.id;
  const recipe = await Recipe.findById(id);
  res.json(recipe);
})

//GetByFilter

//Save --> POST
app.post("/saveRecipe", async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    steps: req.body.steps,
    img: req.body.img,
    stars: req.body.stars,
  });
  await recipe.save();
  res.json(recipe);
});

//Update --> PUT / PATCH
app.put("/updateRecipe/:id", async (req, res) => {
  const id= req.params.id;
  const recipe = await Recipe.findByIdAndUpdate(id, req.body, {new:true});
  await recipe.save();
  res.json(recipe);
});

//Delete --> DELETE
app.delete("/deleteRecipe/:id", async (req, res) => {
  const id= req.params.id;
  const recipe = await Recipe.findByIdAndDelete(id);
  res.status(204).send();
})

//API INGREDIENTS..

//API...

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
