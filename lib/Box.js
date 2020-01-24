class Box {
  constructor(grid, hasBomb = false) {
    this._neighbors = []
    this._isRevealed = false
    this._hasBomb = hasBomb
    this._isFlagged = false
    this._index = null
    this._parentGrid = grid
  }

  get hasBomb() {
    return this._hasBomb
  }

  set hasBomb(hasBomb) {
    if (hasBomb !== null && typeof hasBomb !== 'boolean') {
      throw new Error(`First parameter of hasBomb setter must be a boolean or null, ${typeof hasBomb} given`)
    }
    return (this._hasBomb = hasBomb)
  }

  get index() {
    return this._index
  }

  set index(index) {
    if (typeof index !== 'number') {
      throw new Error(`First parameter of index setter must be a number, ${typeof index} given`)
    }
    return (this._index = index)
  }

  get isRevealed() {
    return this._isRevealed
  }

  get nearBombs() {
    return this._neighbors.filter(neighbor => {
      return neighbor && neighbor.hasBomb
    }).length
  }

  get isFlagged() {
    return this._isFlagged
  }

  toggleFlag() {
    if (this._parentGrid.gameIsEnded) return

    this._isFlagged = !this._isFlagged

    this._parentGrid.checkIfWon()
  }

  reveal() {
    if (this._isRevealed || this._isFlagged || this._parentGrid.gameIsEnded) return

    this._isRevealed = true
    if (this.hasBomb) {
      this._parentGrid.gameOver()
    } else if (this.nearBombs === 0) {
      this._neighbors.forEach(neighbor => {
        neighbor.reveal()
      })
    }
    this._parentGrid.checkIfWon()
  }

  stringify() {
    try {
      return JSON.stringify({
        isRevealed: this._isRevealed,
        hasBomb: this._hasBomb,
        isFlagged: this._isFlagged,
        index: this._index
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = Box
