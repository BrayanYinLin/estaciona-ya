import z from 'zod'
import { UserIdentifierSchema } from './user.schema'
import { FileSchema } from '@root/modules/files/schemas/file.schema'

export const UpdateUserFormSchema = z.object({
  id: UserIdentifierSchema,
  name: z.string({ error: 'El nombre no puede estar vacio' }).optional(),
  email: z
    .email({ error: 'El correo debe cumplir con el formato adecuado' })
    .optional(),
  dni: z
    .string()
    .length(8, { error: 'El documento no puede contener menos de 8 digitos' })
    .optional(),
  state: z.boolean().optional(),
  photo: FileSchema.optional()
})
export type UpdateUserFormDto = z.infer<typeof UpdateUserFormSchema>

export const UpdateUserSchema = z.object({
  id: UserIdentifierSchema,
  name: z.string({ error: 'El nombre no puede estar vacio' }).optional(),
  email: z
    .email({ error: 'El correo debe cumplir con el formato adecuado' })
    .optional(),
  dni: z
    .string()
    .length(8, { error: 'El documento no puede contener menos de 8 digitos' })
    .optional(),
  state: z.boolean().optional(),
  photo: z.string().nullable()
})

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>
