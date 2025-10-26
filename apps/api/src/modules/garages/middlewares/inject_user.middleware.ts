import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { NextFunction, Request, Response } from 'express'

export const injectUser = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization

      const payload =
        AuthorizationUtils.extractAuthorizationToken(authorization)

      res.locals = payload

      next()
    } catch (e) {
      next(e)
    }
  }
}
