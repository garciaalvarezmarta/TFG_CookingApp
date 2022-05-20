const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const { mongoose } = require("./database");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Person = require("../models/Person");
const bodyParser = require("body-parser");
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) =>  {
    cb(null, 'public/assets/recipeImages')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

app.use(cors());
app.use(bodyParser.json());

//IMG

app.post("/uploadImg", upload.single("image"), (req, res)=>{
  res.json(res.req.file.filename)
});

//API RECIPES
//GetAll
app.get("/recipes", async (req, res) => {
  const allRecipes = await Recipe.find();
  res.json(allRecipes);
});

//GetByID
app.get("/recipes/:id", async(req,res) =>{
  const id = req.params.id;
  const recipe = await Recipe.findById(id);
  res.json(recipe);
})


//ShowRecipesByUser
app.get("/userRecipes/:id", async(req,res) => {
  const id = req.params.id;
  const allRecipes = await Recipe.find().where('userId').equals(id);
  res.json(allRecipes);
})



//GetByFilter

//Save --> POST
app.post("/saveRecipe", async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    steps: req.body.steps,
    ingredients: req.body.ingredients,
    img: req.body.img,
    stars: req.body.stars,
    userId: req.body.userId,
    userName: req.body.userName
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

//GetAllIngredients
app.get("/ingredients", async (req, res) => {
  const allIngredients = await Ingredient.find();
  res.json(allIngredients);
});

//GetIngredientById
app.get("/Ingredients/:id", async(req,res) => {
  const id= req.params.id;
  const ingredient = await Ingredient.findById(id);
  res.json(ingredient);
})

//GetIngredientByIdRecipe
app.get("/recipes/:id/ingredients", async(req,res) =>{
  const id = req.params.id;
  const recipe = await Recipe.findById(id);
  const ingredients = recipe.ingredients;
  res.json(ingredients);
})

//API...

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});

//API People

app.post("/savePerson", async (req, res) => {
  const person = new Person({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  });
  await person.save();
  res.json(person);
});