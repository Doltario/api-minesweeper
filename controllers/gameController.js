const MinesWeeper = require('../lib/MinesWeeper')
const GameModel = require('../models/game')

createGame = (width, height, bombsNumber) => {
  const game = new MinesWeeper(width, height, bombsNumber).stringify()

  const roomId = `Yo${Date.now()}` //TODO: generate pretty roomId

  const gameToSave = new GameModel({ grid: game.grid, room: { id: roomId } })
  gameToSave.save()

  return { game: JSON.parse(game), room: { id: roomId } }
}

getGameByRoomId = roomId => {
  return new Promise((resolve, reject) => {
    GameModel.findOne({ room: { id: roomId } }, (error, game) => {
      if (error) reject(new Error('Game not found', error))
      resolve(game)
    })
  })
}

module.exports = { createGame, getGameByRoomId }
