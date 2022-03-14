export const ID = '(^[0-9]*$)'

export const KEBAB_CASE = '(^[a-z0-9]+((-[a-z0-9]+){1,})?$)'

export function isKebabCase(value: string) {
  return new RegExp(KEBAB_CASE).test(value)
}

export function isID(value: string) {
  return new RegExp(ID).test(value)
}
