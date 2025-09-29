import z from 'zod'

export const JwtRoleDto = z.object({
  name: z.string()
})

export type JwtRoleDtoType = z.infer<typeof JwtRoleDto>
