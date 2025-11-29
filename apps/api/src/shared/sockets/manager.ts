import { socketAuth } from '@shared/middlewares/socket_auth.middleware'
import { Server } from 'socket.io'

type IO = Server

export const socketManager = (io: IO) => {
  io.use(socketAuth())

  io.on('connection', () => {
    io.emit('welcome', { message: 'welcome to estaciona ya' })
  })
}
