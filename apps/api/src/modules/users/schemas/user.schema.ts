import z from 'zod'

export const UserIdentifierSchema = z.number().positive()
export type UserIdentifierDto = z.infer<typeof UserIdentifierSchema>

export const PasswordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
