import fastify, { FastifyInstance } from 'fastify'
import fastifySwagger from 'fastify-swagger'
import { swaggerOptions } from './config/swagger'
import { fibonacciRoute } from './routes/fibonacci'

const server: FastifyInstance = fastify({
  logger: {
    level: 'info',
    prettyPrint: process.env.NODE_ENV === 'development' ? true : false,
  },
})

server.register(fastifySwagger, swaggerOptions)
server.register(fibonacciRoute, { prefix: '/fibonacci' })

server.get('/ping', async (request, reply) => {
  return reply.send({ message: 'pong\n' })
})

const start = async () => {
  try {
    await server.listen(3003)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
