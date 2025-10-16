import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { AppError } from '@shared/utils/error'
import { NextFunction, Request, Response } from 'express'

// Este middleware sera usado para revisar
// que la cuenta del usuario sea validated
// y este activa
export const ensureActiveAndValidatedUser = () => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization

      const { state, validatedAccount } =
        AuthorizationUtils.extractAuthorizationToken(authorization)

      if (!validatedAccount) {
        throw new AppError({
          httpCode: 403,
          message: 'User account not validated',
          isOperational: true
        })
      }

      if (!state) {
        throw new AppError({
          httpCode: 401,
          message: 'User account is deactivated',
          isOperational: true
        })
      }

      next()
    } catch (e) {
      next(e)
    }
  }
}
