import { ResponseUserProfileType } from '@auth/entities/dto/user.dto'
import { NextFunction, Request, Response } from 'express'

export type UserId = {
  id: number
}

export interface UserService {
  findProfile(user: UserId): Promise<ResponseUserProfileType>
  deactivateAccount(user: UserId): Promise<ResponseUserProfileType>
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
}
