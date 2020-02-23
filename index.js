const fastify = require('fastify')({ logger: true })
const io = require('socket.io')(fastify.server)
const socketRouter = require('./socketRouter')

fastify.register(require('fastify-cors'))

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3001, 'localhost')

    io.of('/minesweeper').on('connection', socketRouter.minesweeperRoutes)

    fastify.log.info('------------------------')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
    fastify.log.info('------------------------')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

fastify.register(require('./router'))

start()
