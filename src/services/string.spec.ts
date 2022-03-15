import { sanitize } from './string'

it('should remove "-" and replace for spaces', () => {
  expect(sanitize('naruto-uzumaki')).toBe('naruto uzumaki')
})
