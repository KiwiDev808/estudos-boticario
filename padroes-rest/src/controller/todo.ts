import { Request, Response } from 'express'
import Todo from '../repositories/implementations/todo'
import { validStatus } from '../utils/validStatus'
import { validString } from '../utils/validString'

export class TodoController {
  async getAllTodos(req: Request, res: Response) {
    // #swagger.tags = ['Todo']
    // #swagger.description = 'Get all todo.'

    /* #swagger.responses[200] = { 
                 schema: { todoList: [{$ref: "#/definitions/Todo"}] },
    } */

    const todoList: any[] = await Todo.find({})
    return res.json({ todoList })
  }

  async getSpecificTodo(req: Request, res: Response) {
    // #swagger.tags = ['Todo']
    // #swagger.description = 'Get a specific todo.'
    // #swagger.parameters['id'] = { description: 'Todo Id' }

    /* #swagger.responses[200] = { 
                 schema: { $ref: "#/definitions/Todo" },
                 description: 'Todo found.' 
    } */

    /* #swagger.responses[400] = { 
                description: 'Malformed id.',
                schema: { error: 'malformed id' }
    } */

    /* #swagger.responses[404] = { 
                description: 'Not found.',
                schema: { message: 'todo not found' }
    } */

    const todo: any = await Todo.findById(req.params.id)

    if (!todo) {
      return res.status(404).send({ message: 'todo not found' })
    }
    return res.json(todo)
  }

  async createTodo(req: Request, res: Response) {
    // #swagger.tags = ['Todo']
    /* #swagger.parameters['newTodo'] = {
                 in: 'body',
                 description: 'Informações do todo.',
                 required: true,
                 type: 'object',
                 schema: { $ref: "#/definitions/AddTodo" }
    } */

    // #swagger.responses[201] = { schema: { $ref: "#/definitions/Todo" }, description: 'Todo criado.'  }
    /* #swagger.responses[400] = { 
      description: 'Invalid Parameters',
      schema: { error: 'author or description is missing or invalid' }
    } */

    const body = req.body

    if (!validString(body?.author) && !validString(body?.description)) {
      return res.status(400).json({
        error: 'author or description is missing or invalid',
      })
    }

    const todo = new Todo({
      ...body,
      status: 'todo',
    })

    const result: any = await todo.save()
    res.status(201).json(result)
  }

  async updateTodo(req: Request, res: Response) {
    // #swagger.tags = ['Todo']
    // #swagger.parameters['id'] = { description: 'Todo Id' }
    /* #swagger.parameters['newStatus'] = {
                 in: 'body',
                 description: 'New todo status.',
                 required: true,
                 type: 'object',
                 schema: { status: "doing" }
    } */

    /* #swagger.responses[200] = { 
                 schema: { $ref: "#/definitions/Todo" },
                 description: 'Status updated.' 
    } */

    /* #swagger.responses[400] = { 
                description: 'Malformed id.',
                schema: { error: 'malformed id' }
    } */

    /* #swagger.responses[422] = { 
                description: 'Invalid status.', 
                schema: { error: 'the status dong is invalid, please put a valid status e.g "todo", "doing", "done"'}
    } */

    const body = req.body

    if (validStatus(req.body.status)) {
      return res.status(422).json({
        error: `the status ${req.body?.status} is invalid, please put a valid status e.g "todo", "doing", "done"`,
      })
    }

    const todo = {
      status: body.status,
    }

    const updatedTodo: any = await Todo.findByIdAndUpdate(req.params.id, todo, {
      new: true,
    })

    res.json(updatedTodo.toJSON())
  }

  async deleteTodo(req: Request, res: Response) {
    // #swagger.tags = ['Todo']
    // #swagger.parameters['id'] = { description: 'Todo Id' }

    /* #swagger.responses[204] = { 
                description: 'Successful todo deletion.' 
    } */

    /* #swagger.responses[400] = { 
                description: 'Malformed id.', 
                schema: { error: 'malformed id' }
    } */

    await Todo.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
}
