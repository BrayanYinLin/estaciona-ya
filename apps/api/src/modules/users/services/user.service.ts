import {
  JwtUserAccessDtoType,
  ResponseUserProfileType
} from '@auth/entities/dto/user.dto'
import { User } from '@auth/entities/user.entity'
import { HTTP_CODES } from '@shared/constants/http.codes'
import { AppDataSource } from '@shared/database/data-source'
import { AppError } from '@shared/utils/error'
import { UserService } from '@users/user'

export class UserServiceImpl implements UserService {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(User)
  ) {}

  async findProfile(
    user: JwtUserAccessDtoType
  ): Promise<ResponseUserProfileType> {
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

    const { id, name, email, dni, role } = userFound

    return {
      id,
      name,
      email,
      dni,
      role: role.name
    }
  }
}
