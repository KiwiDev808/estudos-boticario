import { SwaggerOptions } from 'fastify-swagger'

const swaggerOptions: SwaggerOptions = {
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
    tags: [
      { name: 'Math', description: 'Math Operations' },
      { name: 'HealthCheck', description: 'Check server health' },
    ],
  },

  exposeRoute: true,
}

export { swaggerOptions }
