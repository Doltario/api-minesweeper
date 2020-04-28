const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  grid: String,
  ended: Boolean,
  won: {type: Boolean, default: null},
  online: Boolean
})

module.exports = mongoose.model('Game', gameSchema)
