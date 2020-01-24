const Box = require('./Box')

let instance = null

class BoxBridge {
  constructor() {
    if (!instance) {
      instance = this
    }

    this._currentIndex = 0

    return instance
  }

  _linkBoxes(currentBox, boxToLink) {
    // Used Object.defineProperty() to workaround vue error 'Maximum callstack size" when applying reactivity
    // https://stackoverflow.com/questions/59509529/vue-reactivity-on-object-graph-containing-cyclic-references
    const opts = {
      configurable: false,
      enumerable: true,
      writable: true
    }
    if (currentBox && boxToLink) {
      Object.defineProperty(currentBox, '_neighbors', {
        ...opts,
        value: currentBox._neighbors ? currentBox._neighbors.concat([boxToLink]) : [boxToLink]
      })
      Object.defineProperty(boxToLink, '_neighbors', {
        ...opts,
        value: boxToLink._neighbors ? boxToLink._neighbors.concat([currentBox]) : [currentBox]
      })
    }
    return
  }

  _computePosition(grid, box) {
    box.isTop = false
    box.isRight = false
    box.isBottom = false
    box.isLeft = false

    if (box.index < grid._width) {
      // Is top
      box.isTop = true
    }
    if (box.index % grid._width === 0) {
      // Is left
      box.isLeft = true
    }
    if (box.index % grid._width === grid._width - 1) {
      // Is right
      box.isRight = true
    }
    if (box.index > grid.length - grid._width - 1) {
      // Is Bottom
      box.isRight = true
    }
  }

  _cleanPosition(box) {
    delete box.isTop
    delete box.isRight
    delete box.isBottom
    delete box.isLeft
  }

  _computeBoxNeighbors(grid, box) {
    if (box.isTop === false) {
      this._linkBoxes(box, grid.findBox(box.index - grid._width)) // 1

      if (box.isLeft === false) {
        this._linkBoxes(box, grid.findBox(box.index - grid._width - 1)) // 0
      }
      if (box.isRight === false) {
        this._linkBoxes(box, grid.findBox(box.index - grid._width + 1)) // 2
      }
    }
    if (box.isLeft === false) {
      // Is not left
      this._linkBoxes(box, grid.findBox(box.index - 1)) // 3
    }
    return
  }

  create(grid, hasBomb) {
    let createdBox = new Box(grid, hasBomb)
    createdBox.index = this._currentIndex
    this._currentIndex++
    this._computePosition(grid, createdBox)
    this._computeBoxNeighbors(grid, createdBox)
    this._cleanPosition(createdBox)

    return createdBox
  }
}

module.exports = BoxBridge
