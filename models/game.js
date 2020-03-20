const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  grid: String,
  online: Boolean
})

module.exports = mongoose.model('Game', gameSchema)
