const gameController = require('./controllers/gameController')
const GameModel = require('./models/game')

function minesweeperRoutes(socket) {
  socket.on('joinRoom', function(roomId) {
    socket.join(roomId)
    console.info(`${socket.client.id} joins room: ${roomId}`)
    socket.broadcast.to(roomId).emit('someoneJoinedRoom', socket.client.id)
    socket.emit('roomJoined', roomId)
  })
  socket.on('clickBox', function(boxIndex, roomId) {
    console.info(`Revealing box ${boxIndex} to room ${roomId}`)
    socket.to(roomId).emit('clickBox', boxIndex)
  })
  socket.on('toggleFlag', function(boxIndex, roomId) {
    console.info(`Toggling box' flag ${boxIndex} for room ${roomId}`)
    socket.to(roomId).emit('toggleFlag', boxIndex)
  })
  socket.on('resetGame', function(game, roomId) {
    console.info(`Resetting game for room ${roomId}`)
    socket.to(roomId).emit('resetGame', game)
  })
}

module.exports = {
  minesweeperRoutes
}
