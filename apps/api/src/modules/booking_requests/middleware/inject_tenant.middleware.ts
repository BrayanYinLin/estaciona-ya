import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { NextFunction, Request, Response } from 'express'

export const injectTenant = () => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization

      const payload =
        AuthorizationUtils.extractAuthorizationToken(authorization)

      req.body = {
        ...req.body,
        tenantId: payload.id
      }

      next()
    } catch (e) {
      next(e)
    }
  }
}
