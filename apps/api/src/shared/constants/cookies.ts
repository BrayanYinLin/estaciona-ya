import { TOKEN_EXPIRATION_SECONDS } from '@shared/config/jwt.config'
import { CookieOptions } from 'express'

export const COOKIES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token'
} as const

export type CookieNames = (typeof COOKIES)[keyof typeof COOKIES]

export const cookieOpt = (cookieName: CookieNames): CookieOptions => {
  const { ACCESS, REFRESH } = TOKEN_EXPIRATION_SECONDS
  const maxAge = (cookieName === 'access_token' ? ACCESS : REFRESH) * 1000

  return {
    httpOnly: true,
    maxAge,
    sameSite: 'lax',
    path: '/'
  }
}
