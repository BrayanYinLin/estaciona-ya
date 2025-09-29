import { NextFunction, Request, Response } from 'express'
import { JwtUserAccessDtoType } from './entities/dto/user.dto'

export type AuthenticationTokens = {
  access_token: string
  refresh_token: string
}

export type CreateUserResponseType = AuthenticationTokens & {
  user: JwtUserAccessDtoType
}

export interface AuthService {
  createTenant(tenant: CreateUserDtoType): Promise<CreateUserResponseType>
}

export interface AuthController {
  createTenant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
