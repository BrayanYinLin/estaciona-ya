import z from 'zod'

export const roleTokenPayloadSchema = z.object({
  name: z.string()
})

export type RoleTokenPayload = z.infer<typeof roleTokenPayloadSchema>
