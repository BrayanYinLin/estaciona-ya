import { NextFunction, Request, Response } from 'express'
import { RegisterUserDto } from './schemas/register_user.schema'
import { LoginUserDto } from './schemas/login_user.schema'
import { RefreshTokenPayload } from './schemas/token.schema'

export type AccessToken = {
  access_token: string
}

export type RefreshToken = {
  refresh_token: string
}

export type UserAuthenticated = {
  id: number
  role: {
    name: string
  }
}

export type AuthenticationCodeUser = Pick<UserAuthenticated, 'id'>

export type AuthenticationTokens = AccessToken & RefreshToken

export type AuthenticationResponseType = AuthenticationTokens & {
  user: UserAuthenticated
}

export interface AuthService {
  createTenant(tenant: RegisterUserDto): Promise<AuthenticationResponseType>
  createLessor(lessor: RegisterUserDto): Promise<AuthenticationResponseType>
  login(user: LoginUserDto): Promise<AuthenticationResponseType>
  refresh(jwt: RefreshTokenPayload): Promise<AccessToken>
  validate(user: AuthenticationCodeUser): Promise<void>
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
  logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
