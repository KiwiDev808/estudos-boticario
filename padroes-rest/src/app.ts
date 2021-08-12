import cors from 'cors'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger_output.json'
import { MONGODB_URL } from './config'
import { todoRouter } from './controller/todo'
import { errorHandler } from './utils/errorhandler'

const app = express()

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

app.get('/ping', (req: Request, res: Response) => {
  return res.send({ message: 'pong' })
})

app.use('/api/todo', todoRouter)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(errorHandler)

export { app }
