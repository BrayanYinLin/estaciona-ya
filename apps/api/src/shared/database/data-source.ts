import { DataSource } from 'typeorm'
import {
  env_database_db,
  env_host_db,
  env_node,
  env_password_db,
  env_port_db,
  env_username_db
} from '../config/env.config'
import { User } from '@auth/entities/user.entity'
import { Role } from '@roles/entities/role.entity'

export const AppDataSource = new DataSource({
  connectorPackage: 'mysql2',
  type: 'mysql',
  host: env_host_db,
  port: env_port_db,
  username: env_username_db,
  password: env_password_db,
  database: env_database_db,
  synchronize: env_node === 'test',
  logging: true,
  entities: [User, Role],
  subscribers: [],
  migrations: []
})
