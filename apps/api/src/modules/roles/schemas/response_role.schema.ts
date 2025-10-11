import z from 'zod'

export const RoleSchema = z.object({
  id: z.number().positive(),
  name: z.string()
})

export type RoleDto = z.infer<typeof RoleSchema>

export const ResponseRoleSchema = z.object({
  name: z.string()
})

export type ResponseRoleDto = z.infer<typeof ResponseRoleSchema>
