import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { NextFunction, Request, Response } from 'express'

export const inyectUserFromToken = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization

      const payload =
        AuthorizationUtils.extractAuthorizationToken(authorization)

      req.body = {
        ...req.body,
        user: {
          id: payload.id,
          role: payload.role.name
        }
      }

      next()
    } catch (e) {
      next(e)
    }
  }
}
