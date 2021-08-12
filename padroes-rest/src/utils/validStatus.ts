import { TodoStatus } from '../types/Todo'

export const validStatus = (status: any): boolean => {
  if (Object.values(TodoStatus).includes(status)) {
    return true
  }
  return false
}
