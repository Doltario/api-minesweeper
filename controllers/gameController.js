const MinesWeeper = require('../lib/MinesWeeper')
const GameModel = require('../models/game')
const ObjectId = require('mongodb').ObjectId

createGame = (width, height, bombsNumber, online) => {
  const game = new MinesWeeper(width, height, bombsNumber).stringify()

  const gameToSave = new GameModel({ grid: JSON.stringify(JSON.parse(game).grid), online })
  console.log(gameToSave.players);
  
  gameToSave.save()

  const response = {
    //felix@TODO: create a response builder
    game: {
      _id: gameToSave._id,
      grid: JSON.parse(gameToSave.grid),
      ended: gameToSave.ended,
      won: null,
      online: gameToSave.online,
      players: gameToSave.players,
    },
  }
  return response
}

getGameById = (gameId) => {
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
          online: game.online,
        },
      }

      resolve(response)
    })
  })
}

saveGame = (gameId, gameToSave) => {
  return new Promise((resolve, reject) => {
    if (!gameId) {
      reject(new Error(`First parameter of gameController.saveGame() must be a string, ${typeof gameId} given`))
    }
    if (!gameToSave) {
      reject(new Error(`Second parameter of gameController.saveGame() must be an object, ${typeof gameToSave} given`))
    }

    GameModel.findOne({ _id: ObjectId(gameId) }, (error, game) => {
      if (error) reject(new Error('Game not found', error))
      if (!game) resolve({})

      game.grid = JSON.stringify(gameToSave.grid)
      game.ended = gameToSave.ended
      game.online = gameToSave.online
      game.won = gameToSave.won

      game.save()
      resolve(game)
    })
  })
}

addPlayerToGame = (gameId, player) => {
  return new Promise((resolve, reject) => {
    if (!gameId) {
      reject(new Error(`First parameter of gameController.addPlayerToGame() must be a string, ${typeof gameId} given`))
    }
    if (!player) {
      reject(new Error(`Second parameter of gameController.addPlayerToGame() must be an object, ${typeof player} given`))
    }

    GameModel.findOne({ _id: ObjectId(gameId) }, (error, game) => {
      if (error) reject(new Error('Game not found', error))
      if (!game) return resolve({})

      const playerExists = game.players.find((gamePlayer) => {
        return gamePlayer.socketId === player.socketId
      })

      if (playerExists) {
        return reject('User already in game')
      }

      game.players.push(player)
      game.save()

      return resolve(game)
    })
  })
}

removePlayerFromGame = (gameId, playerSocketId) => {
  return new Promise((resolve, reject) => {
    if (!gameId) {
      reject(new Error(`First parameter of gameController.removePlayerFromGame() must be a string, ${typeof gameId} given`))
    }
    if (!playerSocketId) {
      reject(new Error(`Second parameter of gameController.removePlayerFromGame() must be a string, ${typeof playerSocketId} given`))
    }

    GameModel.findOne({ _id: ObjectId(gameId) }, (error, game) => {
      if (error) reject(new Error('Game not found', error))
      if (!game) return resolve({})

      const playerIndex = game.players.findIndex((gamePlayer) => {
        return gamePlayer.socketId === playerSocketId
      })

      if (playerIndex >= 0) {
        game.players.splice(playerIndex, 1)
        game.save()
      }
      resolve(game)
    })
  })
}

resetGame = (gameId) => {
  return new Promise((resolve, reject) => {
    if (!gameId) {
      reject(new Error(`First parameter of gameController.resetGame() must be a string, ${typeof gameId} given`))
    }

    GameModel.findOne({ _id: ObjectId(gameId) }, (error, game) => {
      if (error) reject(new Error('Game not found', error))
      if (!game) return resolve({})

      const transitoryGame = new MinesWeeper(game.width, game.height, game.bombsNumber).stringify()
      game.grid = JSON.stringify(JSON.parse(transitoryGame).grid)
      game.ended = false
      game.won = null
      game.save()

      const response = {
        game: {
          _id: game._id,
          grid: JSON.parse(game.grid),
          ended: game.ended,
          won: game.won,
          online: game.online,
        },
      }

      return resolve(response)
    })
  })
}

module.exports = { createGame, getGameById, saveGame, addPlayerToGame, removePlayerFromGame, resetGame }
