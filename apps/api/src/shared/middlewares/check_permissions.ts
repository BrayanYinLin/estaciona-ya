import { PermissionName } from '@shared/constants/permissions'
import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { DomainError } from '@shared/utils/error'
import { NextFunction, Request, Response } from 'express'

export function checkPermissions(...requiredPermissions: PermissionName[]) {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization
      const { role } =
        AuthorizationUtils.extractAuthorizationToken(authorization)
      const { permissions } = role

      const userPermissions = permissions.map(({ name }) => name)

      const hasPermission = requiredPermissions.every((p) =>
        userPermissions.includes(p)
      )

      if (!hasPermission) {
        throw new DomainError({
          code: 'FORBIDDEN_ERROR',
          message: 'Acceso denegado'
        })
      }

      next()
    } catch (e) {
      next(e)
    }
  }
}
