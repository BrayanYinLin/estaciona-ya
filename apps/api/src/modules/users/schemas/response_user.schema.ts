import z from 'zod'
import { UserIdentifierSchema } from './user.schema'

export const ResponseProfileSchema = z.object({
  id: UserIdentifierSchema,
  name: z.string(),
  email: z.email(),
  dni: z.string().length(8),
  state: z.boolean(),
  role: z.string(),
  photo: z.string().nullable()
})

export type ResponseProfileDto = z.infer<typeof ResponseProfileSchema>

export const ResponseUserSchema = z.object({
  id: UserIdentifierSchema,
  name: z.string(),
  email: z.email(),
  password: z.string(),
  dni: z.string().length(8),
  state: z.boolean(),
  role: z.string(),
  photo: z.string().nullable()
})

export type ResponseUserDto = z.infer<typeof ResponseUserSchema>
