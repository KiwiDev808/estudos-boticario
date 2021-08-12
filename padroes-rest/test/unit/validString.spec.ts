import { validString } from '../../src/utils/validString'

describe('Valid string', () => {
  it('should return true to valid string values', () => {
    expect(validString('hello world')).toBe(true)
  })
  it('should return false to empty values', () => {
    expect(validString('')).toBe(false)
  })
  describe('should return false to non string values', () => {
    it('should return false to number', () => {
      expect(validString(123)).toBe(false)
    })
    it('should return false to array', () => {
      expect(validString([])).toBe(false)
    })
    it('should return false to object', () => {
      expect(validString({})).toBe(false)
    })
    it('should return false to null', () => {
      expect(validString(null)).toBe(false)
    })
    it('should return false to boolean', () => {
      expect(validString(true)).toBe(false)
    })
  })
})
