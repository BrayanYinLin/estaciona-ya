import { NextFunction, Request, Response } from 'express'
import {
  CreateUserDtoType,
  JwtUserAccessDtoType,
  LoginUserDtoType
} from './entities/dto/user.dto'

export type AuthenticationTokens = {
  access_token: string
  refresh_token: string
}

export type AuthenticationResponseType = AuthenticationTokens & {
  user: JwtUserAccessDtoType
}

export interface AuthService {
  createTenant(tenant: CreateUserDtoType): Promise<AuthenticationResponseType>
  createLessor(lessor: CreateUserDtoType): Promise<AuthenticationResponseType>
  login(user: LoginUserDtoType): Promise<AuthenticationResponseType>
}

export interface AuthController {
  createTenant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  createLessor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
