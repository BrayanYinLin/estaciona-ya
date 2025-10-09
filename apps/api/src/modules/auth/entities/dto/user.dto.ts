import { z } from 'zod'

export const UserIdentifierSchema = z.number().positive()

export const PasswordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')

export const CreateUserDto = z.object({
  name: z.string().nonempty({ error: 'El nombre no puede estar vacio' }),
  email: z.email({ error: 'El correo debe cumplir con el formato adecuado' }),
  password: PasswordSchema,
  dni: z
    .string()
    .length(8, { error: 'El documento no puede contener menos de 8 digitos' })
})
export type CreateUserDtoType = z.infer<typeof CreateUserDto>

export const LoginUserDto = z.object({
  email: z.email({ error: 'El email no tiene un formato válido' }),
  password: z.string().nonempty({ error: 'La contraseña no puede estar vacía' })
})
export type LoginUserDtoType = z.infer<typeof LoginUserDto>

export const ResponseUserProfile = z.object({
  id: UserIdentifierSchema,
  name: z.string(),
  email: z.email(),
  dni: z.string().length(8),
  state: z.boolean(),
  role: z.string(),
  photo: z.string().nullable()
})
export type ResponseUserProfileType = z.infer<typeof ResponseUserProfile>

export const uploadFileSchema = z.object({
  originalname: z.string(),
  buffer: z.instanceof(Buffer)
})

export const UpdateUserDto = z.object({
  id: UserIdentifierSchema,
  name: z.string({ error: 'El nombre no puede estar vacio' }).optional(),
  email: z
    .email({ error: 'El correo debe cumplir con el formato adecuado' })
    .optional(),
  dni: z
    .string()
    .length(8, { error: 'El documento no puede contener menos de 8 digitos' })
    .optional(),
  state: z.boolean().optional(),
  photo: uploadFileSchema.optional()
})
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>

export const ChangePasswordDtoSchema = z.object({
  id: UserIdentifierSchema,
  oldPassword: z.string(),
  newPassword: PasswordSchema
})
export type ChangePasswordDto = z.infer<typeof ChangePasswordDtoSchema>
