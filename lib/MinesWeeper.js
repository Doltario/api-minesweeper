const Grid = require('./Grid.js')

class MinesWeeper {
  constructor(width = 5, height = 5, bombsNumber = 10) {
    this._grid = new Grid(width, height, bombsNumber)
  }

  get grid() {
    return this._grid
  }
}

module.exports = MinesWeeper
