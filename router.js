const gridController = require('./controllers/gridController')

async function routes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/game', async (request, reply) => {
    // if (!request.body.width || typeof request.body.width !== 'number') return reply.code(400).send(`Width param must be a number, ${typeof request.body.width}`)
    // if (!request.body.height || typeof request.body.height !== 'number') return reply.code(400).send(`Height param must be a number, ${typeof request.body.height}`)
    // if (!request.body.bombsNumber || typeof request.body.bombsNumber !== 'number') return reply.code(400).send(`Width param must be a number, ${typeof request.body.bombsNumber}`)

    // const height = request.body.height
    // const width = request.body.width
    // const bombsNumber = request.body.bombsNumber

    try {
      return gridController.createGame()
    } catch (error) {
      console.error('An error occured while creating game', error)
      reply.code(500).send('An error occured while creating game')
    }
  })
}

module.exports = routes
