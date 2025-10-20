import z from 'zod'

export const AccessTokenPayloadSchema = z.object({
  id: z.number().positive(),
  validatedAccount: z.boolean(),
  state: z.boolean(),
  role: z.object({
    name: z.string(),
    permissions: z.array(
      z.object({
        name: z.string()
      })
    )
  })
})

export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>

export const RefreshTokenPayloadSchema = z.object({
  id: z.number().positive()
})
export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayloadSchema>
