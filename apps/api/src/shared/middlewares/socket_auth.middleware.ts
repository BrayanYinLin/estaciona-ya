import type { Socket } from 'socket.io'
import type { ExtendedError } from 'socket.io'
import { socketSessionStore } from '@shared/database/socket_session'
import { verify } from 'jsonwebtoken'
import { env_jwt } from '@shared/config/env.config'
import { AccessTokenPayload } from '@auth/schemas/token.schema'

export const socketAuth = () => {
  return (socket: Socket, next: (err?: ExtendedError) => void) => {
    const token = socket.handshake.auth?.token

    if (!token) {
      return next(new Error('Token requerido'))
    }

    try {
      const payload = verify(token, env_jwt) as AccessTokenPayload

      socketSessionStore.set(String(payload.id), payload)

      next()
    } catch {
      next(new Error('Token inválido'))
    }
  }
}
