import { AuthController } from '@auth/auth'
import { AuthServiceImpl } from '@auth/services/auth.service'
import { JwtUtils } from '@auth/utils/jwt.utils'
import { cookieOpt, COOKIES } from '@shared/constants/cookies'
import { HTTP_CODES } from '@shared/constants/http.codes'
import { Request, Response, NextFunction } from 'express'

export class AuthControllerImpl implements AuthController {
  constructor(private readonly authService = new AuthServiceImpl()) {}

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const payload = JwtUtils.extractRefreshToken(req)
      const { access_token } = await this.authService.refresh(payload)

      return res.status(HTTP_CODES.OK).json({ access_token })
    } catch (e) {
      next(e)
    }
  }

  async createLessor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { access_token, refresh_token, user } =
        await this.authService.createLessor(req.body)

      return res
        .status(HTTP_CODES.CREATED)
        .cookie(
          COOKIES.REFRESH_TOKEN,
          refresh_token,
          cookieOpt('refresh_token')
        )
        .json({ access_token, user })
    } catch (e) {
      next(e)
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { access_token, refresh_token, user } =
        await this.authService.login(req.body)

      return res
        .status(HTTP_CODES.OK)
        .cookie(
          COOKIES.REFRESH_TOKEN,
          refresh_token,
          cookieOpt('refresh_token')
        )
        .json({ access_token, user })
    } catch (e) {
      next(e)
    }
  }

  async createTenant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { access_token, refresh_token, user } =
        await this.authService.createTenant(req.body)

      return res
        .status(HTTP_CODES.CREATED)
        .cookie(
          COOKIES.REFRESH_TOKEN,
          refresh_token,
          cookieOpt('refresh_token')
        )
        .json({ access_token, user })
    } catch (e) {
      next(e)
    }
  }
}
