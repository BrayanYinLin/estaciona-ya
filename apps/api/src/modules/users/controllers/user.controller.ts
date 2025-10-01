import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { UserServiceImpl } from '@users/services/user.service'
import { UserController } from '@users/user'
import { Request, Response, NextFunction } from 'express'

export class UserControllerImpl implements UserController {
  constructor(private readonly userService = new UserServiceImpl()) {}

  async findProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const payload = AuthorizationUtils.extractAuthorizationToken(req)
      const user = await this.userService.findProfile(payload)

      return res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }
}
