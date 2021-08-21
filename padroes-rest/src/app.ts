import cors from 'cors'
import express, { Express, Router } from 'express'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger_output.json'
import { MONGODB_URL } from './config'
import { errorHandler } from './utils/errorhandler'
export interface AppRoutes {
  path: string
  handle: Router
}
export class App {
  private express: Express = express()

  constructor(private routes: AppRoutes[]) {}

  public init = (): App => {
    this.connectDb()
    this.middlewares()
    this.ping()
    this.router()
    this.errorHandler()

    return this
  }

  private connectDb(): void {
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
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private errorHandler(): void {
    this.express.use(errorHandler)
  }

  private router(): void {
    this.routes.forEach((route) => {
      this.express.use(route.path, route.handle)
    })
    this.express.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }

  public listen(port: number, callback: () => void): void {
    this.express.listen(port, callback)
  }

  private ping(): void {
    this.express.get('/ping', (_, res) => {
      res.send({ message: 'pong' })
    })
  }
}
