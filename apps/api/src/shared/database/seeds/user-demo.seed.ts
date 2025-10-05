import { Role } from '@roles/entities/role.entity'
import { AppDataSource } from '../data-source'
import { User } from '@auth/entities/user.entity'
import { ROLES } from '@shared/constants/roles'
import { hash } from 'bcrypt'
import { env_bcrypt_salt_rounds } from '@shared/config/env.config'

export async function seedUserLessor() {
  const roleRepository = AppDataSource.getRepository(Role)
  const userRepository = AppDataSource.getRepository(User)

  const role = await roleRepository.findOneByOrFail({ name: ROLES.LESSOR })

  const passwordHashed = await hash('Test_demo_2025', env_bcrypt_salt_rounds)

  await userRepository.save({
    name: 'Test',
    email: 'test@example.com',
    password: passwordHashed,
    dni: '12345678',
    role: role,
    state: true,
    photo: null
  })
}
