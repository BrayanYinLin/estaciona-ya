import { socketAuth } from '@shared/middlewares/socket_auth.middleware'
import { Server } from 'socket.io'
import { notificationEmitter, UserTarget } from './notify_event'
import { socketStore } from '@shared/database/socket_store.inmemory'

type IO = Server

export const socketManager = (io: IO) => {
  io.use(socketAuth())

  const emitToUsers = (users: UserTarget[]) => {
    for (const user of users) {
      const sockets = socketStore.get(user.id)

      console.log(socketStore.debug())

      sockets.forEach((socket) =>
        socket.emit('notify-user', { message: user.message })
      )
    }
  }

  notificationEmitter.on('notify', emitToUsers)

  io.on('connection', (socket) => {
    const userId = socket.handshake.auth.id
    socketStore.set(userId, socket)

    console.log(`[Connected] user ${userId} → socket ${socket.id}`)
    console.log(socketStore.debug())

    socket.on('disconnect', () => {
      socketStore.deleteSocket(userId, socket)

      console.log(`[Disconnected] user ${userId} → socket ${socket.id}`)
      console.log(socketStore.debug())
    })
  })
}
