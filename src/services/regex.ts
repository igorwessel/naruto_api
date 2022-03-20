export const ID = '(^[0-9]*$)'

export const KEBAB_CASE = '^([\\p{Ll}0-9]*)(-[\\p{Ll}0-9]+)*$'

export function isKebabCase(value: string) {
  return new RegExp(KEBAB_CASE, 'u').test(value)
}

export function isID(value: string) {
  return new RegExp(ID).test(value)
}
