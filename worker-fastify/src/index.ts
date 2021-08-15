import fastify from 'fastify'

const server = fastify({
  logger: true,
})

server.register(require('fastify-swagger'), {
  routePrefix: '/doc',
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost:3003',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },

  exposeRoute: true,
})

server.get('/ping', async (request, reply) => {
  return reply.send({ message: 'pong\n' })
})

server.listen(3003, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
