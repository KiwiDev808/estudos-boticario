import { DbTodoTask, TodoTask } from '../types/Todo'

export interface ITodoRepository {
  getAll(): Promise<DbTodoTask[]>
  find(id: string): Promise<DbTodoTask | null>
  save(data: TodoTask): Promise<DbTodoTask>
  update(
    id: string,
    data: Omit<TodoTask, 'author' | 'description'>
  ): Promise<DbTodoTask | null>
  delete(id: string): Promise<void>
}
