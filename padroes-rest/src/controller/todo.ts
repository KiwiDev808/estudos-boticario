import { Request, Response, Router } from 'express'
import Todo from '../models/todo'
require('express-async-errors')

const todoRouter = Router()

todoRouter.get('/', async (req: Request, res: Response) => {
  const todoList = await Todo.find({})
  return res.send({ todoList })
})

todoRouter.get('/:id', async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id)
  return res.send({ todo })
})

todoRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body?.author && !body?.description) {
    return response.status(400).json({
      error: 'author or description is missing',
    })
  }

  const todo = new Todo({
    ...body,
    status: 'todo',
  })

  const result = await todo.save()
  response.status(201).json(result)
})

todoRouter.put('/:id', async (request, response) => {
  const body = request.body

  const todo = {
    status: body.status,
  }

  const updatedTodo = await Todo.findByIdAndUpdate(request.params.id, todo, {
    new: true,
  })
  response.json(updatedTodo.toJSON())
})

todoRouter.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export { todoRouter }
