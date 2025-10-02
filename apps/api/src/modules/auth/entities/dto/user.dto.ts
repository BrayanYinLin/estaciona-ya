import { z } from 'zod'

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
  password: PasswordSchema
})
export type LoginUserDtoType = z.infer<typeof LoginUserDto>

export const ResponseUserProfile = z.object({
  id: z.number().positive(),
  name: z.string(),
  email: z.email(),
  dni: z.string().length(8),
  state: z.boolean(),
  role: z.string()
})
export type ResponseUserProfileType = z.infer<typeof ResponseUserProfile>
