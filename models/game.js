const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  grid: String,
  ended: { type: Boolean, default: null },
  won: { type: Boolean, default: null },
  online: Boolean,
  players: [
    {
      nickname: String,
      socketId: String,
    },
  ],
})

module.exports = mongoose.model('Game', gameSchema)
