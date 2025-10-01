import { Request } from 'express'
import { AppError } from './error'
import { HTTP_CODES } from '@shared/constants/http.codes'
import { JwtUserAccessDtoType } from '@auth/entities/dto/user.dto'
import { verify } from 'jsonwebtoken'
import { env_jwt } from '@shared/config/env.config'

export class AuthorizationUtils {
  static extractAuthorizationToken(req: Request): JwtUserAccessDtoType {
    const authorization = req.headers.authorization

    if (!authorization) {
      throw new AppError({
        httpCode: HTTP_CODES.UNAUTHORIZED,
        message: 'Token de autorizacion faltante'
      })
    }

    const token = authorization.split(' ')[1]
    const payload = verify(token, env_jwt) as JwtUserAccessDtoType

    return payload
  }
}
