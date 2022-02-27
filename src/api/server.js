const express = require('express')
const app = express()
const port = 5000

const { mongoose} = require('./database')

const Recipe = require('../models/Recipe')


app.get('/allRecipes', async (req, res) => {
  const allRecipes = await Recipe.find();
  res.json(allRecipes);
})




app.listen(port, () => {
    console.log(`Server running in port ${port}`)
  })