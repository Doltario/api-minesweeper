function routes(socket) {
  socket.on('REVEAL', function(boxIndex) {
    console.info('Revealing', boxIndex)
    socket.broadcast.emit('REVEAL', boxIndex)
  })
}

module.exports = routes
