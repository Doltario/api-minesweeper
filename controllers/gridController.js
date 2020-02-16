const MinesWeeper = require('../lib/MinesWeeper')

createGame = (width, height, bombsNumber) => {
  return new MinesWeeper(width, height, bombsNumber).stringify()
}

module.exports = { createGame }
