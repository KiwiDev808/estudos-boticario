import { Request, Response, Router } from 'express'
import Todo from '../models/todo'
require('express-async-errors')

const todoRouter = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
todoRouter.get('/', async (req: Request, res: Response) => {
  const todoList = await Todo.find({})
  return res.json({ todoList })
})

todoRouter.get('/:id', async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id)
  if (!todo) {
    return res.status(404).send({ message: 'todo not found' })
  }
  return res.json(todo)
})

todoRouter.post('/', async (req: Request, res: Response) => {
  const body = req.body

  if (!body?.author && !body?.description) {
    return res.status(400).json({
      error: 'author or description is missing',
    })
  }

  const todo = new Todo({
    ...body,
    status: 'todo',
  })

  const result = await todo.save()
  res.status(201).json(result)
})

todoRouter.put('/:id', async (req: Request, res: Response) => {
  const body = req.body

  const todo = {
    status: body.status,
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, todo, {
    new: true,
    runValidators: true,
  })
  res.json(updatedTodo.toJSON())
})

todoRouter.delete('/:id', async (req: Request, res: Response) => {
  await Todo.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export { todoRouter }
