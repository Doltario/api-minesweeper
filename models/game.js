const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  room: Object,
  grid: String
})

module.exports = mongoose.model('Game', gameSchema)
