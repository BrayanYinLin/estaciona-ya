import z from 'zod'

export const LoginUserSchema = z.object({
  email: z.email({ error: 'El email no tiene un formato válido' }),
  password: z.string().nonempty({ error: 'La contraseña no puede estar vacía' })
})

export type LoginUserDto = z.infer<typeof LoginUserSchema>
