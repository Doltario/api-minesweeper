const Grid = require('./Grid.js')

class MinesWeeper {
  constructor(width = 5, height = 5, bombsNumber = 10) {
    this._grid = new Grid(width, height, bombsNumber)
  }

  get grid() {
    return this._grid
  }

  stringify() {
    try {
      return JSON.stringify({
        grid: JSON.parse(this._grid.stringify())
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = MinesWeeper
