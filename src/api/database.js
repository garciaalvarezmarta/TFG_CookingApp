const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://garciaalvarezmarta:Fyfr8mzh2dHVjwE7@cluster0.fzmsp.mongodb.net/CookingApp?retryWrites=true&w=majority').then(
    db => console.log('DB is connected')
).catch(err => console.error(err))

module.exports = mongoose;