import {
  JwtUserAccessDtoType,
  JwtUserRefreshDtoType
} from '@auth/entities/dto/user.dto'
import { sign, verify } from 'jsonwebtoken'
import { env_jwt } from '@shared/config/env.config'
import { ALGORITHM, TOKEN_EXPIRATION_SECONDS } from '@shared/config/jwt.config'
import { Request } from 'express'
import { AppError } from '@shared/utils/error'
import { HTTP_CODES } from '@shared/constants/http.codes'

export class JwtUtils {
  static generateAccessJwt(user: JwtUserAccessDtoType) {
    const token = sign(user, env_jwt, {
      algorithm: ALGORITHM,
      expiresIn: TOKEN_EXPIRATION_SECONDS.ACCESS
    })

    return token
  }

  static generateRefreshJwt(user: JwtUserRefreshDtoType) {
    const token = sign(user, env_jwt, {
      algorithm: ALGORITHM,
      expiresIn: TOKEN_EXPIRATION_SECONDS.REFRESH
    })

    return token
  }

  static extractRefreshToken(req: Request) {
    const token = req.cookies.refresh_token

    if (!token) {
      throw new AppError({
        httpCode: HTTP_CODES.UNAUTHORIZED,
        message: 'Falta token de autenticación'
      })
    }

    const payload = verify(token, env_jwt) as JwtUserRefreshDtoType

    return payload
  }
}
