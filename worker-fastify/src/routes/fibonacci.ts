import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify'
import workerpool from 'workerpool'
const pool = workerpool.pool(__dirname + '/../fibonnaciWorker.js')

const fibonacciOpts: RouteShorthandOptions = {
  schema: {
    tags: ['Math'],
    summary: `Fibonacci Operation`,
    querystring: {
      type: 'object',
      properties: {
        value: { type: 'number' },
      },
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          result: { type: 'number' },
        },
      },
      400: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Invalid Number',
          },
        },
      },
    },
  },
}

const fibonacciRoute: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get<{
    Querystring: { value: number }
  }>('/', fibonacciOpts, async (request, reply) => {
    try {
      const value = request.query.value || 1
      const result = await pool.exec('fibonacci', [value])
      await pool.terminate()
      return { result }
    } catch (err) {
      await pool.terminate()
      return reply.code(400).send(err)
    }
  })
  done()
}

export { fibonacciRoute }
