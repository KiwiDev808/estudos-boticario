import { Router } from 'express'
import { AppRoutes } from '../app'
import { TodoController } from '../controller/todoController'
import { MongoTodoRepository } from '../repositories/implementations/MongoTodoRepository'
require('express-async-errors')

const todoRouter = Router()
const todoController = new TodoController(new MongoTodoRepository())

todoRouter.get('/', todoController.getAllTodos)

todoRouter.get('/:id', todoController.getSpecificTodo)

todoRouter.post('/', todoController.createTodo)

todoRouter.put('/:id', todoController.updateTodo)

todoRouter.delete('/:id', todoController.deleteTodo)

const todoHandle: AppRoutes = {
  path: '/api/todo',
  handle: todoRouter,
}

export { todoHandle }
