if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
const io = require('socket.io')(fastify.server)

const socketRouter = require('./socketRouter')

fastify.register(require('fastify-cors'))

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3001, '0.0.0.0')

    io.of('/minesweeper').on('connection', socketRouter.minesweeperRoutes)

    fastify.log.info('------------------------')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
    fastify.log.info('------------------------')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(db => {
    console.info('-_-_-_-_-_-_-_-_-_-_-')
    console.info(`Connected to database on ${process.env.MONGO_URL}`)
    console.info('-_-_-_-_-_-_-_-_-_-_-')
  })
  .catch(error => {
    throw new Error(`Database connection failed: ${error}`)
  })

fastify.register(require('./router'))

start()
