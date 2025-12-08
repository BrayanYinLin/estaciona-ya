import { Role } from '@roles/entities/role.entity'
import { AppDataSource } from '../data-source'
import { User } from '@users/entities/user.entity'
import { ROLES } from '@shared/constants/roles'
import { hash } from 'bcrypt'
import { env_bcrypt_salt_rounds } from '@shared/config/env.config'

export async function seedUserLessor() {
  const roleRepository = AppDataSource.getRepository(Role)
  const userRepository = AppDataSource.getRepository(User)

  const role = await roleRepository.findOneByOrFail({ name: ROLES.LESSOR })

  const passwordHashed = await hash('Test_demo_2025', env_bcrypt_salt_rounds)

  const userFound = await userRepository.findOne({
    where: {
      email: 'test@example.com'
    }
  })

  if (userFound) return

  const user = await userRepository.save({
    name: 'Test',
    email: 'test@example.com',
    password: passwordHashed,
    dni: '12345678',
    role: role,
    state: true,
    photo: null,
    validatedAccount: true
  })

  return user
}

export async function seedUserTenant() {
  const roleRepository = AppDataSource.getRepository(Role)
  const userRepository = AppDataSource.getRepository(User)

  const role = await roleRepository.findOneByOrFail({ name: ROLES.TENANT })

  const passwordHashed = await hash('Test_demo_2025', env_bcrypt_salt_rounds)

  const userFound = await userRepository.findOne({
    where: {
      email: 'test2@example.com'
    }
  })

  if (userFound) return

  await userRepository.save({
    name: 'Arrendatario',
    email: 'test2@example.com',
    password: passwordHashed,
    dni: '12345679',
    role: role,
    state: true,
    photo: null,
    validatedAccount: true
  })

  const userFoundTwo = await userRepository.findOne({
    where: {
      email: 'test3@example.com'
    }
  })

  if (userFoundTwo) return

  await userRepository.save({
    name: 'Tenant',
    email: 'test3@example.com',
    password: passwordHashed,
    dni: '12345600',
    role: role,
    state: true,
    photo: null,
    validatedAccount: true
  })
}
