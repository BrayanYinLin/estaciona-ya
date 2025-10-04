import { DomainError } from './error'
import { verify } from 'jsonwebtoken'
import { env_jwt } from '@shared/config/env.config'
import { AccessTokenPayload } from '@auth/entities/dto/user-token.dto'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'

export class AuthorizationUtils {
  static extractAuthorizationToken(authorization?: string): AccessTokenPayload {
    if (!authorization) {
      throw new DomainError({
        code: DOMAIN_ERRORS.TOKEN_MISSING.code,
        message: DOMAIN_ERRORS.TOKEN_MISSING.message
      })
    }

    const token = authorization.split(' ')[1]
    const payload = verify(token, env_jwt) as AccessTokenPayload

    return payload
  }
}
