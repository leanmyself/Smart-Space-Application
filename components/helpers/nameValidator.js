export function nameValidator(name) {
  if (!name) return "Name can't be empty."
  if (/\d/.test(name)) return "Name can't contain numbers."
  if (/[!@#$%^&*(),.?":{}|<>]/.test(name)) return "Name can't contain special characters."
  return ''
}
