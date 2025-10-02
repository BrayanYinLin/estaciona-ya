import { roleTokenPayloadSchema } from '@roles/entities/dto/role.dto'
import z from 'zod'

export const AccessTokenPayloadSchema = z.object({
  id: z.number().positive(),
  role: roleTokenPayloadSchema
})

export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>

export const RefreshTokenPayloadSchema = z.object({
  id: z.number().positive()
})
export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayloadSchema>
