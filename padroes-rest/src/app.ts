import cors from 'cors'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { MONGODB_URL } from './config'
import { todoRouter } from './controller/todo'

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

const app = express()
app.use(express.json())
app.use(cors())

app.get('/ping', (req: Request, res: Response) => {
  return res.send({ message: 'pong' })
})

app.use('/api/todo', todoRouter)

export { app }
