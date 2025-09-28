import { z } from 'zod'

export const CreateUserDto = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().min(8),
  dni: z.string().length(8)
})

export const JwtUserDto = z.object({
  id: z.number().positive()
})

export type JwtUserDtoType = z.infer<typeof JwtUserDto>

export type CreateUserDtoType = z.infer<typeof CreateUserDto>
