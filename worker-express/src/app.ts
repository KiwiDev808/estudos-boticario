import cors from 'cors'
import express, { Request, Response } from 'express'
import { Worker } from 'worker_threads'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/ping', async (req: Request, res: Response) => {
  return res.send({ message: 'pong' })
})

app.get('/fibonacci', async (req: Request, res: Response) => {
  const body = req.body
  const number = body.number
  if (typeof number !== 'number' || number < 0) {
    return res.status(400).json({ error: 'Please put a valid number' })
  }

  const worker = new Worker('./src/worker.js')
  worker.postMessage(number)
  worker.once('message', (message) => {
    return res.json({ result: message })
  })

  worker.on('error', (err) => {
    return res.status(500).json({ error: 'internal server error' })
  })
})

export { app }
