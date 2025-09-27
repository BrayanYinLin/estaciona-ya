import z from 'zod'

export const envSchema = z.object({
  API_PORT: z.string().transform((val) => {
    const port = Number(val)
    if (isNaN(port)) throw new Error('PORT must be a number')
    return port
  }),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  BCRYPT_SALT_ROUNDS: z.string().transform((val) => {
    const rounds = Number(val)
    if (isNaN(rounds)) throw new Error('BCRYPT_SALT_ROUNDS must be a number')
    return rounds
  })
})
