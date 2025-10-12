import z from 'zod'

export const ChangePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string()
})

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>
