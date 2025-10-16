import z from 'zod'
import { PasswordSchema, UserIdentifierSchema } from './user.schema'

export const UpdatePasswordSchema = z.object({
  id: UserIdentifierSchema,
  newPassword: PasswordSchema
})
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>

export const ChangePasswordSchema = z.object({
  user: z.object({
    id: UserIdentifierSchema
  }),
  oldPassword: z.string(),
  newPassword: PasswordSchema
})

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>
