// TODO: Will  handle in-progress saves ? how rebuild a grid with stored data ? => save the "state" of the grid
const BoxBridge = require('./BoxBridge.js')

const boxBridge = new BoxBridge()

class Grid {
  constructor(width, height, bombsNumber) {
    // felix@TODO: check params + check if width * height > bombsNumber
    this._width = width
    this._height = height
    this._boxesNumber = width * height
    this._bombsNumber = bombsNumber
    this._bombsToInsert = bombsNumber
    this._boxes = []
    this._gameIsEnded = false
    this._gameWon = null
    this.generate()
    delete this._bombsToInsert // Used only for generation
  }

  get height() {
    return this._height
  }

  get width() {
    return this._width
  }

  get boxes() {
    return this._boxes
  }

  get bombsLeft() {
    return (
      this._bombsNumber -
      this._boxes.filter(box => {
        return box.isFlagged
      }).length
    )
  }

  get gameIsEnded() {
    return this._gameIsEnded
  }

  checkIfWon() {
    if (this.bombsLeft === 0) {
      const flaggedBombsNumber = this._boxes.filter(box => {
        return box.hasBomb === true && box.isRevealed === false && box.isFlagged === true
      }).length

      const revealedBoxNumber = this._boxes.filter(box => {
        return box.isRevealed === true
      }).length

      if (flaggedBombsNumber + revealedBoxNumber === this._boxesNumber) {
        this.gameWin()
      }
    }
  }

  findBox(boxIndex) {
    if (boxIndex === undefined || boxIndex === null || typeof boxIndex !== 'number') {
      throw new Error(`First parameter of findBox() must be a number, ${typeof boxIndex} given`)
    }

    return this._boxes.find(box => {
      return box.index === boxIndex
    })
  }

  fill() {
    // to fill grid if there are to few bombs
    while (this._bombsToInsert > 0) {
      const index = Math.trunc(Math.random() * this._height * this._width)

      if (this._boxes[index].hasBomb !== true) {
        this._boxes[index].hasBomb = true
        this._bombsToInsert--
      }
    }
    return this
  }

  writeBox() {
    // TODO:writeBox should probably be in BoxBridge
    this._boxes.push(boxBridge.create(this, false)) // TODO: perhaps remove second parameter of boxBridge.create
    return this
  }

  gameOver() {
    this._gameIsEnded = true
    this._gameWon = false
    this._boxes.forEach(box => {
      box._isRevealed = true
    })
  }

  gameWin() {
    this._gameIsEnded = true
    this._gameWon = true
    this._boxes.forEach(box => {
      if (box.hasBomb === true && box.isFlagged === false) {
        box.isFlagged = true
      } else {
        box._isRevealed = true
      }
    })
  }

  generate() {
    for (let i = 0; i < this._boxesNumber; i++) {
      this.writeBox()
    }
    this.fill()
  }

  stringify() {
    const stringified = {
      width: this._width,
      height: this._height,
      boxesNumber: this._boxesNumber,
      bombsNumber: this._bombsNumber,
      boxes: this._boxes,
      gameIsEnded: this._gameIsEnded,
      gameWon: this._gameWon,
      bombsLeft: this.bombsLeft
    }

    try {
      stringified.boxes = stringified.boxes.map(box => {
        return JSON.parse(box.stringify())
      })
      return JSON.stringify(stringified)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = Grid
