import { sign, verify } from 'jsonwebtoken'
import { env_jwt } from '@shared/config/env.config'
import { ALGORITHM, TOKEN_EXPIRATION_SECONDS } from '@shared/config/jwt.config'
import { AppError } from '@shared/utils/error'
import { HTTP_CODES } from '@shared/constants/http.codes'
import {
  AccessTokenPayload,
  RefreshTokenPayload
} from '@auth/schemas/token.schema'

export class JwtUtils {
  static generateAccessJwt(user: AccessTokenPayload) {
    const token = sign(user, env_jwt, {
      algorithm: ALGORITHM,
      expiresIn: TOKEN_EXPIRATION_SECONDS.ACCESS
    })

    return token
  }

  static generateRefreshJwt(user: RefreshTokenPayload) {
    const token = sign(user, env_jwt, {
      algorithm: ALGORITHM,
      expiresIn: TOKEN_EXPIRATION_SECONDS.REFRESH
    })

    return token
  }

  static extractRefreshToken(token: string) {
    if (!token) {
      throw new AppError({
        httpCode: HTTP_CODES.UNAUTHORIZED,
        message: 'Falta token de autenticación'
      })
    }

    const payload = verify(token, env_jwt) as RefreshTokenPayload

    return payload
  }
}
