function minesweeperRoutes(socket) {
  socket.on('JOIN_ROOM', function(room) {
    console.info(`${socket.client.id} joins room: ${room}`)
    socket.join(room)
    socket.broadcast.to(room).emit('JOINED', socket.client.id)
  })

  socket.on('REVEAL', function(boxIndex, room) {
    console.info(`Revealing box ${boxIndex} to room ${room}`)
    socket.to(room).emit('REVEAL', boxIndex)
  })
}

module.exports = {
  minesweeperRoutes
}
