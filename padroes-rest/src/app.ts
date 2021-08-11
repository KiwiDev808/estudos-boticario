import cors from 'cors'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { MONGODB_URL } from './config'
import { todoRouter } from './controller/todo'
import { errorHandler } from './utils/errorhandler'

const app = express()
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions: swaggerJsDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Customer API',
      description: 'Customer API Information',
      contact: {
        name: 'Amazing Developer',
      },
      servers: ['http://localhost:3003'],
    },
  },
  // ['.routes/*.js']
  apis: ['./src/controller/*.ts', './src/app.ts'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(cors())

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Send a message to check if server is online
 *     description: Retrieve json response with a message called "pong"
 */
app.get('/ping', (req: Request, res: Response) => {
  return res.send({ message: 'pong' })
})

app.use('/api/todo', todoRouter)

app.use(errorHandler)

export { app }
