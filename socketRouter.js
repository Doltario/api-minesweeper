const gameController = require('./controllers/gameController')

function minesweeperRoutes(socket) {
  let localRoomId = null

  const removeSocket = function () {
    return new Promise((resolve, reject) => {
      // felix@TODO: perhaps try to improve that in searching room into socket and not use local variable
      console.info(`${socket.client.id} left room ${localRoomId}`)
      gameController
        .removePlayerFromGame(localRoomId, socket.client.id)
        .then(() => {
          socket.broadcast.to(localRoomId).emit('someoneLeftRoom', socket.client.id)
          return resolve()
        })
        .catch((error) => {
          console.error('Cannot remove player from game', error)
          reject(error)
        })
    })
  }
  socket.on('disconnect', removeSocket)
  socket.on('joinRoom', function (roomId, player) {
    return new Promise((resolve, reject) => {
      localRoomId = roomId
      socket.join(roomId)
      console.info(`${socket.client.id} joins room: ${roomId}`)
      player.socketId = socket.client.id
      // felix@TODO: if nickname is empty, generate a random one
      if (!player.nickname) {
        player.nickname = player.socketId
      }
      gameController
        .addPlayerToGame(roomId, player)
        .then((game) => {
          socket.broadcast.to(roomId).emit('someoneJoinedRoom', player)
          socket.emit('roomJoined', { roomId, players: game.players, socketId: socket.client.id }) // Note: Provides the players in the room to the player who joined
          return resolve()
        })
        .catch((error) => {
          console.error('Cannot add player to game', error)
          reject(error)
        })
    })
  })
  socket.on('leaveRoom', removeSocket)
  socket.on('clickBox', function (boxIndex, roomId) {
    console.info(`Revealing box ${boxIndex} to room ${roomId}`)
    socket.to(roomId).emit('clickBox', boxIndex)
  })
  socket.on('toggleFlag', function (boxIndex, roomId) {
    console.info(`Toggling box' flag ${boxIndex} for room ${roomId}`)
    socket.to(roomId).emit('toggleFlag', boxIndex)
  })
  socket.on('resetGame', function (game, roomId) {
    console.info(`Resetting game for room ${roomId}`)
    socket.to(roomId).emit('resetGame', game)
  })
  socket.on('mouseMove', function (socketId, position) {
    socket.broadcast.to(localRoomId).emit('mouseMove', { socketId, position })
  })
}

module.exports = {
  minesweeperRoutes,
}
