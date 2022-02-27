const express = require('express')
const app = express()
const port = 5000

const { mongoose} = require('./database')



app.get('/allRecipes', (req, res) => {
  mongoose.get('recipe')
})

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
  })