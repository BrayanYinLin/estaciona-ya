import { Repository } from 'typeorm'
import {
  ResponseProfileDto,
  ResponseUserDto
} from './schemas/response_user.schema'
import { UserRepository } from './user'
import { User } from './entities/user.entity'
import { UserIdentifierDto } from './schemas/user.schema'
import { UpdatePasswordDto } from './schemas/change_password.schema'
import { AppDataSource } from '@shared/database/data-source'
import {
  UpdateUserDto,
  UpdateValidationAccountDto
} from './schemas/update_user.schema'
import { CreateUserDto } from './schemas/create_user.schema'

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly repository: Repository<User>) {}

  async updateUserValitation({
    user,
    validationAccount
  }: UpdateValidationAccountDto): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ validatedAccount: validationAccount })
      .where('id = :id', { id: user.id })
      .execute()
  }

  async findProfileById(
    id: UserIdentifierDto
  ): Promise<ResponseProfileDto | null> {
    const user = await this.repository.findOne({
      where: {
        id: id
      },
      relations: ['role']
    })

    if (!user) return null

    const {
      id: userId,
      name,
      email,
      dni,
      state,
      role,
      photo,
      validatedAccount
    } = user

    return {
      id: userId,
      name,
      email,
      dni,
      state,
      role: {
        name: role.name
      },
      photo,
      validatedAccount
    }
  }

  async findUserById(id: UserIdentifierDto): Promise<ResponseUserDto | null> {
    const user = await this.repository.findOne({
      where: {
        id: id
      },
      relations: ['role']
    })

    if (!user) return null

    const {
      id: userId,
      name,
      email,
      password,
      dni,
      state,
      role,
      photo,
      validatedAccount
    } = user

    return {
      id: userId,
      name,
      email,
      password,
      dni,
      state,
      role: {
        id: role.id,
        name: role.name
      },
      photo,
      validatedAccount
    }
  }

  async updateUserPassword({
    id,
    newPassword
  }: UpdatePasswordDto): Promise<boolean> {
    const { affected } = await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ password: newPassword })
      .where('id = :id', { id: id })
      .execute()

    return Boolean(affected)
  }

  async updateUser({
    id,
    name,
    email,
    dni,
    photo,
    state
  }: UpdateUserDto): Promise<void> {
    await this.repository.update(
      { id: id },
      {
        name,
        email,
        dni,
        photo: photo ?? null,
        state
      }
    )
  }

  async deactivateUser(id: UserIdentifierDto): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ state: false })
      .where('id = :id', { id })
      .execute()
  }

  async findUserByEmail(email: string): Promise<ResponseUserDto | null> {
    const user = await this.repository.findOne({
      where: {
        email: email
      },
      relations: ['role']
    })

    if (!user) return null

    const {
      id,
      name,
      email: emailRecovered,
      password,
      dni,
      state,
      role,
      photo,
      validatedAccount
    } = user

    return {
      id,
      name,
      email: emailRecovered,
      password,
      dni,
      state,
      role: {
        id: role.id,
        name: role.name
      },
      photo,
      validatedAccount
    }
  }

  async findUserByDni(dni: string): Promise<ResponseUserDto | null> {
    const user = await this.repository.findOne({
      where: {
        dni: dni
      },
      relations: ['role']
    })

    if (!user) return null

    const {
      id,
      name,
      email,
      password,
      dni: dniRecovered,
      state,
      role,
      photo,
      validatedAccount
    } = user

    return {
      id,
      name,
      email,
      password,
      dni: dniRecovered,
      state,
      role: {
        id: role.id,
        name: role.name
      },
      photo,
      validatedAccount
    }
  }

  async saveUser({
    name,
    email,
    password,
    dni,
    role
  }: CreateUserDto): Promise<ResponseUserDto> {
    const userCreated = await this.repository.save({
      name,
      email,
      password,
      dni,
      role
    })

    return userCreated
  }
}
