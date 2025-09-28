import { NextFunction, Request, Response } from 'express'

export type AuthenticationTokens = {
  access_token: string
  refresh_token: string
}

export interface AuthService {
  createTenant(tenant: CreateUserDtoType): Promise<AuthenticationTokens>
}

export interface AuthController {
  createTenant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
