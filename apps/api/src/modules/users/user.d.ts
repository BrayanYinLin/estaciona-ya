import {
  ChangePasswordDto,
  ResponseUserProfileType,
  UpdateUserDtoType
} from '@auth/entities/dto/user.dto'
import { NextFunction, Request, Response } from 'express'
import {
  ResponseProfileDto,
  ResponseUserDto
} from './schemas/response_user.schema'
import { UserIdentifierDto } from './schemas/user.schema'
import { UpdatePasswordDto } from './schemas/change_password.schema'
import { UpdateUserDto } from './schemas/update_user.schema'

export type UserId = {
  id: number
}

export interface UserRepository {
  findProfileById(id: UserIdentifierDto): Promise<ResponseProfileDto | null>
  findUserById(id: UserIdentifierDto): Promise<ResponseUserDto | null>
  updateUserPassword(password: UpdatePasswordDto): Promise<boolean>
  updateUser(user: UpdateUserDto): Promise<void>
  deactivateUser(id: UserIdentifierDto): Promise<void>
}

export interface UserService {
  findProfile(user: UserId): Promise<ResponseUserProfileType>
  deactivateAccount(user: UserId): Promise<ResponseUserProfileType>
  updateProfile(
    dto: UpdateUserDtoType,
    urlForPhoto: string
  ): Promise<ResponseUserProfileType>
  findPhoto(photoId: string): Promise<string>
  changePassword({
    id,
    oldPassword,
    newPassword
  }: ChangePasswordDto): Promise<void>
}

export interface UserController {
  findProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  deactivateAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  findPhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
