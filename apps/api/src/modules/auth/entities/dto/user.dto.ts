import { JwtRoleDto } from '@roles/entities/dto/role.dto'
import { z } from 'zod'

export const CreateUserDto = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().min(8),
  dni: z.string().length(8)
})

export const JwtUserAccessDto = z.object({
  id: z.number().positive(),
  role: JwtRoleDto
})

export const JwtUserRefreshDto = z.object({
  id: z.number().positive()
})

export type JwtUserAccessDtoType = z.infer<typeof JwtUserAccessDto>
export type JwtUserRefreshDtoType = z.infer<typeof JwtUserRefreshDto>
export type CreateUserDtoType = z.infer<typeof CreateUserDto>
