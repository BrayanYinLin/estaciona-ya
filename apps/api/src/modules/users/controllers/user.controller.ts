import { ENDPOINTS } from '@shared/constants/endpoints'
import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { UserController, UserService } from '@users/user'
import { Request, Response, NextFunction } from 'express'

export class UserControllerImpl implements UserController {
  constructor(private readonly userService: UserService) {}

  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      await this.userService.changePassword(req.body)

      return res.status(204).end()
    } catch (e) {
      next(e)
    }
  }

  async findPhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const photo = req.params.photoId
      const url = await this.userService.findPhoto(photo)

      return res.sendFile(url)
    } catch (e) {
      next(e)
    }
  }

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const file = req.file
        ? {
            originalname: req.file.originalname,
            buffer: req.file.buffer
          }
        : undefined

      const user = await this.userService.updateProfile(
        {
          ...req.body,
          photo: file
        },
        ENDPOINTS.USER.concat('/photo/')
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
