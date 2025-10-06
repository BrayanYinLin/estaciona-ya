import {
  ResponseUserProfileType,
  UpdateUserDtoType
} from '@auth/entities/dto/user.dto'
import { User } from '@auth/entities/user.entity'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { FILES_ROUTE } from '@shared/constants/files.route'
import { HTTP_CODES } from '@shared/constants/http.codes'
import { AppDataSource } from '@shared/database/data-source'
import { FileStorageService } from '@shared/services/file-storage'
import { AppError, DomainError } from '@shared/utils/error'
import { UserId, UserService } from '@users/user'
import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { Repository } from 'typeorm'

export class UserServiceImpl implements UserService {
  constructor(
    private readonly userRepository: Repository<User>,
    private readonly photoService: FileStorageService
  ) {}

  async findPhoto(photoId: string): Promise<string> {
    const path = await this.photoService.sendPhotoPath(photoId)
    console.log(path)
    return path
  }

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
    let photoLink = null

    if (dto.photo !== undefined) {
      photoLink = await this.photoService.save({
        url: urlForPhoto,
        saveName: filename,
        originalname: dto.photo.originalname,
        buffer: dto.photo.buffer
      })
    }

    if (userRecoveredForPhoto.photo && dto.photo !== undefined) {
      const file = userRecoveredForPhoto.photo.split('/')
      const path = join(process.cwd(), FILES_ROUTE, file[file.length - 1])
      await this.photoService.delete(path)
    }

    // const photoLink =
    //   dto.photo !== undefined
    //     ? urlForPhoto.concat(filename, extname(dto.photo.originalname))
    //     : null

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
