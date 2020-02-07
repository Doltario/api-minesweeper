const MinesWeeper = require('../lib/MinesWeeper')

createGame = (width, height, bombsNumber) => {
  return new MinesWeeper(width, height, bombsNumber)
}

module.exports = { createGame }
