import { ResponseRoleSchema } from '@roles/schemas/response_role.schema'
import z from 'zod'

export const AccessTokenPayloadSchema = z.object({
  id: z.number().positive(),
  role: ResponseRoleSchema
})

export type AccessTokenPayload = z.infer<typeof AccessTokenPayloadSchema>

export const RefreshTokenPayloadSchema = z.object({
  id: z.number().positive()
})
export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayloadSchema>
