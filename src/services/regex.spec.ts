import { isID, isKebabCase } from './regex'

describe('ID', () => {
  it('should accept only numbers', () => {
    expect(isID('1')).toBe(true)
  })

  it('should be false when is different a number', () => {
    expect(isID('asasdadad-2131')).toBe(false)
  })
})

describe('KEBAB-CASE', () => {
  it('should accept only string in kebab-case', () => {
    expect(isKebabCase('naruto-uzumaki')).toBe(true)
  })

  it.each([
    ['PascalCase', false],
    ['snake_case', false],
    ['camelCase', false],
  ])('should be false when use %s', (caseType, expected) => {
    expect(isKebabCase(caseType)).toBe(expected)
  })
})
