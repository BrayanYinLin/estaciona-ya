import { join } from 'node:path'
import { cwd } from 'node:process'
import { envSchema } from '../utils/env.validation'

const env_path_variables = join(cwd(), '../../.env')
process.loadEnvFile(env_path_variables)

const env = envSchema.parse(process.env)

export const {
  API_PORT: env_api_port,
  NODE_ENV: env_node,
  BCRYPT_SALT_ROUNDS: env_bcrypt_salt_rounds,
  HOST_DB: env_host_db,
  PORT_DB: env_port_db,
  DATABASE_DB: env_database_db,
  USERNAME_DB: env_username_db,
  PASSWORD_DB: env_password_db,
  JWT_SECRET: env_jwt
} = env
