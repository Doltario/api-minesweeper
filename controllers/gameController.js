const MinesWeeper = require('../lib/MinesWeeper')
const GameModel = require('../models/game')
const ObjectId = require('mongodb').ObjectId

createGame = (width, height, bombsNumber, online) => {
  const game = new MinesWeeper(width, height, bombsNumber).stringify()

  const gameToSave = new GameModel({ grid: JSON.stringify(JSON.parse(game).grid), online })

  gameToSave.save()

  const response = {
    //felix@TODO: create a response builder
    game: {
      _id: gameToSave._id,
      grid: JSON.parse(gameToSave.grid),
      ended: gameToSave.ended,
      won: null,
      online: gameToSave.online
    }
  }

  return response
}

getGameById = gameId => {
  return new Promise((resolve, reject) => {
    if (!gameId) {
      reject(new Error(`First parameter of gameController.getGameById() must be a string, ${typeof gameId} given`))
    }

    GameModel.findOne({ _id: ObjectId(gameId) }, (error, game) => {
      if (error) reject(new Error('Game not found', error))
      if (!game) resolve({})

      const response = {
        game: {
          _id: game._id,
          grid: JSON.parse(game.grid),
          ended: game.ended,
          won: game.won,
          online: game.online
        }
      }

      resolve(response)
    })
  })
}

saveGame = (gameId, gameToSave) => {
  return new Promise((resolve, reject) => {
    if (!gameToSave) {
      reject(new Error(`First parameter of gameController.getGameById() must be a string, ${typeof gameId} given`))
    }
    if (!gameToSave) {
      reject(new Error(`Second parameter of gameController.saveGame() must be a string, ${typeof gameToSave} given`))
    }

    GameModel.findOne({ _id: ObjectId(gameId) }, (error, game) => {
      if (error) reject(new Error('Game not found', error))
      if (!game) resolve({})
      
      game.grid = JSON.stringify(gameToSave.grid)
      game.ended = gameToSave.ended
      game.online = gameToSave.online
      game.won = gameToSave.won

      console.log(game)
      game.save()
      resolve(game)
    })
  })
}

module.exports = { createGame, getGameById, saveGame }
