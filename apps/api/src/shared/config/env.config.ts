import { join } from 'node:path'
import { cwd } from 'node:process'
import { envSchema } from '../utils/env.validation'

const env_path_variables = join(cwd(), '../../.env')
process.loadEnvFile(env_path_variables)

const env = envSchema.parse(process.env)

export const {
  API_PORT: env_api_port,
  NODE_ENV: env_node,
  BCRYPT_SALT_ROUNDS: env_bcrypt_salt_rounds
} = env
