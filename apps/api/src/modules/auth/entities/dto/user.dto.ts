import { JwtRoleDto } from '@roles/entities/dto/role.dto'
import { z } from 'zod'

export const CreateUserDto = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().min(8),
  dni: z.string().length(8)
})
export type CreateUserDtoType = z.infer<typeof CreateUserDto>

export const JwtUserAccessDto = z.object({
  id: z.number().positive(),
  role: JwtRoleDto
})
export type JwtUserAccessDtoType = z.infer<typeof JwtUserAccessDto>

export const JwtUserRefreshDto = z.object({
  id: z.number().positive()
})
export type JwtUserRefreshDtoType = z.infer<typeof JwtUserRefreshDto>

export const LoginUserDto = z.object({
  email: z.email(),
  password: z.string().min(8)
})
export type LoginUserDtoType = z.infer<typeof LoginUserDto>

export const ResponseUserProfile = z.object({
  id: z.number().positive(),
  name: z.string(),
  email: z.email(),
  dni: z.string().length(8),
  role: z.string()
})
export type ResponseUserProfileType = z.infer<typeof ResponseUserProfile>
