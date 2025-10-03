import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { UserServiceImpl } from '@users/services/user.service'
import { UserController } from '@users/user'
import { Request, Response, NextFunction } from 'express'

export class UserControllerImpl implements UserController {
  constructor(private readonly userService = new UserServiceImpl()) {}

  async deactivateAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const authorization = req.headers.authorization
      const payload =
        AuthorizationUtils.extractAuthorizationToken(authorization)
      console.log(payload)
      await this.userService.deactivateAccount({
        id: payload.id
      })

      return res.status(204).end()
    } catch (e) {
      next(e)
    }
  }

  async findProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const authorization = req.headers.authorization
      const payload =
        AuthorizationUtils.extractAuthorizationToken(authorization)
      const user = await this.userService.findProfile(payload)

      return res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }
}
