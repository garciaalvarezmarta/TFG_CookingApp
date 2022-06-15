const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const { mongoose } = require("./database");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Person = require("../models/Person");
const Comment = require("../models/Comment");

const bodyParser = require("body-parser");
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/recipeImages");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());

//IMG

app.post("/uploadImg", upload.single("image"), (req, res) => {
  res.json(res.req.file.filename);
});

//**********API RECIPES
//GetAll
app.get("/recipes", async (req, res) => {
  const allRecipes = await Recipe.find();
  res.json(allRecipes);
});

//GetByID
app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipe.findById(id);
  res.json(recipe);
});

//ShowRecipesByUser
app.get("/userRecipes/:id", async (req, res) => {
  const id = req.params.id;
  const allRecipes = await Recipe.find().where("userId").equals(id);
  res.json(allRecipes);
});

//GetByFilter
app.get("/recipesFiltered/:filter", async (req, res) => {
  const filter = req.params.filter;
  const recipe = await Recipe.find({
    name: { $regex: new RegExp(filter, "i") },
  });
  res.json(recipe);
});
app.get("/recipesFiltered/", async (req, res) => {
  const recipe = await Recipe.find();
  res.json(recipe);
});

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
    userName: req.body.userName,
    category: req.body.category
  });
  await recipe.save();
  res.json(recipe);
});

//Update
app.put("/updateRecipe/:id", async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
  await recipe.save();
  res.json(recipe);
});

//Delete --> DELETE
app.delete("/deleteRecipe/:id", async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipe.findByIdAndDelete(id);
  res.status(204).send();
});

// addFavouriteRecipe -->  actuliza la lista de recetas guardadas del current user

app.put("/addFavouriteRecipe/:id", async (req, res) => {
  const currentUser = req.params.id;
  const recipeId = req.body.id;
  console.log(recipeId);
  const currentSavedRecipes = JSON.parse(
    JSON.stringify(await Person.findOne({ idFirebase: currentUser }))
  ).savedRecipes;
  console.log(currentSavedRecipes);
  //const savedRecipesArray = await Person.findById(currentUser).select();
  currentSavedRecipes.push(recipeId);
  const person = await Person.findOneAndUpdate(
    { idFirebase: currentUser },
    {
      savedRecipes: currentSavedRecipes,
    }
  );
  await person.save();
  res.json(person);
});

//remoFavouriteRecipe

app.put("/removeFavouriteRecipe/:id", async (req, res) => {
  const currentUser = req.params.id;
  const recipeId = req.body.id;
  const currentSavedRecipes = JSON.parse(
    JSON.stringify(await Person.findOne({ idFirebase: currentUser }))
  ).savedRecipes;
  //const savedRecipesArray = await Person.findById(currentUser).select();
  const auxId = currentSavedRecipes.indexOf(recipeId);
  currentSavedRecipes.splice(auxId, 1);
  const person = await Person.findOneAndUpdate(
    { idFirebase: currentUser },
    {
      savedRecipes: currentSavedRecipes,
    }
  );
  await person.save();
  res.json(person);
});

//isSaved?? id recete true o false user

app.get("/isFavouriteSaved/:userId/:recipeId", async (req, res) => {
  const currentUser = req.params.userId;
  const recipeId = req.params.recipeId;
  const currentSavedRecipes = JSON.parse(
    JSON.stringify(await Person.findOne({ idFirebase: currentUser }))
  ).savedRecipes;
  const isSaved = currentSavedRecipes.includes(recipeId);
  res.json(isSaved);
});

//Sacar recetas favoritas del usuario --> GET/userId
app.get("/getFavoriteRecipes/:userId", async (req, res) => {
  const currentUser = req.params.userId;
  const recipesIdArray = JSON.parse(
    JSON.stringify(await Person.findOne({ idFirebase: currentUser }))
  ).savedRecipes;
  const recipesArray = await Recipe.find({ _id: { $in: recipesIdArray } });
  console.log(recipesArray);
  res.json(recipesArray);
});

//Get Recipe by type
app.get("/getRecipeByCategory/:category", async (req, res) => {
  const category = req.params.category;
  const result = await Recipe.find({ category: category });
  res.json(result);
});

//**********API INGREDIENTS

//GetAllIngredients
app.get("/ingredients", async (req, res) => {
  const allIngredients = await Ingredient.find();
  res.json(allIngredients);
});

//GetIngredientById
app.get("/Ingredients/:id", async (req, res) => {
  const id = req.params.id;
  const ingredient = await Ingredient.findById(id);
  res.json(ingredient);
});

//GetIngredientByIdRecipe
app.get("/recipes/:id/ingredients", async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipe.findById(id);
  const ingredients = recipe.ingredients;
  res.json(ingredients);
});

//**********API PEOPLE

app.post("/savePerson", async (req, res) => {
  const person = new Person({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    idFirebase: req.body.idFirebase,
    savedRecipes: [],
  });
  await person.save();
  res.json(person);
});

app.get("/getUserById/:id", async (req, res) => {
  const uid = req.params.id;
  const user = await Person.findOne({ idFirebase: uid });

  res.json(user);
});

//**********API COMMENT
//Save new comment
app.post("/saveComment", async (req, res) => {
  const comment = new Comment({
    commentValue: req.body.value,
    recipeId: req.body.recipeId,
    userId: req.body.uid,
    date: new Date(),
    stars: req.body.stars,
  });
  await comment.save();
  res.json(comment);
});

app.get("/getCommentsByRecipe/:id", async (req, res) => {
  const rid = req.params.id;
  const comments = await Comment.find({ recipeId: rid });
  res.json(comments);
});

//API...

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
