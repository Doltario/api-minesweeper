const gameController = require('./controllers/gameController')

async function routes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.post('/game', async (request, reply) => {
    //TODO: Turn into post

    // if (!request.body.width || typeof request.body.width !== 'number') return reply.code(400).send(`Width param must be a number, ${typeof request.body.width}`)
    // if (!request.body.height || typeof request.body.height !== 'number') return reply.code(400).send(`Height param must be a number, ${typeof request.body.height}`)
    // if (!request.body.bombsNumber || typeof request.body.bombsNumber !== 'number') return reply.code(400).send(`Width param must be a number, ${typeof request.body.bombsNumber}`)

    const { height, width, bombsNumber, online } = JSON.parse(request.body)

    try {
      const game = gameController.createGame(width, height, bombsNumber, online)

      return game
    } catch (error) {
      console.error('An error occured while creating game', error)
      reply.code(500).send('An error occured while creating game')
    }
  })

  fastify.get('/game/:gameId', (request, reply) => {
    return new Promise((resolve, reject) => {
      gameController
        .getGameById(request.params.gameId)
        .then(game => {
          resolve(game)
        })
        .catch(error => {
          console.error('Cannot find game', error)
          reply.code(500).send('Cannot find game')
          reject(error)
        })
    })
  })

  fastify.put('/game/:gameId', (request, reply) => {
    return new Promise((resolve, reject) => {
      const gameToSave = JSON.parse(request.body)

      gameController
        .saveGame(request.params.gameId, gameToSave)
        .then(game => {
          resolve(game)
        })
        .catch(error => {
          console.error('Cannot patch game', error)
          reply.code(500).send('Cannot patch game')
          reject(error)
        })
    })
  })
}

module.exports = routes
