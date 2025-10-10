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
import { UpdateUserDto } from './schemas/update_user.schema'

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly repository: Repository<User>) {}

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

    const { id: userId, name, email, dni, state, role, photo } = user

    return {
      id: userId,
      name,
      email,
      dni,
      state,
      role: role.name,
      photo
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

    const { id: userId, name, email, password, dni, state, role, photo } = user

    return {
      id: userId,
      name,
      email,
      password,
      dni,
      state,
      role: role.name,
      photo
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
}
