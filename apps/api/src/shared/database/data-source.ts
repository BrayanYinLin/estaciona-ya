import { DataSource } from 'typeorm'
import {
  env_database_db,
  env_host_db,
  env_password_db,
  env_port_db,
  env_username_db
} from '../config/env.config'
import 'reflect-metadata'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env_host_db,
  port: env_port_db,
  username: env_username_db,
  password: env_password_db,
  database: env_database_db,
  synchronize: false,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: []
})
