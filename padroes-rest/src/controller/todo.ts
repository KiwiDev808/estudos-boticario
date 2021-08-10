import { Request, Response, Router } from 'express'

const todoRouter = Router()

todoRouter.get('/', (req: Request, res: Response) => {
  return res.send({ message: 'test' })
})

export { todoRouter }
