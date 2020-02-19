const Grid = require('./Grid.js')

class MinesWeeper {
  constructor(width = 5, height = 5, bombsNumber = 2) {
    this._grid = new Grid(width, height, bombsNumber)
    this.won = null
    this.ended = null
  }

  get grid() {
    return this._grid
  }

  stringify() {
    try {
      return JSON.stringify({
        grid: JSON.parse(this._grid.stringify()),
        won: this._won,
        ended: this._ended
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = MinesWeeper
