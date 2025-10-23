import { DomainError } from './error'
import { verify } from 'jsonwebtoken'
import { env_jwt } from '@shared/config/env.config'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { AccessTokenPayload } from '@auth/schemas/token.schema'

export class AuthorizationUtils {
  static extractAuthorizationToken(authorization?: string): AccessTokenPayload {
    if (!authorization) {
      throw new DomainError({
        code: DOMAIN_ERRORS.TOKEN_MISSING.code,
        message: 'Token no encontrado'
      })
    }
    const token = authorization.split(' ')[1]
    const payload = verify(token, env_jwt) as AccessTokenPayload

    return payload
  }
}
