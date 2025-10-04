import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { UserServiceImpl } from '@users/services/user.service'
import { UserController } from '@users/user'
import { Request, Response, NextFunction } from 'express'

export class UserControllerImpl implements UserController {
  constructor(private readonly userService = new UserServiceImpl()) {}

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = await this.userService.updateProfile(
        {
          ...req.body,
          photo: {
            originalname: req.file?.originalname,
            mimetype: req.file?.mimetype,
            buffer: req.file?.buffer
          }
        },
        `${req.protocol}://${req.get('host')}/api/user/photo/`
      )

      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

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
