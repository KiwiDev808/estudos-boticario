import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify'
import workerpool from 'workerpool'
const pool = workerpool.pool(__dirname + '/../fibonnaciWorker.js')

const fibonacciOpts: RouteShorthandOptions = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        value: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          result: { type: 'number' },
        },
      },
    },
  },
}

const fibonacciRoute: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get<{
    Querystring: { value: string }
  }>('/', fibonacciOpts, async (request, reply) => {
    try {
      const value = request.query.value ? Number(request.query.value) : 1
      if (isNaN(value)) {
        throw new Error('Invalid number')
      }
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
