export enum TodoStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}

export type TodoTask = {
  author: string
  description: string
  status: TodoStatus
}
