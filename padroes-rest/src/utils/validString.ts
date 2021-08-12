export const validString = (value: any): boolean => {
  if (typeof value === 'string' && value) {
    return true
  }
  return false
}
