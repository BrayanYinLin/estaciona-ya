import {
  ResponseUserProfileType,
  UpdateUserDtoType
} from '@auth/entities/dto/user.dto'
import { User } from '@auth/entities/user.entity'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { FILES_ROUTE } from '@shared/constants/files.route'
import { HTTP_CODES } from '@shared/constants/http.codes'
import { AppDataSource } from '@shared/database/data-source'
import { AppError, DomainError } from '@shared/utils/error'
import { UserId, UserService } from '@users/user'
import { randomUUID } from 'node:crypto'
import { writeFile, unlink } from 'node:fs/promises'
import { extname, join } from 'node:path'

export class UserServiceImpl implements UserService {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(User)
  ) {}

  async updateProfile(
    dto: UpdateUserDtoType,
    urlForPhoto: string
  ): Promise<ResponseUserProfileType> {
    const userRecoveredForPhoto = await this.userRepository.findOne({
      where: { id: dto.id }
    })

    if (!userRecoveredForPhoto) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: DOMAIN_ERRORS.ENTITY_NOT_FOUND.message
      })
    }

    const filename = randomUUID()

    if (dto.photo !== undefined) {
      if (userRecoveredForPhoto.photo) {
        const file = userRecoveredForPhoto.photo.split('/')
        await unlink(join(process.cwd(), FILES_ROUTE, file[file.length - 1]))
      }

      const ext = extname(dto.photo.originalname)
      await writeFile(
        join(process.cwd(), FILES_ROUTE, filename.concat(ext)),
        dto.photo.buffer
      )
    }

    const photoLink =
      dto.photo !== undefined
        ? urlForPhoto.concat(filename, extname(dto.photo.originalname))
        : null

    const newDto = {
      ...dto,
      photo: photoLink
    }

    await this.userRepository.update(
      { id: dto.id },
      {
        ...newDto
      }
    )

    const userFound = await this.userRepository.findOne({
      where: { id: dto.id },
      relations: ['role']
    })

    if (!userFound) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: DOMAIN_ERRORS.ENTITY_NOT_FOUND.message
      })
    }

    const { id, name, email, dni, state, role, photo } = userFound

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
