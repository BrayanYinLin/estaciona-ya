import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

interface SocketState {
  socket: Socket
  connect: (token: string) => void
  disconnect: () => void
}

export const useSocketStore = create<SocketState>(() => {
  const socket = io('http://localhost:3000', {
    autoConnect: false
  })

  return {
    socket,

    connect: (token: string) => {
      socket.auth = { token }
      socket.connect()
    },

    disconnect: () => {
      socket.disconnect()
    }
  }
})
