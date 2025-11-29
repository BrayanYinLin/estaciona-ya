import type { Socket } from 'socket.io'
import type { ExtendedError } from 'socket.io'
import { AuthorizationUtils } from '@shared/utils/authorization.utils'
import { socketSessionStore } from '@shared/database/socket_session'

export const socketAuth = () => {
  return (socket: Socket, next: (err?: ExtendedError) => void) => {
    const token = socket.handshake.auth?.token

    if (!token) {
      return next(new Error('Token requerido'))
    }

    try {
      const payload = AuthorizationUtils.extractAuthorizationToken(token)

      socketSessionStore.set(String(payload.id), payload)

      next()
    } catch {
      next(new Error('Token inválido'))
    }
  }
}
