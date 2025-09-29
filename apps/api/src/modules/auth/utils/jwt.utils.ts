import {
  JwtUserAccessDtoType,
  JwtUserRefreshDtoType
} from '@auth/entities/dto/user.dto'
import { sign } from 'jsonwebtoken'
import { env_jwt } from '@shared/config/env.config'
import { ALGORITHM, TOKEN_EXPIRATION_SECONDS } from '@shared/config/jwt.config'

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
}
