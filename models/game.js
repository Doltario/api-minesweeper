const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  grid: String
})

module.exports = mongoose.model('Game', gameSchema)
