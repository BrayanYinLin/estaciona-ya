import { NextFunction, Request, Response } from 'express'
import {
  ResponseProfileDto,
  ResponseUserDto
} from './schemas/response_user.schema'
import { UserIdentifierDto } from './schemas/user.schema'
import {
  ChangePasswordDto,
  UpdatePasswordDto
} from './schemas/change_password.schema'
import {
  UpdateUserDto,
  UpdateUserFormDto,
  UpdateValidationAccountDto
} from './schemas/update_user.schema'
import { CreateUserDto } from './schemas/create_user.schema'

export type UserId = {
  id: number
}

export interface UserRepository {
  findProfileById(id: UserIdentifierDto): Promise<ResponseProfileDto | null>
  findUserById(id: UserIdentifierDto): Promise<ResponseUserDto | null>
  findUserByEmail(email: string): Promise<ResponseUserDto | null>
  findUserByDni(dni: string): Promise<ResponseUserDto | null>
  updateUserPassword(password: UpdatePasswordDto): Promise<boolean>
  updateUser(user: UpdateUserDto): Promise<void>
  updateUserValitation(
    validationAccount: UpdateValidationAccountDto
  ): Promise<void>
  saveUser(user: CreateUserDto): Promise<ResponseUserDto>
  deactivateUser(id: UserIdentifierDto): Promise<void>
}

export interface UserService {
  findProfile(user: UserId): Promise<ResponseProfileDto>
  deactivateAccount(user: UserId): Promise<ResponseProfileDto>
  updateProfile(
    dto: UpdateUserFormDto,
    urlForPhoto: string
  ): Promise<ResponseProfileDto>
  findPhoto(photoId: string): Promise<string>
  changePassword({
    user: id,
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
