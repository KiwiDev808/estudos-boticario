import fastify from 'fastify'

const server = fastify()

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
