import { Algorithm } from 'jsonwebtoken'

export const ALGORITHM: Algorithm = 'HS256'

export const TOKEN_EXPIRATION_SECONDS = {
  ACCESS: 60 * 60 * 8, // 8 horas
  REFRESH: 60 * 60 * 24 * 15 // 15 días
} as const
