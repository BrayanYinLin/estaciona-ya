import { AuthenticationReason } from '@auth/entities/authentication_code.entity'
import { z } from 'zod'

export const AuthenticationCodeSchema = z.object({
  id: z.number().positive(),
  code: z.uuid(),
  user: z.object({
    id: z.number().positive()
  }),
  reason: z.enum(AuthenticationReason)
})

export type AuthenticationCodeDto = z.infer<typeof AuthenticationCodeSchema>

export const CreateCodeSchema = z.object({
  code: z.uuid(),
  user: z.object({
    id: z.number().positive()
  }),
  reason: z.enum(AuthenticationReason)
})

export type CreateCodeSchema = z.infer<typeof CreateCodeSchema>

export const VerifyCodeSchema = z.object({
  user: z.object({
    id: z.number().positive()
  }),
  code: z.uuid()
})

export type VerifyCodeDto = z.infer<typeof VerifyCodeSchema>
