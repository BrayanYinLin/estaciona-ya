import { NextFunction, Request, Response } from 'express'
import {
  CreateUserDtoType,
  JwtUserAccessDtoType,
  JwtUserRefreshDtoType,
  LoginUserDtoType
} from './entities/dto/user.dto'

export type AccessToken = {
  access_token: string
}

export type RefreshToken = {
  refresh_token: string
}

export type AuthenticationTokens = AccessToken & RefreshToken

export type AuthenticationResponseType = AuthenticationTokens & {
  user: JwtUserAccessDtoType
}

export interface AuthService {
  createTenant(tenant: CreateUserDtoType): Promise<AuthenticationResponseType>
  createLessor(lessor: CreateUserDtoType): Promise<AuthenticationResponseType>
  login(user: LoginUserDtoType): Promise<AuthenticationResponseType>
  refresh(jwt: JwtUserRefreshDtoType): Promise<AccessToken>
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
  refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
