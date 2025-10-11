import { RoleSchema } from '@roles/schemas/response_role.schema'
import { PasswordSchema } from '@users/schemas/user.schema'
import z from 'zod'

export const CreateUserSchema = z.object({
  name: z.string().nonempty({ error: 'El nombre no puede estar vacio' }),
  email: z.email({ error: 'El correo debe cumplir con el formato adecuado' }),
  password: PasswordSchema,
  dni: z
    .string()
    .length(8, { error: 'El documento no puede contener menos de 8 digitos' }),
  role: RoleSchema
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>
