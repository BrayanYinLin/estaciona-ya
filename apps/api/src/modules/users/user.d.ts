import {
  JwtUserAccessDtoType,
  ResponseUserProfileType
} from '@auth/entities/dto/user.dto'
import { NextFunction, Request, Response } from 'express'

export interface UserService {
  findProfile(user: JwtUserAccessDtoType): Promise<ResponseUserProfileType>
}

export interface UserController {
  findProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
