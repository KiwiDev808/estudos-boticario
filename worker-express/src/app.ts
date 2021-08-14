import cors from 'cors'
import express, { Request, Response } from 'express'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/ping', (req: Request, res: Response) => {
  return res.send({ message: 'pong' })
})

export { app }
