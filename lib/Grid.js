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

  findBox(boxIndex) {
    if (boxIndex === undefined || boxIndex === null || typeof boxIndex !== 'number') {
      throw new Error(`First parameter of findBox() must be a number, ${typeof boxIndex} given`)
    }

    if (!this._boxes[boxIndex]) {
      throw new Error(`Box with id ${boxIndex} not found`)
    }

    return this._boxes[boxIndex]
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
    this._boxes.push(boxBridge.create(this, false))
    return this
  }

  generate() {
    for (let i = 0; i < this._boxesNumber; i++) {
      this.writeBox()
    }
    this.fill()
  }
}

module.exports = Grid
