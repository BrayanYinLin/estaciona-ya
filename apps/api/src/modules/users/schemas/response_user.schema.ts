import z from 'zod'
import { UserIdentifierSchema } from './user.schema'
import {
  ResponseRoleSchema,
  RoleSchema
} from '@roles/schemas/response_role.schema'

export const ResponseProfileSchema = z.object({
  id: UserIdentifierSchema,
  name: z.string(),
  email: z.email(),
  dni: z.string().length(8),
  state: z.boolean(),
  role: ResponseRoleSchema,
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
  role: RoleSchema,
  photo: z.string().nullable()
})

export type ResponseUserDto = z.infer<typeof ResponseUserSchema>
