import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: '',
  port: 1433,
  username: '',
  password: '',
  database: '',
  synchronize: false,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: []
})
