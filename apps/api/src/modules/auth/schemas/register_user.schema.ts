import { PasswordSchema } from '@users/schemas/user.schema'
import z from 'zod'

export const RegisterUserSchema = z.object({
  name: z.string().nonempty({ error: 'El nombre no puede estar vacio' }),
  email: z.email({ error: 'El correo debe cumplir con el formato adecuado' }),
  password: PasswordSchema,
  dni: z
    .string()
    .length(8, { error: 'El documento no puede contener menos de 8 digitos' })
})

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>
