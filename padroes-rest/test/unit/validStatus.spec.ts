import { validStatus } from '../../src/utils/validStatus'

describe('Valid Status', () => {
  describe('valid status values', () => {
    it('should return true to "todo"', () => {
      expect(validStatus('todo')).toBe(true)
    })
    it('should return true to "doing"', () => {
      expect(validStatus('doing')).toBe(true)
    })
    it('should return true to "done"', () => {
      expect(validStatus('done')).toBe(true)
    })
  })
  describe('invalid status values', () => {
    it('should return false to "hello world"', () => {
      expect(validStatus('hello world')).toBe(false)
    })
    it('should return false to number value', () => {
      expect(validStatus(2)).toBe(false)
    })
    it('should return false to array value', () => {
      expect(validStatus([])).toBe(false)
    })
    it('should return false to object value', () => {
      expect(validStatus({})).toBe(false)
    })
    it('should return false to boolean value', () => {
      expect(validStatus(true)).toBe(false)
    })
    it('should return false to undefined value', () => {
      expect(validStatus(undefined)).toBe(false)
    })
    it('should return false to null value', () => {
      expect(validStatus(null)).toBe(false)
    })
  })
})
