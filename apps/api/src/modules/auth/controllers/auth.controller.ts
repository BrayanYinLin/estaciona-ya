import { AuthController } from '@auth/auth'
import { AuthServiceImpl } from '@auth/services/auth.service'
import { cookieOpt, COOKIES } from '@shared/constants/cookies'
import { Request, Response, NextFunction } from 'express'

export class AuthControllerImpl implements AuthController {
  constructor(private readonly authService = new AuthServiceImpl()) {}

  async createTenant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { access_token, refresh_token } =
        await this.authService.createTenant(req.body)

      return res
        .status(201)
        .cookie(
          COOKIES.REFRESH_TOKEN,
          refresh_token,
          cookieOpt('refresh_token')
        )
        .json({ access_token })
    } catch (e) {
      next(e)
    }
  }
}
