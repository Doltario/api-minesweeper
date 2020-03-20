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
          online: game.online
        }
      }

      resolve(response)
    })
  })
}

module.exports = { createGame, getGameById }
