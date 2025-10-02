import { AppError } from './error'
import { HTTP_CODES } from '@shared/constants/http.codes'
import { verify } from 'jsonwebtoken'
import { env_jwt } from '@shared/config/env.config'
import { AccessTokenPayload } from '@auth/entities/dto/user-token.dto'

export class AuthorizationUtils {
  static extractAuthorizationToken(authorization?: string): AccessTokenPayload {
    if (!authorization) {
      throw new AppError({
        httpCode: HTTP_CODES.UNAUTHORIZED,
        message: 'Token de autorizacion faltante'
      })
    }

    const token = authorization.split(' ')[1]
    const payload = verify(token, env_jwt) as AccessTokenPayload

    return payload
  }
}
