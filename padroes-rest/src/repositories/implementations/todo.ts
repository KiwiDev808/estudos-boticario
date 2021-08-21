import { Document, Model, model, Schema, SchemaDefinition } from 'mongoose'
import { DbTodoTask, TodoTask } from '../../types/Todo'
import { ITodoRepository } from '../ITodoRepository'

function todoTransformer(document: Document, returnedObject: any) {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
}

const todoSchema = new Schema<TodoTask>({
  author: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['todo', 'doing', 'done'],
    required: true,
  },
})

todoSchema.set('toJSON', {
  transform: todoTransformer,
})

const todoModel = model<TodoTask>('Todo', todoSchema)
export default todoModel

export class MongoTodoRepository implements ITodoRepository {
  private model!: Model<DbTodoTask>

  private schema: SchemaDefinition = {
    author: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['todo', 'doing', 'done'],
      required: true,
    },
  }

  constructor() {
    const todoSchema = new Schema<TodoTask>(this.schema)

    todoSchema.set('toJSON', {
      transform: (document: Document, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      },
    })

    this.model = model<DbTodoTask>('Todo', todoSchema)
  }

  async getAll(): Promise<DbTodoTask[]> {
    return await this.model.find({})
  }

  async find(id: string): Promise<DbTodoTask | null> {
    return await this.model.findById(id)
  }

  async save(data: TodoTask): Promise<DbTodoTask> {
    const todo = new this.model({
      ...data,
    })

    const result = await todo.save()
    return result
  }

  async update(
    id: string,
    data: Omit<TodoTask, 'author' | 'description'>
  ): Promise<DbTodoTask | null> {
    const todo = {
      status: data?.status,
    }

    const updatedTodo = await this.model.findByIdAndUpdate(id, todo, {
      new: true,
    })

    return updatedTodo
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id)
    return
  }
}
