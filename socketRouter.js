const gameController = require('./controllers/gameController')
const GameModel = require('./models/game')

function minesweeperRoutes(socket) {
  socket.on('JOIN_ROOM', function(roomId) {
    socket.join(roomId)
    console.info(`${socket.client.id} joins room: ${roomId}`)
    socket.broadcast.to(roomId).emit('SOMEONE_JOINED_ROOM', socket.client.id)
    socket.emit('ROOM_JOINED', roomId)
  })
  socket.on('REVEAL', function(boxIndex, roomId) {
    console.info(`Revealing box ${boxIndex} to room ${roomId}`)
    socket.to(roomId).emit('REVEAL', boxIndex)
  })
  socket.on('TOGGLE_FLAG', function(boxIndex, roomId) {
    console.info(`Toggling box' flag ${boxIndex} for room ${roomId}`)
    socket.to(roomId).emit('TOGGLE_FLAG', boxIndex)
  })
}

module.exports = {
  minesweeperRoutes
}
