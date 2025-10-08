import { z } from 'zod'

export const UserIdentifierSchema = z.number().positive()

export const PasswordSchema = z
  .string()
  .min(8, 'Password must be 8 characters length')
  .regex(/[0-9]/, 'Must contain 1 number at least')
  .regex(/[a-z]/, 'Must contain 1 letter uppercase at least')
  .regex(/[A-Z]/, 'Must contain 1 letter lowercase at least')

export const CreateUserDto = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: PasswordSchema,
  dni: z.string().length(8)
})
export type CreateUserDtoType = z.infer<typeof CreateUserDto>

export const LoginUserDto = z.object({
  email: z.email(),
  password: z.string().nonempty()
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
  name: z.string().optional(),
  email: z.email().optional(),
  dni: z.string().length(8).optional(),
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
