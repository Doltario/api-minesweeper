class Box {
  constructor(hasBomb = false) {
    this._neighbors = []
    this._isRevealed = false
    this._hasBomb = hasBomb
    this._isFlagged = false
    this._index = null
  }

  set neighbors(value) {
    this._neighbors = value
  }

  get neighbors() {
    return this._neighbors
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
}

module.exports = Box
