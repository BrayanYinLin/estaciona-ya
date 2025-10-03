import { ResponseUserProfileType } from '@auth/entities/dto/user.dto'
import { User } from '@auth/entities/user.entity'
import { HTTP_CODES } from '@shared/constants/http.codes'
import { AppDataSource } from '@shared/database/data-source'
import { AppError } from '@shared/utils/error'
import { UserId, UserService } from '@users/user'

export class UserServiceImpl implements UserService {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(User)
  ) {}

  async deactivateAccount(user: UserId): Promise<ResponseUserProfileType> {
    const userFound = await this.userRepository.findOne({
      where: {
        id: user.id
      },
      relations: ['role']
    })

    if (!userFound) {
      throw new AppError({
        httpCode: HTTP_CODES.NOT_FOUND,
        message: 'Usuario no encontrado'
      })
    }

    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ state: false })
      .where('id = :id', { id: user.id })
      .execute()

    const userRecovered = await this.userRepository.findOne({
      where: {
        id: user.id
      }
    })

    if (!userRecovered) {
      throw new AppError({
        httpCode: HTTP_CODES.NOT_FOUND,
        message: 'Usuario no encontrado'
      })
    }

    const { id, name, email, dni, role, state, photo } = userFound

    return {
      id,
      name,
      email,
      dni,
      state,
      role: role.name,
      photo
    }
  }

  async findProfile(user: UserId): Promise<ResponseUserProfileType> {
    const userFound = await this.userRepository.findOne({
      where: {
        id: user.id
      },
      relations: ['role']
    })

    if (!userFound) {
      throw new AppError({
        httpCode: HTTP_CODES.NOT_FOUND,
        message: 'Usuario no encontrado'
      })
    }

    const { id, name, email, dni, role, state, photo } = userFound

    return {
      id,
      name,
      email,
      dni,
      state,
      role: role.name,
      photo
    }
  }
}
