import { env_bcrypt_salt_rounds } from '@shared/config/env.config'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { FILES_ROUTE } from '@shared/constants/files.route'
import { HTTP_CODES } from '@shared/constants/http.codes'
import { FileStorageService } from '@shared/services/file-storage'
import { AppError, DomainError } from '@shared/utils/error'
import { UserId, UserRepository, UserService } from '@users/user'
import { compare, hash } from 'bcrypt'
import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { UpdateUserFormDto } from './schemas/update_user.schema'
import { ChangePasswordDto } from './schemas/change_password.schema'
import { ResponseProfileDto } from './schemas/response_user.schema'

export class UserServiceImpl implements UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly photoService: FileStorageService
  ) {}

  async changePassword({
    user,
    oldPassword,
    newPassword
  }: ChangePasswordDto): Promise<void> {
    const userFound = await this.userRepository.findUserById(user.id)

    if (!userFound) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: 'Usuario no encontrado'
      })
    }

    const { password } = userFound
    const validPassword = await compare(oldPassword, password)

    if (!validPassword) {
      throw new DomainError({
        code: DOMAIN_ERRORS.INCORRECT_PASSWORD.code,
        message: 'Contraseña incorrecta'
      })
    }

    const newPasswordHashed = await hash(newPassword, env_bcrypt_salt_rounds)

    const updated = await this.userRepository.updateUserPassword({
      id: userFound.id,
      newPassword: newPasswordHashed
    })

    if (!updated) {
      throw new DomainError({
        code: DOMAIN_ERRORS.CONFLICT.code,
        message: 'Error actualizando contraseña'
      })
    }
  }

  async findPhoto(photoId: string): Promise<string> {
    const path = await this.photoService.sendPhotoPath(photoId)
    return path
  }

  async updateProfile(
    dto: UpdateUserFormDto,
    urlForPhoto: string
  ): Promise<ResponseProfileDto> {
    const userRecoveredForPhoto = await this.userRepository.findProfileById(
      dto.user.id
    )

    if (!userRecoveredForPhoto) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: 'Usuario no encontrado'
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

    const newDto = {
      ...dto,
      photo: photoLink ?? userRecoveredForPhoto.photo
    }

    await this.userRepository.updateUser({
      ...newDto,
      id: newDto.user.id
    })

    const userFound = await this.userRepository.findProfileById(dto.user.id)

    if (!userFound) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: 'Usuario no encontrado'
      })
    }

    const { id, name, email, dni, state, role, photo, validatedAccount } =
      userFound

    return {
      id,
      name,
      email,
      dni,
      state,
      role,
      photo,
      validatedAccount
    }
  }

  async deactivateAccount(user: UserId): Promise<ResponseProfileDto> {
    const userFound = await this.userRepository.findProfileById(user.id)

    if (!userFound) {
      throw new AppError({
        httpCode: HTTP_CODES.NOT_FOUND,
        message: 'Usuario no encontrado'
      })
    }

    await this.userRepository.deactivateUser(user.id)

    const userRecovered = await this.userRepository.findProfileById(user.id)

    if (!userRecovered) {
      throw new AppError({
        httpCode: HTTP_CODES.NOT_FOUND,
        message: 'Usuario no encontrado'
      })
    }

    const { id, name, email, dni, role, state, photo, validatedAccount } =
      userFound

    return {
      id,
      name,
      email,
      dni,
      state,
      role,
      photo,
      validatedAccount
    }
  }

  async findProfile(user: UserId): Promise<ResponseProfileDto> {
    const userFound = await this.userRepository.findProfileById(user.id)

    if (!userFound) {
      throw new AppError({
        httpCode: HTTP_CODES.NOT_FOUND,
        message: 'Usuario no encontrado'
      })
    }

    const { id, name, email, dni, role, state, photo, validatedAccount } =
      userFound

    return {
      id,
      name,
      email,
      dni,
      state,
      role,
      photo,
      validatedAccount
    }
  }
}
