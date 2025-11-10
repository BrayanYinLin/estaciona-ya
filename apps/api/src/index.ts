import { AppDataSource } from '@shared/database/data-source'
import 'reflect-metadata'
import { app } from './server'
import { env_api_port } from '@shared/config/env.config'
import { seedRoles } from '@shared/database/seeds/role.seed'
import {
  seedUserLessor,
  seedUserTenant
} from '@shared/database/seeds/user-demo.seed'
import { seedDistricts } from '@shared/database/seeds/district.seed'
import { seedRentModes } from '@shared/database/seeds/rent_mode.seed'
import { seedGarage } from '@shared/database/seeds/garage.seed'
import { User } from '@users/entities/user.entity'

const init = async () => {
  await AppDataSource.initialize()
  await seedRoles()
  const districts = await seedDistricts()
  const modes = await seedRentModes()
  const user = await seedUserLessor()
  await seedUserTenant()
  await seedGarage(user as User, modes, districts)

  app.listen(env_api_port, () => {
    console.log(`Running at http://localhost:${env_api_port}`)
  })
}

init()
