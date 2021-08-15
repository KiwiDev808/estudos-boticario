import fastify from 'fastify'
import fastifySwagger from 'fastify-swagger'
import { swaggerOptions } from './config/swagger'

const server = fastify({
  logger: true,
})

server.register(fastifySwagger, swaggerOptions)

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
