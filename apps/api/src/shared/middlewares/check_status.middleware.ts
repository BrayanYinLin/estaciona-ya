import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { DomainError } from '@shared/utils/error'
import { NextFunction, Request, Response } from 'express'

export function checkStatus() {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization
      const payload =
        AuthorizationUtils.extractAuthorizationToken(authorization)
      const { validatedAccount, state } = payload

      if (!validatedAccount || !state) {
        throw new DomainError({
          code: 'FORBIDDEN_ERROR',
          message: 'No puedes acceder a esta funcionalidad'
        })
      }

      next()
    } catch (e) {
      next(e)
    }
  }
}
